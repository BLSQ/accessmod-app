import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type AccessmodFile = {
  __typename?: 'AccessmodFile';
  createdAt: Scalars['DateTime'];
  fileset?: Maybe<AccessmodFileset>;
  id: Scalars['String'];
  mimeType: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uri: Scalars['String'];
};

export type AccessmodFileset = {
  __typename?: 'AccessmodFileset';
  createdAt: Scalars['DateTime'];
  files: Array<Maybe<AccessmodFile>>;
  id: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  role?: Maybe<AccessmodFilesetRole>;
  updatedAt: Scalars['DateTime'];
};

export enum AccessmodFilesetFormat {
  Raster = 'RASTER',
  Tabular = 'TABULAR',
  Vector = 'VECTOR'
}

export type AccessmodFilesetPage = {
  __typename?: 'AccessmodFilesetPage';
  items: Array<AccessmodFileset>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type AccessmodFilesetRole = {
  __typename?: 'AccessmodFilesetRole';
  createdAt: Scalars['DateTime'];
  format: AccessmodFilesetFormat;
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AccessmodFilesetRolePage = {
  __typename?: 'AccessmodFilesetRolePage';
  items: Array<AccessmodFilesetRole>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type AccessmodProject = {
  __typename?: 'AccessmodProject';
  country: Country;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  spatialResolution: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type AccessmodProjectPage = {
  __typename?: 'AccessmodProjectPage';
  items: Array<AccessmodProject>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Avatar = {
  __typename?: 'Avatar';
  color: Scalars['String'];
  initials: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  alpha3: Scalars['String'];
  code: Scalars['String'];
  flag: Scalars['String'];
  name: Scalars['String'];
};

export type CountryInput = {
  alpha3?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  flag?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CreateAccessmodFileInput = {
  filesetId: Scalars['String'];
  mimeType: Scalars['String'];
  uri: Scalars['String'];
};

export type CreateAccessmodFileResult = {
  __typename?: 'CreateAccessmodFileResult';
  file?: Maybe<AccessmodFile>;
  success: Scalars['Boolean'];
};

export type CreateAccessmodFilesetInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
  roleId: Scalars['String'];
};

export type CreateAccessmodFilesetResult = {
  __typename?: 'CreateAccessmodFilesetResult';
  fileset?: Maybe<AccessmodFileset>;
  success: Scalars['Boolean'];
};

export type CreateAccessmodProjectInput = {
  country: CountryInput;
  name: Scalars['String'];
  spatialResolution: Scalars['Int'];
};

export type CreateAccessmodProjectResult = {
  __typename?: 'CreateAccessmodProjectResult';
  project?: Maybe<AccessmodProject>;
  success: Scalars['Boolean'];
};

export type DeleteAccessmodFileInput = {
  id: Scalars['String'];
};

export type DeleteAccessmodFileResult = {
  __typename?: 'DeleteAccessmodFileResult';
  success: Scalars['Boolean'];
};

export type DeleteAccessmodFilesetInput = {
  id: Scalars['String'];
};

export type DeleteAccessmodFilesetResult = {
  __typename?: 'DeleteAccessmodFilesetResult';
  success: Scalars['Boolean'];
};

export type DeleteAccessmodProjectInput = {
  id: Scalars['String'];
};

export type DeleteAccessmodProjectResult = {
  __typename?: 'DeleteAccessmodProjectResult';
  success: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  me?: Maybe<User>;
  success: Scalars['Boolean'];
};

export type LogoutResult = {
  __typename?: 'LogoutResult';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccessmodFile?: Maybe<CreateAccessmodFileResult>;
  createAccessmodFileset?: Maybe<CreateAccessmodFilesetResult>;
  createAccessmodProject?: Maybe<CreateAccessmodProjectResult>;
  deleteAccessmodFile?: Maybe<DeleteAccessmodFileResult>;
  deleteAccessmodFileset?: Maybe<DeleteAccessmodFilesetResult>;
  deleteAccessmodProject?: Maybe<DeleteAccessmodProjectResult>;
  login?: Maybe<LoginResult>;
  logout?: Maybe<LogoutResult>;
  prepareAccessmodFileUpload?: Maybe<PrepareAccessmodFileUploadResult>;
  updateAccessmodProject?: Maybe<UpdateAccessmodProjectResult>;
};


export type MutationCreateAccessmodFileArgs = {
  input?: InputMaybe<CreateAccessmodFileInput>;
};


export type MutationCreateAccessmodFilesetArgs = {
  input?: InputMaybe<CreateAccessmodFilesetInput>;
};


export type MutationCreateAccessmodProjectArgs = {
  input?: InputMaybe<CreateAccessmodProjectInput>;
};


export type MutationDeleteAccessmodFileArgs = {
  input?: InputMaybe<DeleteAccessmodFileInput>;
};


export type MutationDeleteAccessmodFilesetArgs = {
  input?: InputMaybe<DeleteAccessmodFilesetInput>;
};


export type MutationDeleteAccessmodProjectArgs = {
  input?: InputMaybe<DeleteAccessmodProjectInput>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPrepareAccessmodFileUploadArgs = {
  input?: InputMaybe<PrepareAccessmodFileUploadInput>;
};


export type MutationUpdateAccessmodProjectArgs = {
  input?: InputMaybe<UpdateAccessmodProjectInput>;
};

export type Organization = {
  __typename?: 'Organization';
  contactInfo: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type OrganizationInput = {
  contactInfo?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type PrepareAccessmodFileUploadInput = {
  filesetId: Scalars['String'];
  mimeType: Scalars['String'];
};

export type PrepareAccessmodFileUploadResult = {
  __typename?: 'PrepareAccessmodFileUploadResult';
  fileUri?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  uploadUrl?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  accessmodFileset?: Maybe<AccessmodFileset>;
  accessmodFilesetRole?: Maybe<AccessmodFilesetRole>;
  accessmodFilesetRoles?: Maybe<AccessmodFilesetRolePage>;
  accessmodFilesets: AccessmodFilesetPage;
  accessmodProject?: Maybe<AccessmodProject>;
  accessmodProjects: AccessmodProjectPage;
  countries?: Maybe<Array<Country>>;
  me?: Maybe<User>;
  organizations?: Maybe<Array<Organization>>;
};


export type QueryAccessmodFilesetArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryAccessmodFilesetRoleArgs = {
  id: Scalars['String'];
};


export type QueryAccessmodFilesetRolesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};


export type QueryAccessmodFilesetsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['String'];
};


export type QueryAccessmodProjectArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryAccessmodProjectsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type UpdateAccessmodProjectInput = {
  country?: InputMaybe<CountryInput>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  spatialResolution?: InputMaybe<Scalars['Int']>;
};

export type UpdateAccessmodProjectResult = {
  __typename?: 'UpdateAccessmodProjectResult';
  project?: Maybe<AccessmodProject>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  avatar: Avatar;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
};

export type NavbarQueryVariables = Exact<{ [key: string]: never; }>;


export type NavbarQuery = { __typename?: 'Query', accessmodProjects: { __typename?: 'AccessmodProjectPage', totalPages: number, items: Array<{ __typename?: 'AccessmodProject', id: string, name: string }> } };

export type CreateFilesetMutationVariables = Exact<{
  input?: InputMaybe<CreateAccessmodFilesetInput>;
}>;


export type CreateFilesetMutation = { __typename?: 'Mutation', createAccessmodFileset?: { __typename?: 'CreateAccessmodFilesetResult', success: boolean, fileset?: { __typename?: 'AccessmodFileset', id: string } | null } | null };

export type CreateDatasetDialog_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string };

export type CreateProjectMutationVariables = Exact<{
  input?: InputMaybe<CreateAccessmodProjectInput>;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createAccessmodProject?: { __typename?: 'CreateAccessmodProjectResult', success: boolean, project?: { __typename?: 'AccessmodProject', id: string } | null } | null };

export type FilesetRolePickerQueryVariables = Exact<{ [key: string]: never; }>;


export type FilesetRolePickerQuery = { __typename?: 'Query', accessmodFilesetRoles?: { __typename?: 'AccessmodFilesetRolePage', items: Array<{ __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, createdAt: any, updatedAt: any }> } | null };

export type ProjectCard_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, spatialResolution: number, country: { __typename?: 'Country', name: string, flag: string, code: string }, owner: { __typename?: 'User', firstName?: string | null, email: string, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } };

export type ProjectNavbar_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type ProjectPickerQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectPickerQuery = { __typename?: 'Query', accessmodProjects: { __typename?: 'AccessmodProjectPage', items: Array<{ __typename?: 'AccessmodProject', id: string, name: string, createdAt: any, updatedAt: any, country: { __typename?: 'Country', flag: string, name: string, code: string } }> } };

export type ProjectsList_ProjectsFragment = { __typename?: 'AccessmodProjectPage', pageNumber: number, totalPages: number, items: Array<{ __typename?: 'AccessmodProject', id: string, name: string, spatialResolution: number, country: { __typename?: 'Country', name: string, flag: string, code: string }, owner: { __typename?: 'User', firstName?: string | null, email: string, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'LogoutResult', success: boolean } | null };

export type GetUploadUrlMutationVariables = Exact<{
  input?: InputMaybe<PrepareAccessmodFileUploadInput>;
}>;


export type GetUploadUrlMutation = { __typename?: 'Mutation', prepareAccessmodFileUpload?: { __typename?: 'PrepareAccessmodFileUploadResult', success: boolean, uploadUrl?: string | null, fileUri?: string | null } | null };

export type CreateFileMutationVariables = Exact<{
  input?: InputMaybe<CreateAccessmodFileInput>;
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile?: { __typename?: 'CreateAccessmodFileResult', success: boolean } | null };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, id: string } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResult', success: boolean, me?: { __typename?: 'User', id: string, email: string } | null } | null };

export type ProjectAnalysisPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectAnalysisPageQuery = { __typename?: 'Query', accessmodProject?: { __typename?: 'AccessmodProject', id: string, name: string } | null };

export type ProjectDataPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectDataPageQuery = { __typename?: 'Query', accessmodProject?: { __typename?: 'AccessmodProject', id: string, name: string } | null };

export type ProjectPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectPageQuery = { __typename?: 'Query', accessmodProject?: { __typename?: 'AccessmodProject', id: string, name: string } | null };

export type ProjectsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsPageQuery = { __typename?: 'Query', accessmodProjects: { __typename?: 'AccessmodProjectPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename?: 'AccessmodProject', id: string, name: string, spatialResolution: number, country: { __typename?: 'Country', name: string, flag: string, code: string }, owner: { __typename?: 'User', firstName?: string | null, email: string, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } }> } };

export const CreateDatasetDialog_ProjectFragmentDoc = gql`
    fragment CreateDatasetDialog_project on AccessmodProject {
  id
  name
}
    `;
export const ProjectNavbar_ProjectFragmentDoc = gql`
    fragment ProjectNavbar_project on AccessmodProject {
  id
}
    `;
export const ProjectCard_ProjectFragmentDoc = gql`
    fragment ProjectCard_project on AccessmodProject {
  id
  name
  spatialResolution
  country {
    name
    flag
    code
  }
  owner {
    firstName
    email
    lastName
    avatar {
      initials
      color
    }
  }
}
    `;
export const ProjectsList_ProjectsFragmentDoc = gql`
    fragment ProjectsList_projects on AccessmodProjectPage {
  items {
    id
    ...ProjectCard_project
  }
  pageNumber
  totalPages
}
    ${ProjectCard_ProjectFragmentDoc}`;
export const NavbarDocument = gql`
    query Navbar {
  accessmodProjects(page: 1, perPage: 5) {
    items {
      id
      name
    }
    totalPages
  }
}
    `;

/**
 * __useNavbarQuery__
 *
 * To run a query within a React component, call `useNavbarQuery` and pass it any options that fit your needs.
 * When your component renders, `useNavbarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNavbarQuery({
 *   variables: {
 *   },
 * });
 */
export function useNavbarQuery(baseOptions?: Apollo.QueryHookOptions<NavbarQuery, NavbarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NavbarQuery, NavbarQueryVariables>(NavbarDocument, options);
      }
export function useNavbarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NavbarQuery, NavbarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NavbarQuery, NavbarQueryVariables>(NavbarDocument, options);
        }
export type NavbarQueryHookResult = ReturnType<typeof useNavbarQuery>;
export type NavbarLazyQueryHookResult = ReturnType<typeof useNavbarLazyQuery>;
export type NavbarQueryResult = Apollo.QueryResult<NavbarQuery, NavbarQueryVariables>;
export const CreateFilesetDocument = gql`
    mutation CreateFileset($input: CreateAccessmodFilesetInput) {
  createAccessmodFileset(input: $input) {
    success
    fileset {
      id
    }
  }
}
    `;
export type CreateFilesetMutationFn = Apollo.MutationFunction<CreateFilesetMutation, CreateFilesetMutationVariables>;

/**
 * __useCreateFilesetMutation__
 *
 * To run a mutation, you first call `useCreateFilesetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFilesetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFilesetMutation, { data, loading, error }] = useCreateFilesetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFilesetMutation(baseOptions?: Apollo.MutationHookOptions<CreateFilesetMutation, CreateFilesetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFilesetMutation, CreateFilesetMutationVariables>(CreateFilesetDocument, options);
      }
export type CreateFilesetMutationHookResult = ReturnType<typeof useCreateFilesetMutation>;
export type CreateFilesetMutationResult = Apollo.MutationResult<CreateFilesetMutation>;
export type CreateFilesetMutationOptions = Apollo.BaseMutationOptions<CreateFilesetMutation, CreateFilesetMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateAccessmodProjectInput) {
  createAccessmodProject(input: $input) {
    success
    project {
      id
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const FilesetRolePickerDocument = gql`
    query FilesetRolePicker {
  accessmodFilesetRoles {
    items {
      id
      name
      format
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useFilesetRolePickerQuery__
 *
 * To run a query within a React component, call `useFilesetRolePickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilesetRolePickerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilesetRolePickerQuery({
 *   variables: {
 *   },
 * });
 */
export function useFilesetRolePickerQuery(baseOptions?: Apollo.QueryHookOptions<FilesetRolePickerQuery, FilesetRolePickerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilesetRolePickerQuery, FilesetRolePickerQueryVariables>(FilesetRolePickerDocument, options);
      }
export function useFilesetRolePickerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilesetRolePickerQuery, FilesetRolePickerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilesetRolePickerQuery, FilesetRolePickerQueryVariables>(FilesetRolePickerDocument, options);
        }
export type FilesetRolePickerQueryHookResult = ReturnType<typeof useFilesetRolePickerQuery>;
export type FilesetRolePickerLazyQueryHookResult = ReturnType<typeof useFilesetRolePickerLazyQuery>;
export type FilesetRolePickerQueryResult = Apollo.QueryResult<FilesetRolePickerQuery, FilesetRolePickerQueryVariables>;
export const ProjectPickerDocument = gql`
    query ProjectPicker {
  accessmodProjects(page: 1, perPage: 40) {
    items {
      id
      name
      country {
        flag
        name
        code
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useProjectPickerQuery__
 *
 * To run a query within a React component, call `useProjectPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPickerQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectPickerQuery(baseOptions?: Apollo.QueryHookOptions<ProjectPickerQuery, ProjectPickerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPickerQuery, ProjectPickerQueryVariables>(ProjectPickerDocument, options);
      }
export function useProjectPickerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPickerQuery, ProjectPickerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPickerQuery, ProjectPickerQueryVariables>(ProjectPickerDocument, options);
        }
export type ProjectPickerQueryHookResult = ReturnType<typeof useProjectPickerQuery>;
export type ProjectPickerLazyQueryHookResult = ReturnType<typeof useProjectPickerLazyQuery>;
export type ProjectPickerQueryResult = Apollo.QueryResult<ProjectPickerQuery, ProjectPickerQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const GetUploadUrlDocument = gql`
    mutation GetUploadUrl($input: PrepareAccessmodFileUploadInput) {
  prepareAccessmodFileUpload(input: $input) {
    success
    uploadUrl
    fileUri
  }
}
    `;
export type GetUploadUrlMutationFn = Apollo.MutationFunction<GetUploadUrlMutation, GetUploadUrlMutationVariables>;

/**
 * __useGetUploadUrlMutation__
 *
 * To run a mutation, you first call `useGetUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getUploadUrlMutation, { data, loading, error }] = useGetUploadUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUploadUrlMutation(baseOptions?: Apollo.MutationHookOptions<GetUploadUrlMutation, GetUploadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetUploadUrlMutation, GetUploadUrlMutationVariables>(GetUploadUrlDocument, options);
      }
export type GetUploadUrlMutationHookResult = ReturnType<typeof useGetUploadUrlMutation>;
export type GetUploadUrlMutationResult = Apollo.MutationResult<GetUploadUrlMutation>;
export type GetUploadUrlMutationOptions = Apollo.BaseMutationOptions<GetUploadUrlMutation, GetUploadUrlMutationVariables>;
export const CreateFileDocument = gql`
    mutation CreateFile($input: CreateAccessmodFileInput) {
  createFile: createAccessmodFile(input: $input) {
    success
  }
}
    `;
export type CreateFileMutationFn = Apollo.MutationFunction<CreateFileMutation, CreateFileMutationVariables>;

/**
 * __useCreateFileMutation__
 *
 * To run a mutation, you first call `useCreateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileMutation, { data, loading, error }] = useCreateFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFileMutation(baseOptions?: Apollo.MutationHookOptions<CreateFileMutation, CreateFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFileMutation, CreateFileMutationVariables>(CreateFileDocument, options);
      }
export type CreateFileMutationHookResult = ReturnType<typeof useCreateFileMutation>;
export type CreateFileMutationResult = Apollo.MutationResult<CreateFileMutation>;
export type CreateFileMutationOptions = Apollo.BaseMutationOptions<CreateFileMutation, CreateFileMutationVariables>;
export const MeQueryDocument = gql`
    query MeQuery {
  me {
    email
    id
  }
}
    `;

/**
 * __useMeQueryQuery__
 *
 * To run a query within a React component, call `useMeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQueryQuery(baseOptions?: Apollo.QueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
      }
export function useMeQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
        }
export type MeQueryQueryHookResult = ReturnType<typeof useMeQueryQuery>;
export type MeQueryLazyQueryHookResult = ReturnType<typeof useMeQueryLazyQuery>;
export type MeQueryQueryResult = Apollo.QueryResult<MeQueryQuery, MeQueryQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    success
    me {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ProjectAnalysisPageDocument = gql`
    query ProjectAnalysisPage($id: String!) {
  accessmodProject(id: $id) {
    id
    name
    ...ProjectNavbar_project
  }
}
    ${ProjectNavbar_ProjectFragmentDoc}`;

/**
 * __useProjectAnalysisPageQuery__
 *
 * To run a query within a React component, call `useProjectAnalysisPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectAnalysisPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectAnalysisPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectAnalysisPageQuery(baseOptions: Apollo.QueryHookOptions<ProjectAnalysisPageQuery, ProjectAnalysisPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectAnalysisPageQuery, ProjectAnalysisPageQueryVariables>(ProjectAnalysisPageDocument, options);
      }
export function useProjectAnalysisPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectAnalysisPageQuery, ProjectAnalysisPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectAnalysisPageQuery, ProjectAnalysisPageQueryVariables>(ProjectAnalysisPageDocument, options);
        }
export type ProjectAnalysisPageQueryHookResult = ReturnType<typeof useProjectAnalysisPageQuery>;
export type ProjectAnalysisPageLazyQueryHookResult = ReturnType<typeof useProjectAnalysisPageLazyQuery>;
export type ProjectAnalysisPageQueryResult = Apollo.QueryResult<ProjectAnalysisPageQuery, ProjectAnalysisPageQueryVariables>;
export const ProjectDataPageDocument = gql`
    query ProjectDataPage($id: String!) {
  accessmodProject(id: $id) {
    id
    name
    ...ProjectNavbar_project
    ...CreateDatasetDialog_project
  }
}
    ${ProjectNavbar_ProjectFragmentDoc}
${CreateDatasetDialog_ProjectFragmentDoc}`;

/**
 * __useProjectDataPageQuery__
 *
 * To run a query within a React component, call `useProjectDataPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDataPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDataPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectDataPageQuery(baseOptions: Apollo.QueryHookOptions<ProjectDataPageQuery, ProjectDataPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDataPageQuery, ProjectDataPageQueryVariables>(ProjectDataPageDocument, options);
      }
export function useProjectDataPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDataPageQuery, ProjectDataPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDataPageQuery, ProjectDataPageQueryVariables>(ProjectDataPageDocument, options);
        }
export type ProjectDataPageQueryHookResult = ReturnType<typeof useProjectDataPageQuery>;
export type ProjectDataPageLazyQueryHookResult = ReturnType<typeof useProjectDataPageLazyQuery>;
export type ProjectDataPageQueryResult = Apollo.QueryResult<ProjectDataPageQuery, ProjectDataPageQueryVariables>;
export const ProjectPageDocument = gql`
    query ProjectPage($id: String!) {
  accessmodProject(id: $id) {
    id
    name
    ...ProjectNavbar_project
  }
}
    ${ProjectNavbar_ProjectFragmentDoc}`;

/**
 * __useProjectPageQuery__
 *
 * To run a query within a React component, call `useProjectPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectPageQuery(baseOptions: Apollo.QueryHookOptions<ProjectPageQuery, ProjectPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPageQuery, ProjectPageQueryVariables>(ProjectPageDocument, options);
      }
export function useProjectPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPageQuery, ProjectPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPageQuery, ProjectPageQueryVariables>(ProjectPageDocument, options);
        }
export type ProjectPageQueryHookResult = ReturnType<typeof useProjectPageQuery>;
export type ProjectPageLazyQueryHookResult = ReturnType<typeof useProjectPageLazyQuery>;
export type ProjectPageQueryResult = Apollo.QueryResult<ProjectPageQuery, ProjectPageQueryVariables>;
export const ProjectsPageDocument = gql`
    query ProjectsPage {
  accessmodProjects(page: 1, perPage: 20) {
    ...ProjectsList_projects
    pageNumber
    totalPages
    totalItems
  }
}
    ${ProjectsList_ProjectsFragmentDoc}`;

/**
 * __useProjectsPageQuery__
 *
 * To run a query within a React component, call `useProjectsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsPageQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsPageQuery, ProjectsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsPageQuery, ProjectsPageQueryVariables>(ProjectsPageDocument, options);
      }
export function useProjectsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsPageQuery, ProjectsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsPageQuery, ProjectsPageQueryVariables>(ProjectsPageDocument, options);
        }
export type ProjectsPageQueryHookResult = ReturnType<typeof useProjectsPageQuery>;
export type ProjectsPageLazyQueryHookResult = ReturnType<typeof useProjectsPageLazyQuery>;
export type ProjectsPageQueryResult = Apollo.QueryResult<ProjectsPageQuery, ProjectsPageQueryVariables>;