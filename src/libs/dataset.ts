import { gql } from "@apollo/client";
import { getApolloClient } from "./apollo";
import {
  AccessmodFilesetFormat,
  AccessmodFilesetRoleCode,
  CreateFileMutation,
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

export const ACCEPTED_MIMETYPES = {
  [AccessmodFilesetFormat.Vector]: [
    ".gpkg",
    ".shp",
    ".prj",
    ".dbf",
    ".shx",
    ".json",
    ".geojson",
  ],
  [AccessmodFilesetFormat.Raster]: [".tif", ".tiff", ".img"],
  [AccessmodFilesetFormat.Tabular]: [".csv"],
};
