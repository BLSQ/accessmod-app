import { gql } from "@apollo/client";
import { getApolloClient } from "./apollo";
import { CreateFileMutation, GetUploadUrlMutation } from "./graphql";

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
