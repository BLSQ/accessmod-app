import { gql, useQuery } from "@apollo/client";
import { i18n } from "next-i18next";
import { getApolloClient } from "./apollo";
import { parse } from "csv-parse/sync";
import {
  AccessmodFile,
  AccessmodFilesetFormat,
  AccessmodFilesetStatus,
  CreateFileMutation,
  GetFileDownloadUrlMutation,
  GetFilesetRolesQuery,
  GetUploadUrlMutation,
} from "./graphql";

const GET_PRESIGNED_MUTATION = gql`
  mutation GetUploadUrl($input: PrepareAccessmodFileUploadInput) {
    prepareAccessmodFileUpload(input: $input) {
      success
      uploadUrl
      fileUri
    }
  }
`;

export function guessFileMimeType(file: File) {
  if (file.type) {
    return file.type;
  }

  const ext = file.name.slice(file.name.lastIndexOf("."));
  switch (ext) {
    case ".geojson":
      return "application/geo+json";
    case ".gpkg":
      return "application/geopackage+sqlite3";
  }
}

export async function getPresignedURL(filesetId: string, mimeType: string) {
  const client = getApolloClient();

  const response = await client.mutate<GetUploadUrlMutation>({
    mutation: GET_PRESIGNED_MUTATION,
    variables: {
      input: { filesetId, mimeType },
    },
  });

  if (!response.data?.prepareAccessmodFileUpload?.success) {
    console.error(
      `Cannot create presigned URL for fileset '${filesetId}' and mimeType '${mimeType}'`
    );
    return null;
  }

  return response.data.prepareAccessmodFileUpload;
}

const CREATE_FILE_MUTATION = gql`
  mutation CreateFile($input: CreateAccessmodFileInput) {
    createFile: createAccessmodFile(input: $input) {
      success
    }
  }
`;

export async function createFile(
  filesetId: string,
  uri: string,
  mimeType: string
) {
  const client = getApolloClient();

  const response = await client.mutate<CreateFileMutation>({
    mutation: CREATE_FILE_MUTATION,
    variables: {
      input: {
        filesetId,
        uri,
        mimeType,
      },
    },
  });

  if (!response.data?.createFile?.success) {
    throw new Error(`Cannot create file "${uri}" in fileset ${filesetId}`);
  }
  return true;
}

const GET_FILESET_ROLES = gql`
  query GetFilesetRoles {
    roles: accessmodFilesetRoles {
      id
      name
      format
      code
      createdAt
      updatedAt
    }
  }
`;

export async function getFilesetRoles() {
  const client = getApolloClient();
  const response = await client.query<GetFilesetRolesQuery>({
    query: GET_FILESET_ROLES,
    fetchPolicy: "cache-first",
  });

  return response.data?.roles || [];
}

export function useFilesetRoles() {
  const { data, loading } = useQuery<GetFilesetRolesQuery>(GET_FILESET_ROLES, {
    fetchPolicy: "cache-first",
  });

  return { loading, roles: data?.roles ?? undefined } as const;
}

// Based on https://www.iana.org/assignments/media-types/media-types.xhtml
export const ACCEPTED_MIMETYPES = {
  [AccessmodFilesetFormat.Vector]: {
    "application/geopackage+sqlite3": [".gpkg"],
    "application/geo+json": [".geojson"],
  },
  [AccessmodFilesetFormat.Raster]: {
    "image/tiff": [".tif", ".tiff"],
  },
  [AccessmodFilesetFormat.Tabular]: {
    "text/plain": [".csv"],
    "text/csv": [".csv"],
  },
};

export function validateFileFormat(
  file: Pick<AccessmodFile, "mimeType">,
  format: AccessmodFilesetFormat
) {
  if (
    format === AccessmodFilesetFormat.Tabular &&
    ["application/csv", "text/csv"].includes(file.mimeType)
  ) {
    return true;
  }

  return false;
}

export async function getFileDownloadUrl(fileId: string): Promise<string> {
  const client = getApolloClient();
  const { data } = await client.mutate<GetFileDownloadUrlMutation>({
    mutation: gql`
      mutation GetFileDownloadUrl($input: PrepareAccessmodFileDownloadInput) {
        prepareAccessmodFileDownload(input: $input) {
          success
          downloadUrl
        }
      }
    `,
    variables: {
      input: {
        fileId,
      },
    },
  });

  if (data?.prepareAccessmodFileDownload?.success) {
    return data.prepareAccessmodFileDownload.downloadUrl as string;
  } else {
    throw new Error("File cannot be downloaded");
  }
}

export function formatDatasetStatus(status: AccessmodFilesetStatus) {
  switch (status) {
    case AccessmodFilesetStatus.Invalid:
      return i18n!.t("Invalid");
    case AccessmodFilesetStatus.Pending:
      return i18n!.t("Pending");
    case AccessmodFilesetStatus.Valid:
      return i18n!.t("Valid");
    case AccessmodFilesetStatus.Validating:
      return i18n!.t("Validating");
  }
}

export async function getTabularFileContent(
  file: Pick<AccessmodFile, "id" | "mimeType">
) {
  let textContent;
  try {
    textContent = sessionStorage.getItem(file.id);
  } catch (err) {
    console.error(err);
  }
  if (!textContent) {
    const downloadUrl = await getFileDownloadUrl(file.id);
    textContent = await fetch(downloadUrl).then((resp) => resp.text());
  }

  try {
    sessionStorage.setItem(file.id, textContent);
  } catch (err) {
    console.error(err);
  }
  return parse(textContent, { delimiter: ",", columns: true });
}

export async function getVectorFileContent(
  file: Pick<AccessmodFile, "id" | "mimeType">
) {
  let fileContent;

  try {
    fileContent = sessionStorage.getItem(file.id);
  } catch (err) {
    console.error(err);
  }
  if (!fileContent) {
    const downloadUrl = await getFileDownloadUrl(file.id);
    fileContent = await fetch(downloadUrl).then((resp) => resp.text());
  }
  try {
    sessionStorage.setItem(file.id, fileContent);
  } catch (err) {
    console.error(err);
  }
  return JSON.parse(fileContent);
}
