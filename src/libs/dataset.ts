import { gql, useQuery } from "@apollo/client";
import { parse } from "csv-parse/sync";
import * as geotiff from "geotiff";
import { DateTime } from "luxon";
import { i18n } from "next-i18next";
import { getApolloClient } from "./apollo";
import { JobFile, uploader } from "./file";
import {
  AccessmodFile,
  AccessmodFilesetFormat,
  AccessmodFilesetRole,
  AccessmodFilesetRoleCode,
  AccessmodFilesetStatus,
  AccessmodProject,
  CreateAccessmodFilesetError,
  CreateDatasetMutation,
  CreateDatasetMutationVariables,
  CreateFileMutation,
  GetFileDownloadUrlMutation,
  GetFilesetRolesQuery,
  GetUploadUrlMutation,
  Scalars,
} from "./graphql";

const GET_PRESIGNED_MUTATION = gql`
  mutation GetUploadUrl($input: PrepareAccessmodFileUploadInput!) {
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
  mutation CreateFile($input: CreateAccessmodFileInput!) {
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
    "application/geo+json": [".geojson"],
    "application/geopackage+sqlite3": [".gpkg"],
    "application/vnd.geo+json": [".geojson"],
  },
  [AccessmodFilesetFormat.Raster]: {
    "image/tiff": [".tif", ".tiff", "*.tff"],
  },
  [AccessmodFilesetFormat.Tabular]: {
    "text/plain": [".csv"],
    "text/csv": [".csv"],
  },
};

export type GeoFileMetadata = {
  crs?: number;
  bounds: number[];
  geoKeys: { [key: string]: unknown };
  resolution: number;
  modelType: 0 | 1 | 2 | 3 | 32767; // See http://docs.opengeospatial.org/is/19-008r4/19-008r4.html#_requirements_class_gtmodeltypegeokey
};

interface GeoFile extends File {
  geotiff?: geotiff.GeoTIFF;
  geoMetadata?: GeoFileMetadata;
}

export async function getRasterMetadata(file: GeoFile) {
  if (!file.geoMetadata) {
    file.geotiff = await geotiff.fromBlob(file);
    const image = await file.geotiff.getImage();
    const geoKeys = image.getGeoKeys();
    const metadata: GeoFileMetadata = {
      bounds: image.getBoundingBox(),
      geoKeys: image.getGeoKeys(),
      resolution: image.getResolution()[0],
      modelType: geoKeys.GTModelTypeGeoKey,
    };

    switch (metadata.modelType) {
      case 1:
        metadata.crs =
          geoKeys.ProjectedCRSGeoKey ?? geoKeys.ProjectedCSTypeGeoKey;
        break;
      case 2:
        metadata.crs =
          geoKeys.GeodeticCRSGeoKey ?? geoKeys.GeographicTypeGeoKey;
        break;
    }

    file.geoMetadata = metadata;
  }
  return file.geoMetadata;
}

export function getExtentCoords(boundingBox: number[]) {
  const [xmin, ymin, xmax, ymax] = boundingBox;
  return [
    [xmin, ymin],
    [xmax, ymin],
    [xmax, ymax],
    [xmin, ymax],
    [xmin, ymin],
  ];
}

export async function getFileDownloadUrl(fileId: string): Promise<string> {
  const client = getApolloClient();
  const { data } = await client.mutate<GetFileDownloadUrlMutation>({
    mutation: gql`
      mutation GetFileDownloadUrl($input: PrepareAccessmodFileDownloadInput!) {
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
    case AccessmodFilesetStatus.ToAcquire:
      return i18n!.t("To acquire");
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

type CreateDatasetInput = {
  name?: string;
  project: Pick<AccessmodProject, "id">;
  role: Pick<AccessmodFilesetRole, "id" | "name">;
  files?: File[];
  automatic?: boolean;
  metadata?: Scalars["AccessmodFilesetMetadata"];
};

type CreateDatasetOptions = {
  onProgress?: (progress: number) => void;
};

export async function createDataset(
  {
    name,
    project,
    role,
    automatic = false,
    files = [],
    metadata = {},
  }: CreateDatasetInput,
  { onProgress }: CreateDatasetOptions = {}
) {
  const client = getApolloClient();

  const input = {
    projectId: project.id,
    roleId: role.id,
    automatic,
    metadata,
    name:
      name ??
      `Automatic ${role.name} (${DateTime.now().toLocaleString(
        DateTime.DATETIME_SHORT
      )})`,
  };

  const { data } = await client.mutate<
    CreateDatasetMutation,
    CreateDatasetMutationVariables
  >({
    mutation: gql`
      mutation CreateDataset($input: CreateAccessmodFilesetInput!) {
        createAccessmodFileset(input: $input) {
          success
          errors
          fileset {
            id
            name
            status
            metadata
            role {
              id
              code
              name
              format
            }
          }
        }
      }
    `,
    variables: {
      input,
    },
  });

  if (!data) {
    throw new Error(i18n!.t("An error occured"));
  }

  const { success, fileset, errors } = data.createAccessmodFileset;
  if (errors.includes(CreateAccessmodFilesetError.NameDuplicate)) {
    throw new Error(i18n!.t("A dataset with this name already exists"));
  } else if (errors.includes(CreateAccessmodFilesetError.PermissionDenied)) {
    throw new Error(
      i18n!.t("You do not have sufficient permissions to perform this action")
    );
  } else if (!success || !fileset) {
    throw new Error(i18n!.t("Dataset not created"));
  }

  // Upload files
  await uploader.createUploadJob({
    files,
    axiosConfig: { method: "PUT" },
    onProgress,
    onBeforeFileUpload: async (
      file: JobFile & {
        uri?: string;
      }
    ) => {
      const mimeType = guessFileMimeType(file);
      if (!mimeType) {
        throw new Error("Unknown mime type");
      }
      const data = await getPresignedURL(fileset.id, mimeType);
      if (!data || !data.fileUri) {
        throw new Error("No URI returned");
      }
      file.uri = data.fileUri;

      return {
        url: data!.uploadUrl as string,
        headers: {
          // FIXME: This header should be passed by the backend somehow
          "x-amz-acl": "private",
        },
      };
    },
    onAfterFileUpload: async (
      file: JobFile & {
        uri?: string;
      }
    ) => {
      if (!file.uri) {
        throw new Error("File has no URI");
      }
      const mimeType = guessFileMimeType(file);
      if (!mimeType) {
        throw new Error("Unknown mime type");
      }
      await createFile(fileset.id, file.uri, mimeType);
    },
  });

  return fileset;
}

export function getDatasetDefaultMetadata(roleCode: AccessmodFilesetRoleCode) {
  switch (roleCode) {
    case AccessmodFilesetRoleCode.Dem:
      return {};
    case AccessmodFilesetRoleCode.Stack:
      return {};
    case AccessmodFilesetRoleCode.LandCover:
      return {
        labels: {
          "20": "Shrubs",
          "30": "Herbaceous vegetation",
          "40": "Cropland",
          "50": "Urban",
          "60": "Sparse vegetation",
          "70": "Snow",
          "80": "Permanent water bodies",
          "90": "Herbaceous wetland",
          "100": "Moss and lichen",
          "110": "Closed forest",
          "120": "Open forest",
          "200": "Open sea",
        },
      };
    case AccessmodFilesetRoleCode.TransportNetwork:
      return {
        columns: ["highway", "surface", "smoothness", "tracktype"],
        category_column: "highway",
        values: {
          highway: [
            "primary",
            "primary_link",
            "secondary",
            "secondary_link",
            "tertiary",
            "tertiary_link",
            "trunk",
            "trunk_link",
            "unclassified",
            "residential",
            "living_street",
            "service",
            "track",
            "path",
          ],
        },
      };
    default:
      return {};
  }
}

export type MetadataFormValues = {
  category_column?: string | null;
  name_column?: string | null;
  columns?: string[];
  validation_error?: string;
  values?: { [key: string]: string[] };
  labels?: [string, string][];
};

export function toMetadataFormValues(
  metadata: Scalars["AccessmodFilesetMetadata"]
): MetadataFormValues {
  const labels = Object.entries<string>(metadata.labels ?? {});
  labels.sort((a, b) => (a[0] < b[0] ? 1 : -1));
  return {
    ...metadata,
    labels,
  };
}

export function toMetadataInput(metadata: any) {
  const inputMetadata = {
    ...metadata,
  };
  if (metadata["labels"]) {
    inputMetadata.labels = (metadata.labels as [string, string][]).reduce(
      (acc, cur) => {
        acc[cur[0]] = cur[1];
        return acc;
      },
      {} as { [key: string]: string }
    );
  }

  return inputMetadata as Scalars["AccessmodFilesetMetadata"];
}
