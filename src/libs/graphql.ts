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
  AccessmodFilesetMetadata: any;
  Date: any;
  DateTime: any;
};

export type AccessmodAccessibilityAnalysis = AccessmodAnalysis & {
  __typename?: 'AccessmodAccessibilityAnalysis';
  algorithm?: Maybe<AccessmodAccessibilityAnalysisAlgorithm>;
  author: User;
  authorizedActions: Array<AccessmodAnalysisAuthorizedActions>;
  barrier?: Maybe<AccessmodFileset>;
  catchmentAreas?: Maybe<AccessmodFileset>;
  createdAt: Scalars['DateTime'];
  dem?: Maybe<AccessmodFileset>;
  frictionSurface?: Maybe<AccessmodFileset>;
  healthFacilities?: Maybe<AccessmodFileset>;
  id: Scalars['String'];
  invertDirection?: Maybe<Scalars['Boolean']>;
  knightMove?: Maybe<Scalars['Boolean']>;
  landCover?: Maybe<AccessmodFileset>;
  maxSlope?: Maybe<Scalars['Float']>;
  maxTravelTime?: Maybe<Scalars['Int']>;
  movingSpeeds?: Maybe<AccessmodFileset>;
  name: Scalars['String'];
  priorityLandCover?: Maybe<Array<Scalars['Int']>>;
  priorityRoads?: Maybe<Scalars['Boolean']>;
  slope?: Maybe<AccessmodFileset>;
  status: AccessmodAnalysisStatus;
  transportNetwork?: Maybe<AccessmodFileset>;
  travelTimes?: Maybe<AccessmodFileset>;
  type: AccessmodAnalysisType;
  updatedAt: Scalars['DateTime'];
  water?: Maybe<AccessmodFileset>;
  waterAllTouched?: Maybe<Scalars['Boolean']>;
};

export enum AccessmodAccessibilityAnalysisAlgorithm {
  Anisotropic = 'ANISOTROPIC',
  Isotropic = 'ISOTROPIC'
}

export type AccessmodAnalysis = {
  author: User;
  authorizedActions: Array<AccessmodAnalysisAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  status: AccessmodAnalysisStatus;
  type: AccessmodAnalysisType;
  updatedAt: Scalars['DateTime'];
};

export enum AccessmodAnalysisAuthorizedActions {
  Delete = 'DELETE',
  Run = 'RUN',
  Update = 'UPDATE'
}

export type AccessmodAnalysisPage = {
  __typename?: 'AccessmodAnalysisPage';
  items: Array<AccessmodAnalysis>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum AccessmodAnalysisStatus {
  Draft = 'DRAFT',
  Failed = 'FAILED',
  Queued = 'QUEUED',
  Ready = 'READY',
  Running = 'RUNNING',
  Success = 'SUCCESS'
}

export enum AccessmodAnalysisType {
  Accessibility = 'ACCESSIBILITY',
  GeographicCoverage = 'GEOGRAPHIC_COVERAGE'
}

export type AccessmodFile = {
  __typename?: 'AccessmodFile';
  createdAt: Scalars['DateTime'];
  fileset?: Maybe<AccessmodFileset>;
  id: Scalars['String'];
  mimeType: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uri: Scalars['String'];
};

export type AccessmodFileset = {
  __typename?: 'AccessmodFileset';
  author: User;
  authorizedActions: Array<AccessmodFilesetAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  files: Array<AccessmodFile>;
  id: Scalars['String'];
  metadata: Scalars['AccessmodFilesetMetadata'];
  name: Scalars['String'];
  role: AccessmodFilesetRole;
  status: AccessmodFilesetStatus;
  updatedAt: Scalars['DateTime'];
};

export enum AccessmodFilesetAuthorizedActions {
  CreateFile = 'CREATE_FILE',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

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
  code: AccessmodFilesetRoleCode;
  createdAt: Scalars['DateTime'];
  format: AccessmodFilesetFormat;
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum AccessmodFilesetRoleCode {
  Barrier = 'BARRIER',
  CatchmentAreas = 'CATCHMENT_AREAS',
  Coverage = 'COVERAGE',
  Dem = 'DEM',
  FrictionSurface = 'FRICTION_SURFACE',
  Geometry = 'GEOMETRY',
  HealthFacilities = 'HEALTH_FACILITIES',
  LandCover = 'LAND_COVER',
  MovingSpeeds = 'MOVING_SPEEDS',
  Population = 'POPULATION',
  Slope = 'SLOPE',
  TransportNetwork = 'TRANSPORT_NETWORK',
  TravelTimes = 'TRAVEL_TIMES',
  Water = 'WATER'
}

export enum AccessmodFilesetStatus {
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Valid = 'VALID',
  Validating = 'VALIDATING'
}

export type AccessmodGeographicCoverageAnalysis = AccessmodAnalysis & {
  __typename?: 'AccessmodGeographicCoverageAnalysis';
  anisotropic?: Maybe<Scalars['Boolean']>;
  author: User;
  authorizedActions: Array<AccessmodAnalysisAuthorizedActions>;
  catchmentAreas?: Maybe<AccessmodFileset>;
  createdAt: Scalars['DateTime'];
  dem?: Maybe<AccessmodFileset>;
  frictionSurface?: Maybe<AccessmodFileset>;
  geographicCoverage?: Maybe<AccessmodFileset>;
  healthFacilities?: Maybe<AccessmodFileset>;
  hfProcessingOrder?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  maxTravelTime?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  population?: Maybe<AccessmodFileset>;
  status: AccessmodAnalysisStatus;
  type: AccessmodAnalysisType;
  updatedAt: Scalars['DateTime'];
};

export type AccessmodProject = {
  __typename?: 'AccessmodProject';
  author: User;
  authorizedActions: Array<AccessmodProjectAuthorizedActions>;
  country: Country;
  createdAt: Scalars['DateTime'];
  crs: Scalars['Int'];
  description: Scalars['String'];
  extent?: Maybe<AccessmodFileset>;
  id: Scalars['String'];
  name: Scalars['String'];
  permissions: Array<AccessmodProjectPermission>;
  spatialResolution: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export enum AccessmodProjectAuthorizedActions {
  CreateAnalysis = 'CREATE_ANALYSIS',
  CreateFileset = 'CREATE_FILESET',
  CreatePermission = 'CREATE_PERMISSION',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type AccessmodProjectPage = {
  __typename?: 'AccessmodProjectPage';
  items: Array<AccessmodProject>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type AccessmodProjectPermission = {
  __typename?: 'AccessmodProjectPermission';
  authorizedActions: Array<AccessmodProjectPermissionAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  mode: PermissionMode;
  project: AccessmodProject;
  team?: Maybe<Team>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export enum AccessmodProjectPermissionAuthorizedActions {
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type AccessmodProjectPermissionPage = {
  __typename?: 'AccessmodProjectPermissionPage';
  items: Array<AccessmodProjectPermission>;
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

export enum CreateAccessmodAccessibilityAnalysisError {
  NameDuplicate = 'NAME_DUPLICATE'
}

export type CreateAccessmodAccessibilityAnalysisInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type CreateAccessmodAccessibilityAnalysisResult = {
  __typename?: 'CreateAccessmodAccessibilityAnalysisResult';
  analysis?: Maybe<AccessmodAccessibilityAnalysis>;
  errors: Array<CreateAccessmodAccessibilityAnalysisError>;
  success: Scalars['Boolean'];
};

export enum CreateAccessmodFileError {
  UriDuplicate = 'URI_DUPLICATE'
}

export type CreateAccessmodFileInput = {
  filesetId: Scalars['String'];
  mimeType: Scalars['String'];
  uri: Scalars['String'];
};

export type CreateAccessmodFileResult = {
  __typename?: 'CreateAccessmodFileResult';
  errors: Array<CreateAccessmodFileError>;
  file?: Maybe<AccessmodFile>;
  success: Scalars['Boolean'];
};

export enum CreateAccessmodFilesetError {
  NameDuplicate = 'NAME_DUPLICATE',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type CreateAccessmodFilesetInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
  roleId: Scalars['String'];
};

export type CreateAccessmodFilesetResult = {
  __typename?: 'CreateAccessmodFilesetResult';
  errors: Array<CreateAccessmodFilesetError>;
  fileset?: Maybe<AccessmodFileset>;
  success: Scalars['Boolean'];
};

export enum CreateAccessmodProjectError {
  NameDuplicate = 'NAME_DUPLICATE',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type CreateAccessmodProjectInput = {
  country: CountryInput;
  crs: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  extentId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  spatialResolution: Scalars['Int'];
};

export enum CreateAccessmodProjectPermissionError {
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type CreateAccessmodProjectPermissionInput = {
  mode: PermissionMode;
  projectId: Scalars['String'];
  teamId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateAccessmodProjectPermissionResult = {
  __typename?: 'CreateAccessmodProjectPermissionResult';
  errors: Array<CreateAccessmodProjectPermissionError>;
  permission?: Maybe<AccessmodProjectPermission>;
  success: Scalars['Boolean'];
};

export type CreateAccessmodProjectResult = {
  __typename?: 'CreateAccessmodProjectResult';
  errors: Array<CreateAccessmodProjectError>;
  project?: Maybe<AccessmodProject>;
  success: Scalars['Boolean'];
};

export enum CreateMembershipError {
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type CreateMembershipInput = {
  role: MembershipRole;
  teamId: Scalars['String'];
  userEmail: Scalars['String'];
};

export type CreateMembershipResult = {
  __typename?: 'CreateMembershipResult';
  errors: Array<CreateMembershipError>;
  membership?: Maybe<Membership>;
  success: Scalars['Boolean'];
};

export enum CreateTeamError {
  NameDuplicate = 'NAME_DUPLICATE',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type CreateTeamInput = {
  name: Scalars['String'];
};

export type CreateTeamResult = {
  __typename?: 'CreateTeamResult';
  errors: Array<CreateTeamError>;
  success: Scalars['Boolean'];
  team?: Maybe<Team>;
};

export enum DeleteAccessmodAnalysisError {
  DeleteFailed = 'DELETE_FAILED',
  NotFound = 'NOT_FOUND'
}

export type DeleteAccessmodAnalysisInput = {
  id: Scalars['String'];
};

export type DeleteAccessmodAnalysisResult = {
  __typename?: 'DeleteAccessmodAnalysisResult';
  errors: Array<DeleteAccessmodAnalysisError>;
  success: Scalars['Boolean'];
};

export enum DeleteAccessmodFileError {
  NotFound = 'NOT_FOUND'
}

export type DeleteAccessmodFileInput = {
  id: Scalars['String'];
};

export type DeleteAccessmodFileResult = {
  __typename?: 'DeleteAccessmodFileResult';
  errors: Array<DeleteAccessmodFileError>;
  success: Scalars['Boolean'];
};

export enum DeleteAccessmodFilesetError {
  NotFound = 'NOT_FOUND'
}

export type DeleteAccessmodFilesetInput = {
  id: Scalars['String'];
};

export type DeleteAccessmodFilesetResult = {
  __typename?: 'DeleteAccessmodFilesetResult';
  errors: Array<DeleteAccessmodFilesetError>;
  success: Scalars['Boolean'];
};

export enum DeleteAccessmodProjectError {
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type DeleteAccessmodProjectInput = {
  id: Scalars['String'];
};

export enum DeleteAccessmodProjectPermissionError {
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type DeleteAccessmodProjectPermissionInput = {
  id: Scalars['String'];
};

export type DeleteAccessmodProjectPermissionResult = {
  __typename?: 'DeleteAccessmodProjectPermissionResult';
  errors: Array<DeleteAccessmodProjectPermissionError>;
  success: Scalars['Boolean'];
};

export type DeleteAccessmodProjectResult = {
  __typename?: 'DeleteAccessmodProjectResult';
  errors: Array<DeleteAccessmodProjectError>;
  success: Scalars['Boolean'];
};

export enum DeleteMembershipError {
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type DeleteMembershipInput = {
  id: Scalars['String'];
};

export type DeleteMembershipResult = {
  __typename?: 'DeleteMembershipResult';
  errors: Array<DeleteMembershipError>;
  success: Scalars['Boolean'];
};

export enum DeleteTeamError {
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type DeleteTeamInput = {
  id: Scalars['String'];
};

export type DeleteTeamResult = {
  __typename?: 'DeleteTeamResult';
  errors: Array<DeleteTeamError>;
  success: Scalars['Boolean'];
};

export enum LaunchAccessmodAnalysisError {
  LaunchFailed = 'LAUNCH_FAILED'
}

export type LaunchAccessmodAnalysisInput = {
  id: Scalars['String'];
};

export type LaunchAccessmodAnalysisResult = {
  __typename?: 'LaunchAccessmodAnalysisResult';
  analysis?: Maybe<AccessmodAnalysis>;
  errors: Array<LaunchAccessmodAnalysisError>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  me?: Maybe<Me>;
  success: Scalars['Boolean'];
};

export type LogoutResult = {
  __typename?: 'LogoutResult';
  success: Scalars['Boolean'];
};

export type Me = {
  __typename?: 'Me';
  authorizedActions: Array<MeAuthorizedActions>;
  user?: Maybe<User>;
};

export enum MeAuthorizedActions {
  CreateAccessmodProject = 'CREATE_ACCESSMOD_PROJECT',
  CreateTeam = 'CREATE_TEAM'
}

export type Membership = {
  __typename?: 'Membership';
  authorizedActions: Array<MembershipAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  role: MembershipRole;
  team: Team;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export enum MembershipAuthorizedActions {
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type MembershipPage = {
  __typename?: 'MembershipPage';
  items: Array<Membership>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum MembershipRole {
  Admin = 'ADMIN',
  Regular = 'REGULAR'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAccessmodAccessibilityAnalysis: CreateAccessmodAccessibilityAnalysisResult;
  createAccessmodFile: CreateAccessmodFileResult;
  createAccessmodFileset: CreateAccessmodFilesetResult;
  createAccessmodProject: CreateAccessmodProjectResult;
  createAccessmodProjectPermission: CreateAccessmodProjectPermissionResult;
  createMembership: CreateMembershipResult;
  createTeam: CreateTeamResult;
  deleteAccessmodAnalysis: DeleteAccessmodAnalysisResult;
  deleteAccessmodFile: DeleteAccessmodFileResult;
  deleteAccessmodFileset: DeleteAccessmodFilesetResult;
  deleteAccessmodProject: DeleteAccessmodProjectResult;
  deleteAccessmodProjectPermission: DeleteAccessmodProjectPermissionResult;
  deleteMembership: DeleteMembershipResult;
  deleteTeam: DeleteTeamResult;
  launchAccessmodAnalysis: LaunchAccessmodAnalysisResult;
  login: LoginResult;
  logout: LogoutResult;
  prepareAccessmodFileDownload: PrepareAccessmodFileDownloadResult;
  prepareAccessmodFileUpload: PrepareAccessmodFileUploadResult;
  resetPassword: ResetPasswordResult;
  setPassword: SetPasswordResult;
  updateAccessmodAccessibilityAnalysis: UpdateAccessmodAccessibilityAnalysisResult;
  updateAccessmodProject: UpdateAccessmodProjectResult;
  updateAccessmodProjectPermission: UpdateAccessmodProjectPermissionResult;
  updateMembership: UpdateMembershipResult;
  updateTeam: UpdateTeamResult;
};


export type MutationCreateAccessmodAccessibilityAnalysisArgs = {
  input?: InputMaybe<CreateAccessmodAccessibilityAnalysisInput>;
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


export type MutationCreateAccessmodProjectPermissionArgs = {
  input: CreateAccessmodProjectPermissionInput;
};


export type MutationCreateMembershipArgs = {
  input: CreateMembershipInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationDeleteAccessmodAnalysisArgs = {
  input?: InputMaybe<DeleteAccessmodAnalysisInput>;
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


export type MutationDeleteAccessmodProjectPermissionArgs = {
  input: DeleteAccessmodProjectPermissionInput;
};


export type MutationDeleteMembershipArgs = {
  input: DeleteMembershipInput;
};


export type MutationDeleteTeamArgs = {
  input: DeleteTeamInput;
};


export type MutationLaunchAccessmodAnalysisArgs = {
  input?: InputMaybe<LaunchAccessmodAnalysisInput>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPrepareAccessmodFileDownloadArgs = {
  input?: InputMaybe<PrepareAccessmodFileDownloadInput>;
};


export type MutationPrepareAccessmodFileUploadArgs = {
  input?: InputMaybe<PrepareAccessmodFileUploadInput>;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSetPasswordArgs = {
  input: SetPasswordInput;
};


export type MutationUpdateAccessmodAccessibilityAnalysisArgs = {
  input?: InputMaybe<UpdateAccessmodAccessibilityAnalysisInput>;
};


export type MutationUpdateAccessmodProjectArgs = {
  input?: InputMaybe<UpdateAccessmodProjectInput>;
};


export type MutationUpdateAccessmodProjectPermissionArgs = {
  input: UpdateAccessmodProjectPermissionInput;
};


export type MutationUpdateMembershipArgs = {
  input: UpdateMembershipInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
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

export enum PermissionMode {
  Editor = 'EDITOR',
  Owner = 'OWNER',
  Viewer = 'VIEWER'
}

export type PrepareAccessmodFileDownloadInput = {
  fileId: Scalars['String'];
};

export type PrepareAccessmodFileDownloadResult = {
  __typename?: 'PrepareAccessmodFileDownloadResult';
  downloadUrl?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
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
  accessmodAnalyses: AccessmodAnalysisPage;
  accessmodAnalysis?: Maybe<AccessmodAnalysis>;
  accessmodFileset?: Maybe<AccessmodFileset>;
  accessmodFilesetRole?: Maybe<AccessmodFilesetRole>;
  accessmodFilesetRoles: Array<AccessmodFilesetRole>;
  accessmodFilesets: AccessmodFilesetPage;
  accessmodProject?: Maybe<AccessmodProject>;
  accessmodProjects: AccessmodProjectPage;
  countries: Array<Country>;
  me: Me;
  organizations: Array<Organization>;
  team?: Maybe<Team>;
  teams: TeamPage;
};


export type QueryAccessmodAnalysesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['String'];
};


export type QueryAccessmodAnalysisArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryAccessmodFilesetArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryAccessmodFilesetRoleArgs = {
  id: Scalars['String'];
};


export type QueryAccessmodFilesetsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['String'];
  roleId?: InputMaybe<Scalars['String']>;
  term?: InputMaybe<Scalars['String']>;
};


export type QueryAccessmodProjectArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryAccessmodProjectsArgs = {
  countries?: InputMaybe<Array<Scalars['String']>>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  teams?: InputMaybe<Array<Scalars['String']>>;
  term?: InputMaybe<Scalars['String']>;
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};


export type QueryTeamsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  term?: InputMaybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  email: Scalars['String'];
};

export type ResetPasswordResult = {
  __typename?: 'ResetPasswordResult';
  success: Scalars['Boolean'];
};

export enum SetPasswordError {
  InvalidPassword = 'INVALID_PASSWORD',
  InvalidToken = 'INVALID_TOKEN',
  PasswordMismatch = 'PASSWORD_MISMATCH',
  UserNotFound = 'USER_NOT_FOUND'
}

export type SetPasswordInput = {
  password1: Scalars['String'];
  password2: Scalars['String'];
  token: Scalars['String'];
  uidb64: Scalars['String'];
};

export type SetPasswordResult = {
  __typename?: 'SetPasswordResult';
  error?: Maybe<SetPasswordError>;
  success: Scalars['Boolean'];
};

export type Team = {
  __typename?: 'Team';
  authorizedActions: Array<TeamAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  memberships: MembershipPage;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type TeamMembershipsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export enum TeamAuthorizedActions {
  CreateMembership = 'CREATE_MEMBERSHIP',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type TeamPage = {
  __typename?: 'TeamPage';
  items: Array<Team>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum UpdateAccessmodAccessibilityAnalysisError {
  NameDuplicate = 'NAME_DUPLICATE',
  NotFound = 'NOT_FOUND'
}

export type UpdateAccessmodAccessibilityAnalysisInput = {
  algorithm?: InputMaybe<AccessmodAccessibilityAnalysisAlgorithm>;
  barrierId?: InputMaybe<Scalars['String']>;
  demId?: InputMaybe<Scalars['String']>;
  healthFacilitiesId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  invertDirection?: InputMaybe<Scalars['Boolean']>;
  knightMove?: InputMaybe<Scalars['Boolean']>;
  landCoverId?: InputMaybe<Scalars['String']>;
  maxSlope?: InputMaybe<Scalars['Float']>;
  maxTravelTime?: InputMaybe<Scalars['Int']>;
  movingSpeedsId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  priorityLandCover?: InputMaybe<Array<Scalars['Int']>>;
  priorityRoads?: InputMaybe<Scalars['Boolean']>;
  slopeId?: InputMaybe<Scalars['String']>;
  transportNetworkId?: InputMaybe<Scalars['String']>;
  waterAllTouched?: InputMaybe<Scalars['Boolean']>;
  waterId?: InputMaybe<Scalars['String']>;
};

export type UpdateAccessmodAccessibilityAnalysisResult = {
  __typename?: 'UpdateAccessmodAccessibilityAnalysisResult';
  analysis?: Maybe<AccessmodAccessibilityAnalysis>;
  errors: Array<UpdateAccessmodAccessibilityAnalysisError>;
  success: Scalars['Boolean'];
};

export enum UpdateAccessmodProjectError {
  NameDuplicate = 'NAME_DUPLICATE',
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type UpdateAccessmodProjectInput = {
  country?: InputMaybe<CountryInput>;
  crs?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  extentId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  spatialResolution?: InputMaybe<Scalars['Int']>;
};

export enum UpdateAccessmodProjectPermissionError {
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type UpdateAccessmodProjectPermissionInput = {
  id: Scalars['String'];
  mode: PermissionMode;
};

export type UpdateAccessmodProjectPermissionResult = {
  __typename?: 'UpdateAccessmodProjectPermissionResult';
  errors: Array<UpdateAccessmodProjectPermissionError>;
  permission?: Maybe<AccessmodProjectPermission>;
  success: Scalars['Boolean'];
};

export type UpdateAccessmodProjectResult = {
  __typename?: 'UpdateAccessmodProjectResult';
  errors: Array<UpdateAccessmodProjectError>;
  project?: Maybe<AccessmodProject>;
  success: Scalars['Boolean'];
};

export enum UpdateMembershipError {
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type UpdateMembershipInput = {
  id: Scalars['String'];
  role: MembershipRole;
};

export type UpdateMembershipResult = {
  __typename?: 'UpdateMembershipResult';
  errors: Array<UpdateMembershipError>;
  membership?: Maybe<Membership>;
  success: Scalars['Boolean'];
};

export enum UpdateTeamError {
  NameDuplicate = 'NAME_DUPLICATE',
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type UpdateTeamInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateTeamResult = {
  __typename?: 'UpdateTeamResult';
  errors: Array<UpdateTeamError>;
  success: Scalars['Boolean'];
  team?: Maybe<Team>;
};

export type User = {
  __typename?: 'User';
  avatar: Avatar;
  dateJoined: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
};

export type HeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type HeaderQuery = { __typename?: 'Query', me: { __typename?: 'Me', authorizedActions: Array<MeAuthorizedActions> }, teams: { __typename?: 'TeamPage', items: Array<{ __typename?: 'Team', id: string, name: string }> }, projects: { __typename?: 'AccessmodProjectPage', items: Array<{ __typename?: 'AccessmodProject', id: string, name: string }> } };

export type Navbar_NavbarFragment = { __typename?: 'Query', teams: { __typename?: 'TeamPage', items: Array<{ __typename?: 'Team', id: string, name: string }> }, projects: { __typename?: 'AccessmodProjectPage', items: Array<{ __typename?: 'AccessmodProject', id: string, name: string }> } };

export type UserMenu_UserFragment = { __typename?: 'User', avatar: { __typename?: 'Avatar', initials: string, color: string } };

export type CreateAccessibilityAnalysisMutationVariables = Exact<{
  input?: InputMaybe<CreateAccessmodAccessibilityAnalysisInput>;
}>;


export type CreateAccessibilityAnalysisMutation = { __typename?: 'Mutation', response: { __typename?: 'CreateAccessmodAccessibilityAnalysisResult', success: boolean, errors: Array<CreateAccessmodAccessibilityAnalysisError>, analysis?: { __typename?: 'AccessmodAccessibilityAnalysis', id: string } | null } };

export type CreateAnalysisDialog_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type CreateAnalysisTrigger_ProjectFragment = { __typename?: 'AccessmodProject', authorizedActions: Array<AccessmodProjectAuthorizedActions>, id: string };

export type FilesetRolePickerQueryVariables = Exact<{ [key: string]: never; }>;


export type FilesetRolePickerQuery = { __typename?: 'Query', accessmodFilesetRoles: Array<{ __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, createdAt: any, updatedAt: any }> };

export type CreateMembershipMutationVariables = Exact<{
  input: CreateMembershipInput;
}>;


export type CreateMembershipMutation = { __typename?: 'Mutation', createMembership: { __typename?: 'CreateMembershipResult', success: boolean, errors: Array<CreateMembershipError> } };

export type InviteTeamMemberDialog_TeamFragment = { __typename?: 'Team', id: string, name: string };

export type InviteTeamMemberTrigger_TeamFragment = { __typename?: 'Team', authorizedActions: Array<TeamAuthorizedActions>, id: string, name: string };

export type UpdateMembershipMutationVariables = Exact<{
  input: UpdateMembershipInput;
}>;


export type UpdateMembershipMutation = { __typename?: 'Mutation', updateMembership: { __typename?: 'UpdateMembershipResult', success: boolean, errors: Array<UpdateMembershipError>, membership?: { __typename?: 'Membership', id: string, role: MembershipRole } | null } };

export type TeamMembersTable_TeamFragment = { __typename?: 'Team', id: string };

export type TeamMembersTableQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type TeamMembersTableQuery = { __typename?: 'Query', team?: { __typename?: 'Team', memberships: { __typename?: 'MembershipPage', totalItems: number, totalPages: number, pageNumber: number, items: Array<{ __typename?: 'Membership', id: string, authorizedActions: Array<MembershipAuthorizedActions>, createdAt: any, updatedAt: any, role: MembershipRole, user: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } }, team: { __typename?: 'Team', id: string, name: string } }> } } | null };

export type User_UserFragment = { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } };

export type AccessibilityAnalysisForm_ProjectFragment = { __typename?: 'AccessmodProject', id: string, authorizedActions: Array<AccessmodProjectAuthorizedActions>, name: string };

export type AccessibilityAnalysisForm_AnalysisFragment = { __typename: 'AccessmodAccessibilityAnalysis', id: string, name: string, type: AccessmodAnalysisType, maxSlope?: number | null, priorityRoads?: boolean | null, priorityLandCover?: Array<number> | null, waterAllTouched?: boolean | null, knightMove?: boolean | null, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, invertDirection?: boolean | null, maxTravelTime?: number | null, status: AccessmodAnalysisStatus, movingSpeeds?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, slope?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null };

export type UpdateAccessibilityAnalysisMutationVariables = Exact<{
  input?: InputMaybe<UpdateAccessmodAccessibilityAnalysisInput>;
}>;


export type UpdateAccessibilityAnalysisMutation = { __typename?: 'Mutation', updateAccessmodAccessibilityAnalysis: { __typename?: 'UpdateAccessmodAccessibilityAnalysisResult', success: boolean, errors: Array<UpdateAccessmodAccessibilityAnalysisError>, analysis?: { __typename: 'AccessmodAccessibilityAnalysis', id: string, name: string, type: AccessmodAnalysisType, maxSlope?: number | null, priorityRoads?: boolean | null, priorityLandCover?: Array<number> | null, waterAllTouched?: boolean | null, knightMove?: boolean | null, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, invertDirection?: boolean | null, maxTravelTime?: number | null, status: AccessmodAnalysisStatus, movingSpeeds?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, slope?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null } | null } };

export type AccessibilityAnalysisOutput_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

type AccessibilityAnalysisOutput_Analysis_AccessmodAccessibilityAnalysis_Fragment = { __typename: 'AccessmodAccessibilityAnalysis', id: string, status: AccessmodAnalysisStatus, travelTimes?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, frictionSurface?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, catchmentAreas?: { __typename?: 'AccessmodFileset', name: string, id: string } | null };

type AccessibilityAnalysisOutput_Analysis_AccessmodGeographicCoverageAnalysis_Fragment = { __typename: 'AccessmodGeographicCoverageAnalysis', id: string, status: AccessmodAnalysisStatus };

export type AccessibilityAnalysisOutput_AnalysisFragment = AccessibilityAnalysisOutput_Analysis_AccessmodAccessibilityAnalysis_Fragment | AccessibilityAnalysisOutput_Analysis_AccessmodGeographicCoverageAnalysis_Fragment;

export type AnalysisActionsButton_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string };

type AnalysisActionsButton_Analysis_AccessmodAccessibilityAnalysis_Fragment = { __typename?: 'AccessmodAccessibilityAnalysis', id: string, name: string, status: AccessmodAnalysisStatus, type: AccessmodAnalysisType, authorizedActions: Array<AccessmodAnalysisAuthorizedActions> };

type AnalysisActionsButton_Analysis_AccessmodGeographicCoverageAnalysis_Fragment = { __typename?: 'AccessmodGeographicCoverageAnalysis', id: string, name: string, status: AccessmodAnalysisStatus, type: AccessmodAnalysisType, authorizedActions: Array<AccessmodAnalysisAuthorizedActions> };

export type AnalysisActionsButton_AnalysisFragment = AnalysisActionsButton_Analysis_AccessmodAccessibilityAnalysis_Fragment | AnalysisActionsButton_Analysis_AccessmodGeographicCoverageAnalysis_Fragment;

export type AnalysisForm_ProjectFragment = { __typename?: 'AccessmodProject', id: string, authorizedActions: Array<AccessmodProjectAuthorizedActions>, name: string };

type AnalysisForm_Analysis_AccessmodAccessibilityAnalysis_Fragment = { __typename: 'AccessmodAccessibilityAnalysis', id: string, name: string, type: AccessmodAnalysisType, maxSlope?: number | null, priorityRoads?: boolean | null, priorityLandCover?: Array<number> | null, waterAllTouched?: boolean | null, knightMove?: boolean | null, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, invertDirection?: boolean | null, maxTravelTime?: number | null, status: AccessmodAnalysisStatus, movingSpeeds?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, slope?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null };

type AnalysisForm_Analysis_AccessmodGeographicCoverageAnalysis_Fragment = { __typename?: 'AccessmodGeographicCoverageAnalysis' };

export type AnalysisForm_AnalysisFragment = AnalysisForm_Analysis_AccessmodAccessibilityAnalysis_Fragment | AnalysisForm_Analysis_AccessmodGeographicCoverageAnalysis_Fragment;

type AnalysisStatus_Analysis_AccessmodAccessibilityAnalysis_Fragment = { __typename: 'AccessmodAccessibilityAnalysis', status: AccessmodAnalysisStatus };

type AnalysisStatus_Analysis_AccessmodGeographicCoverageAnalysis_Fragment = { __typename: 'AccessmodGeographicCoverageAnalysis', status: AccessmodAnalysisStatus };

export type AnalysisStatus_AnalysisFragment = AnalysisStatus_Analysis_AccessmodAccessibilityAnalysis_Fragment | AnalysisStatus_Analysis_AccessmodGeographicCoverageAnalysis_Fragment;

export type CreateDatasetTrigger_ProjectFragment = { __typename?: 'AccessmodProject', authorizedActions: Array<AccessmodProjectAuthorizedActions>, id: string, name: string };

export type CreateFilesetMutationVariables = Exact<{
  input?: InputMaybe<CreateAccessmodFilesetInput>;
}>;


export type CreateFilesetMutation = { __typename?: 'Mutation', createAccessmodFileset: { __typename?: 'CreateAccessmodFilesetResult', success: boolean, errors: Array<CreateAccessmodFilesetError>, fileset?: { __typename?: 'AccessmodFileset', id: string, name: string, role: { __typename?: 'AccessmodFilesetRole', id: string, code: AccessmodFilesetRoleCode, name: string } } | null } };

export type DatasetFormDialog_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string };

export type DatasetFormDialog_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, name: string };

export type DatasetPicker_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } };

export type DatasetPicker_ProjectFragment = { __typename?: 'AccessmodProject', id: string, authorizedActions: Array<AccessmodProjectAuthorizedActions>, name: string };

export type DatasetPickerQueryVariables = Exact<{
  projectId: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  roleId?: InputMaybe<Scalars['String']>;
  term?: InputMaybe<Scalars['String']>;
}>;


export type DatasetPickerQuery = { __typename?: 'Query', filesets: { __typename?: 'AccessmodFilesetPage', totalItems: number, items: Array<{ __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } }> } };

export type PollDatasetStatusQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PollDatasetStatusQuery = { __typename?: 'Query', dataset?: { __typename?: 'AccessmodFileset', id: string, status: AccessmodFilesetStatus, metadata: any } | null };

export type DatasetStatusBadge_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, status: AccessmodFilesetStatus };

export type DatasetViewer_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type DatasetViewer_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, role: { __typename?: 'AccessmodFilesetRole', id: string, code: AccessmodFilesetRoleCode, name: string, format: AccessmodFilesetFormat }, files: Array<{ __typename?: 'AccessmodFile', name: string, mimeType: string, id: string }> };

export type DeleteDatasetMutationVariables = Exact<{
  input: DeleteAccessmodFilesetInput;
}>;


export type DeleteDatasetMutation = { __typename?: 'Mutation', deleteAccessmodFileset: { __typename?: 'DeleteAccessmodFilesetResult', success: boolean } };

export type DeleteDatasetTrigger_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string };

export type DeleteDatasetTrigger_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, authorizedActions: Array<AccessmodFilesetAuthorizedActions> };

export type DownloadDatasetButton_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, name: string, files: Array<{ __typename?: 'AccessmodFile', id: string, name: string, mimeType: string }> };

export type PreviewDatasetDialogQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PreviewDatasetDialogQuery = { __typename?: 'Query', dataset?: { __typename?: 'AccessmodFileset', id: string, name: string, role: { __typename?: 'AccessmodFilesetRole', id: string, code: AccessmodFilesetRoleCode, name: string, format: AccessmodFilesetFormat }, files: Array<{ __typename?: 'AccessmodFile', id: string, name: string, mimeType: string }> } | null };

export type PreviewDatasetDialog_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type PreviewDatasetDialog_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, name: string };

export type RasterDatasetMap_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, role: { __typename?: 'AccessmodFilesetRole', code: AccessmodFilesetRoleCode, format: AccessmodFilesetFormat }, files: Array<{ __typename?: 'AccessmodFile', id: string, name: string, mimeType: string }> };

export type TabularDatasetTable_DatasetFragment = { __typename?: 'AccessmodFileset', role: { __typename?: 'AccessmodFilesetRole', format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode }, files: Array<{ __typename?: 'AccessmodFile', name: string, mimeType: string, id: string }> };

export type VectorDatasetMap_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, role: { __typename?: 'AccessmodFilesetRole', code: AccessmodFilesetRoleCode, format: AccessmodFilesetFormat }, files: Array<{ __typename?: 'AccessmodFile', id: string, name: string, mimeType: string }> };

export type CreateProjectMembershipMutationVariables = Exact<{
  input: CreateAccessmodProjectPermissionInput;
}>;


export type CreateProjectMembershipMutation = { __typename?: 'Mutation', createAccessmodProjectPermission: { __typename?: 'CreateAccessmodProjectPermissionResult', success: boolean, errors: Array<CreateAccessmodProjectPermissionError>, permission?: { __typename?: 'AccessmodProjectPermission', id: string } | null } };

export type CreateMembershipForm_ProjectFragment = { __typename?: 'AccessmodProject', id: string, permissions: Array<{ __typename?: 'AccessmodProjectPermission', mode: PermissionMode, id: string, team?: { __typename: 'Team', id: string } | null }> };

export type CreateProjectMutationVariables = Exact<{
  input?: InputMaybe<CreateAccessmodProjectInput>;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createAccessmodProject: { __typename?: 'CreateAccessmodProjectResult', success: boolean, errors: Array<CreateAccessmodProjectError>, project?: { __typename?: 'AccessmodProject', id: string } | null } };

export type DeleteProjectPermissionMutationVariables = Exact<{
  input: DeleteAccessmodProjectPermissionInput;
}>;


export type DeleteProjectPermissionMutation = { __typename?: 'Mutation', deleteAccessmodProjectPermission: { __typename?: 'DeleteAccessmodProjectPermissionResult', success: boolean } };

export type DeleteProjectPermissionTrigger_PermissionFragment = { __typename?: 'AccessmodProjectPermission', id: string, authorizedActions: Array<AccessmodProjectPermissionAuthorizedActions> };

export type DeleteProjectMutationVariables = Exact<{
  input?: InputMaybe<DeleteAccessmodProjectInput>;
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteAccessmodProject: { __typename?: 'DeleteAccessmodProjectResult', success: boolean } };

export type DeleteProjectTrigger_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, authorizedActions: Array<AccessmodProjectAuthorizedActions> };

export type EditProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type EditProjectQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string, crs: number, description: string, spatialResolution: number } | null };

export type UpdateProjectMutationVariables = Exact<{
  input?: InputMaybe<UpdateAccessmodProjectInput>;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateAccessmodProject: { __typename?: 'UpdateAccessmodProjectResult', success: boolean, errors: Array<UpdateAccessmodProjectError>, project?: { __typename?: 'AccessmodProject', id: string, name: string, description: string, crs: number, spatialResolution: number } | null } };

export type EditProjectFormBlock_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type ProjectActionsMenu_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, authorizedActions: Array<AccessmodProjectAuthorizedActions> };

export type DeleteAnalysisMutationVariables = Exact<{
  input?: InputMaybe<DeleteAccessmodAnalysisInput>;
}>;


export type DeleteAnalysisMutation = { __typename?: 'Mutation', deleteAccessmodAnalysis: { __typename?: 'DeleteAccessmodAnalysisResult', success: boolean } };

export type ProjectAnalysesTable_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type ProjectAnalysesTableQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['String'];
}>;


export type ProjectAnalysesTableQuery = { __typename?: 'Query', analyses: { __typename?: 'AccessmodAnalysisPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename: 'AccessmodAccessibilityAnalysis', id: string, type: AccessmodAnalysisType, name: string, createdAt: any, status: AccessmodAnalysisStatus } | { __typename: 'AccessmodGeographicCoverageAnalysis', id: string, type: AccessmodAnalysisType, name: string, createdAt: any, status: AccessmodAnalysisStatus }> } };

export type ProjectCard_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, spatialResolution: number, description: string, updatedAt: any, permissions: Array<{ __typename?: 'AccessmodProjectPermission', mode: PermissionMode, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, team?: { __typename?: 'Team', name: string } | null }>, country: { __typename?: 'Country', name: string, flag: string, code: string } };

export type ProjectDatasetsTableQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['String'];
  term?: InputMaybe<Scalars['String']>;
}>;


export type ProjectDatasetsTableQuery = { __typename?: 'Query', accessmodFilesets: { __typename?: 'AccessmodFilesetPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename?: 'AccessmodFileset', id: string, name: string, status: AccessmodFilesetStatus, createdAt: any, authorizedActions: Array<AccessmodFilesetAuthorizedActions>, role: { __typename?: 'AccessmodFilesetRole', name: string, id: string, format: AccessmodFilesetFormat }, author: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } }> } };

export type ProjectDatasetsTable_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, author: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } };

export type ProjectPermissionPicker_ProjectFragment = { __typename?: 'AccessmodProject', permissions: Array<{ __typename?: 'AccessmodProjectPermission', mode: PermissionMode, id: string }> };

export type ProjectPermissionPicker_PermissionFragment = { __typename?: 'AccessmodProjectPermission', id: string, mode: PermissionMode };

export type ProjectPickerQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectPickerQuery = { __typename?: 'Query', accessmodProjects: { __typename?: 'AccessmodProjectPage', items: Array<{ __typename?: 'AccessmodProject', id: string, name: string, createdAt: any, updatedAt: any, country: { __typename?: 'Country', flag: string, name: string, code: string } }> } };

export type ProjectsList_ProjectsFragment = { __typename?: 'AccessmodProjectPage', pageNumber: number, totalPages: number, items: Array<{ __typename?: 'AccessmodProject', id: string, name: string, spatialResolution: number, description: string, updatedAt: any, permissions: Array<{ __typename?: 'AccessmodProjectPermission', mode: PermissionMode, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, team?: { __typename?: 'Team', name: string } | null }>, country: { __typename?: 'Country', name: string, flag: string, code: string } }> };

export type DeleteMembershipMutationVariables = Exact<{
  input: DeleteMembershipInput;
}>;


export type DeleteMembershipMutation = { __typename?: 'Mutation', deleteMembership: { __typename?: 'DeleteMembershipResult', success: boolean, errors: Array<DeleteMembershipError> } };

export type DeleteMembershipTrigger_MembershipFragment = { __typename?: 'Membership', id: string, authorizedActions: Array<MembershipAuthorizedActions>, user: { __typename?: 'User', firstName?: string | null, lastName?: string | null }, team: { __typename?: 'Team', id: string, name: string } };

export type DeleteTeamMutationVariables = Exact<{
  input: DeleteTeamInput;
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: { __typename?: 'DeleteTeamResult', success: boolean, errors: Array<DeleteTeamError> } };

export type DeleteTeamTrigger_TeamFragment = { __typename?: 'Team', id: string, name: string, authorizedActions: Array<TeamAuthorizedActions> };

export type EditTeamTrigger_TeamFragment = { __typename?: 'Team', authorizedActions: Array<TeamAuthorizedActions>, id: string, name: string };

export type TeamActionsMenu_TeamFragment = { __typename?: 'Team', id: string, name: string, authorizedActions: Array<TeamAuthorizedActions> };

export type CreateTeamMutationVariables = Exact<{
  input: CreateTeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', result: { __typename?: 'CreateTeamResult', success: boolean, errors: Array<CreateTeamError>, team?: { __typename?: 'Team', id: string } | null } };

export type UpdateTeamMutationVariables = Exact<{
  input: UpdateTeamInput;
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', result: { __typename?: 'UpdateTeamResult', success: boolean, errors: Array<UpdateTeamError>, team?: { __typename?: 'Team', id: string, name: string } | null } };

export type TeamFormDialog_TeamFragment = { __typename?: 'Team', id: string, name: string };

export type TeamPickerQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  term?: InputMaybe<Scalars['String']>;
}>;


export type TeamPickerQuery = { __typename?: 'Query', teams: { __typename?: 'TeamPage', totalItems: number, items: Array<{ __typename?: 'Team', id: string, name: string }> } };

export type TeamProjectsTable_TeamFragment = { __typename?: 'Team', id: string };

export type TeamProjectsTableQueryVariables = Exact<{
  page?: Scalars['Int'];
  perPage?: InputMaybe<Scalars['Int']>;
  teamIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type TeamProjectsTableQuery = { __typename?: 'Query', projects: { __typename?: 'AccessmodProjectPage', totalPages: number, totalItems: number, items: Array<{ __typename?: 'AccessmodProject', id: string, name: string, createdAt: any, author: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } }> } };

export type LaunchAccessmodAnalysisMutationVariables = Exact<{
  input?: InputMaybe<LaunchAccessmodAnalysisInput>;
}>;


export type LaunchAccessmodAnalysisMutation = { __typename?: 'Mutation', launchAccessmodAnalysis: { __typename?: 'LaunchAccessmodAnalysisResult', success: boolean, errors: Array<LaunchAccessmodAnalysisError>, analysis?: { __typename?: 'AccessmodAccessibilityAnalysis', status: AccessmodAnalysisStatus, updatedAt: any } | { __typename?: 'AccessmodGeographicCoverageAnalysis', status: AccessmodAnalysisStatus, updatedAt: any } | null } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me: { __typename?: 'Me', user?: { __typename?: 'User', email: string, id: string, firstName?: string | null, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResult', success: boolean } };

export type GetUploadUrlMutationVariables = Exact<{
  input?: InputMaybe<PrepareAccessmodFileUploadInput>;
}>;


export type GetUploadUrlMutation = { __typename?: 'Mutation', prepareAccessmodFileUpload: { __typename?: 'PrepareAccessmodFileUploadResult', success: boolean, uploadUrl?: string | null, fileUri?: string | null } };

export type CreateFileMutationVariables = Exact<{
  input?: InputMaybe<CreateAccessmodFileInput>;
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: { __typename?: 'CreateAccessmodFileResult', success: boolean } };

export type GetFilesetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilesetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode, createdAt: any, updatedAt: any }> };

export type GetFileDownloadUrlMutationVariables = Exact<{
  input?: InputMaybe<PrepareAccessmodFileDownloadInput>;
}>;


export type GetFileDownloadUrlMutation = { __typename?: 'Mutation', prepareAccessmodFileDownload: { __typename?: 'PrepareAccessmodFileDownloadResult', success: boolean, downloadUrl?: string | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', success: boolean } };

export type AnalysisEditPageQueryVariables = Exact<{
  id: Scalars['String'];
  analysisId: Scalars['String'];
}>;


export type AnalysisEditPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string, authorizedActions: Array<AccessmodProjectAuthorizedActions> } | null, analysis?: { __typename: 'AccessmodAccessibilityAnalysis', id: string, type: AccessmodAnalysisType, name: string, status: AccessmodAnalysisStatus, authorizedActions: Array<AccessmodAnalysisAuthorizedActions>, maxSlope?: number | null, priorityRoads?: boolean | null, priorityLandCover?: Array<number> | null, waterAllTouched?: boolean | null, knightMove?: boolean | null, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, invertDirection?: boolean | null, maxTravelTime?: number | null, movingSpeeds?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, slope?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat } } | null } | { __typename: 'AccessmodGeographicCoverageAnalysis', id: string, type: AccessmodAnalysisType, name: string, status: AccessmodAnalysisStatus, authorizedActions: Array<AccessmodAnalysisAuthorizedActions> } | null };

export type AnalysisDetailPageQueryVariables = Exact<{
  id: Scalars['String'];
  analysisId: Scalars['String'];
}>;


export type AnalysisDetailPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string } | null, analysis?: { __typename: 'AccessmodAccessibilityAnalysis', id: string, name: string, type: AccessmodAnalysisType, createdAt: any, updatedAt: any, status: AccessmodAnalysisStatus, authorizedActions: Array<AccessmodAnalysisAuthorizedActions>, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, slope?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, movingSpeeds?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, author: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } }, travelTimes?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, frictionSurface?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, catchmentAreas?: { __typename?: 'AccessmodFileset', name: string, id: string } | null } | { __typename: 'AccessmodGeographicCoverageAnalysis', id: string, name: string, type: AccessmodAnalysisType, createdAt: any, updatedAt: any, status: AccessmodAnalysisStatus, authorizedActions: Array<AccessmodAnalysisAuthorizedActions>, author: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } } | null };

export type ProjectAnalysesPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectAnalysesPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string, authorizedActions: Array<AccessmodProjectAuthorizedActions> } | null };

export type DatasetDetailPageQueryVariables = Exact<{
  id: Scalars['String'];
  datasetId: Scalars['String'];
}>;


export type DatasetDetailPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string } | null, dataset?: { __typename: 'AccessmodFileset', id: string, name: string, createdAt: any, updatedAt: any, authorizedActions: Array<AccessmodFilesetAuthorizedActions>, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, code: AccessmodFilesetRoleCode, format: AccessmodFilesetFormat }, files: Array<{ __typename?: 'AccessmodFile', name: string, mimeType: string, createdAt: any, uri: string, id: string }>, author: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } } | null };

export type ProjectDataPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectDataPageQuery = { __typename?: 'Query', accessmodProject?: { __typename?: 'AccessmodProject', id: string, name: string, authorizedActions: Array<AccessmodProjectAuthorizedActions>, author: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } } | null };

export type UpdateProjectPermissionMutationVariables = Exact<{
  input: UpdateAccessmodProjectPermissionInput;
}>;


export type UpdateProjectPermissionMutation = { __typename?: 'Mutation', updateAccessmodProjectPermission: { __typename?: 'UpdateAccessmodProjectPermissionResult', success: boolean, errors: Array<UpdateAccessmodProjectPermissionError>, permission?: { __typename?: 'AccessmodProjectPermission', id: string, mode: PermissionMode } | null } };

export type ProjectPage_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, crs: number, description: string, authorizedActions: Array<AccessmodProjectAuthorizedActions>, createdAt: any, updatedAt: any, spatialResolution: number, permissions: Array<{ __typename?: 'AccessmodProjectPermission', id: string, authorizedActions: Array<AccessmodProjectPermissionAuthorizedActions>, mode: PermissionMode, createdAt: any, updatedAt: any, team?: { __typename: 'Team', id: string, name: string } | null, user?: { __typename: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null }>, country: { __typename?: 'Country', name: string, code: string, flag: string }, author: { __typename?: 'User', email: string, firstName?: string | null, lastName?: string | null, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } };

export type ProjectPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string, crs: number, description: string, authorizedActions: Array<AccessmodProjectAuthorizedActions>, createdAt: any, updatedAt: any, spatialResolution: number, permissions: Array<{ __typename?: 'AccessmodProjectPermission', id: string, authorizedActions: Array<AccessmodProjectPermissionAuthorizedActions>, mode: PermissionMode, createdAt: any, updatedAt: any, team?: { __typename: 'Team', id: string, name: string } | null, user?: { __typename: 'User', firstName?: string | null, lastName?: string | null, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null }>, country: { __typename?: 'Country', name: string, code: string, flag: string }, author: { __typename?: 'User', email: string, firstName?: string | null, lastName?: string | null, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } } | null };

export type ProjectsPageQueryVariables = Exact<{
  term?: InputMaybe<Scalars['String']>;
  countries?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  teams?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type ProjectsPageQuery = { __typename?: 'Query', accessmodProjects: { __typename?: 'AccessmodProjectPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename: 'AccessmodProject', id: string, name: string, spatialResolution: number, description: string, updatedAt: any, permissions: Array<{ __typename?: 'AccessmodProjectPermission', mode: PermissionMode, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, team?: { __typename?: 'Team', name: string } | null }>, country: { __typename?: 'Country', name: string, flag: string, code: string } }> } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResetPasswordResult', success: boolean } };

export type SettingsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsPageQuery = { __typename?: 'Query', me: { __typename?: 'Me', user?: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null } | null } };

export type TeamPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TeamPageQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, createdAt: any, authorizedActions: Array<TeamAuthorizedActions> } | null };

export type TeamsPageQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type TeamsPageQuery = { __typename?: 'Query', me: { __typename?: 'Me', authorizedActions: Array<MeAuthorizedActions> }, teams: { __typename?: 'TeamPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename: 'Team', name: string, id: string, memberships: { __typename?: 'MembershipPage', totalItems: number, items: Array<{ __typename?: 'Membership', user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } }> } }> } };

export const Navbar_NavbarFragmentDoc = gql`
    fragment Navbar_navbar on Query {
  teams(page: 1, perPage: 5) {
    items {
      id
      name
    }
  }
  projects: accessmodProjects(page: 1, perPage: 5) {
    items {
      id
      name
    }
  }
}
    `;
export const UserMenu_UserFragmentDoc = gql`
    fragment UserMenu_user on User {
  avatar {
    initials
    color
  }
}
    `;
export const InviteTeamMemberDialog_TeamFragmentDoc = gql`
    fragment InviteTeamMemberDialog_team on Team {
  id
  name
}
    `;
export const InviteTeamMemberTrigger_TeamFragmentDoc = gql`
    fragment InviteTeamMemberTrigger_team on Team {
  ...InviteTeamMemberDialog_team
  authorizedActions
}
    ${InviteTeamMemberDialog_TeamFragmentDoc}`;
export const TeamMembersTable_TeamFragmentDoc = gql`
    fragment TeamMembersTable_team on Team {
  id
}
    `;
export const AccessibilityAnalysisOutput_ProjectFragmentDoc = gql`
    fragment AccessibilityAnalysisOutput_project on AccessmodProject {
  id
}
    `;
export const AccessibilityAnalysisOutput_AnalysisFragmentDoc = gql`
    fragment AccessibilityAnalysisOutput_analysis on AccessmodAnalysis {
  __typename
  id
  status
  ... on AccessmodAccessibilityAnalysis {
    travelTimes {
      name
      id
    }
    frictionSurface {
      name
      id
    }
    catchmentAreas {
      name
      id
    }
  }
}
    `;
export const AnalysisActionsButton_ProjectFragmentDoc = gql`
    fragment AnalysisActionsButton_project on AccessmodProject {
  id
  name
}
    `;
export const AnalysisActionsButton_AnalysisFragmentDoc = gql`
    fragment AnalysisActionsButton_analysis on AccessmodAnalysis {
  id
  name
  status
  type
  authorizedActions
}
    `;
export const DatasetFormDialog_ProjectFragmentDoc = gql`
    fragment DatasetFormDialog_project on AccessmodProject {
  id
  name
}
    `;
export const DatasetPicker_ProjectFragmentDoc = gql`
    fragment DatasetPicker_project on AccessmodProject {
  id
  authorizedActions
  ...DatasetFormDialog_project
}
    ${DatasetFormDialog_ProjectFragmentDoc}`;
export const AccessibilityAnalysisForm_ProjectFragmentDoc = gql`
    fragment AccessibilityAnalysisForm_project on AccessmodProject {
  id
  ...DatasetPicker_project
}
    ${DatasetPicker_ProjectFragmentDoc}`;
export const AnalysisForm_ProjectFragmentDoc = gql`
    fragment AnalysisForm_project on AccessmodProject {
  ...AccessibilityAnalysisForm_project
}
    ${AccessibilityAnalysisForm_ProjectFragmentDoc}`;
export const DatasetPicker_DatasetFragmentDoc = gql`
    fragment DatasetPicker_dataset on AccessmodFileset {
  id
  name
  role {
    id
    name
    format
  }
  createdAt
  updatedAt
  status
}
    `;
export const AccessibilityAnalysisForm_AnalysisFragmentDoc = gql`
    fragment AccessibilityAnalysisForm_analysis on AccessmodAccessibilityAnalysis {
  __typename
  id
  name
  movingSpeeds {
    ...DatasetPicker_dataset
  }
  healthFacilities {
    ...DatasetPicker_dataset
  }
  type
  maxSlope
  priorityRoads
  priorityLandCover
  waterAllTouched
  knightMove
  algorithm
  invertDirection
  maxTravelTime
  status
  landCover {
    ...DatasetPicker_dataset
  }
  dem {
    ...DatasetPicker_dataset
  }
  barrier {
    ...DatasetPicker_dataset
  }
  water {
    ...DatasetPicker_dataset
  }
  slope {
    ...DatasetPicker_dataset
  }
  transportNetwork {
    ...DatasetPicker_dataset
  }
}
    ${DatasetPicker_DatasetFragmentDoc}`;
export const AnalysisForm_AnalysisFragmentDoc = gql`
    fragment AnalysisForm_analysis on AccessmodAnalysis {
  ...AccessibilityAnalysisForm_analysis
}
    ${AccessibilityAnalysisForm_AnalysisFragmentDoc}`;
export const AnalysisStatus_AnalysisFragmentDoc = gql`
    fragment AnalysisStatus_analysis on AccessmodAnalysis {
  __typename
  status
}
    `;
export const DatasetFormDialog_DatasetFragmentDoc = gql`
    fragment DatasetFormDialog_dataset on AccessmodFileset {
  id
  name
}
    `;
export const DatasetStatusBadge_DatasetFragmentDoc = gql`
    fragment DatasetStatusBadge_dataset on AccessmodFileset {
  id
  status
}
    `;
export const TabularDatasetTable_DatasetFragmentDoc = gql`
    fragment TabularDatasetTable_dataset on AccessmodFileset {
  role {
    format
    code
  }
  files {
    name
    mimeType
    id
  }
}
    `;
export const VectorDatasetMap_DatasetFragmentDoc = gql`
    fragment VectorDatasetMap_dataset on AccessmodFileset {
  id
  role {
    code
    format
  }
  files {
    id
    name
    mimeType
  }
}
    `;
export const RasterDatasetMap_DatasetFragmentDoc = gql`
    fragment RasterDatasetMap_dataset on AccessmodFileset {
  id
  role {
    code
    format
  }
  files {
    id
    name
    mimeType
  }
}
    `;
export const DatasetViewer_DatasetFragmentDoc = gql`
    fragment DatasetViewer_dataset on AccessmodFileset {
  id
  role {
    id
    code
    name
    format
  }
  ...TabularDatasetTable_dataset
  ...VectorDatasetMap_dataset
  ...RasterDatasetMap_dataset
}
    ${TabularDatasetTable_DatasetFragmentDoc}
${VectorDatasetMap_DatasetFragmentDoc}
${RasterDatasetMap_DatasetFragmentDoc}`;
export const DeleteDatasetTrigger_DatasetFragmentDoc = gql`
    fragment DeleteDatasetTrigger_dataset on AccessmodFileset {
  id
  authorizedActions
}
    `;
export const DownloadDatasetButton_DatasetFragmentDoc = gql`
    fragment DownloadDatasetButton_dataset on AccessmodFileset {
  id
  name
  files {
    id
    name
    mimeType
  }
}
    `;
export const DatasetViewer_ProjectFragmentDoc = gql`
    fragment DatasetViewer_project on AccessmodProject {
  id
}
    `;
export const PreviewDatasetDialog_ProjectFragmentDoc = gql`
    fragment PreviewDatasetDialog_project on AccessmodProject {
  id
  ...DatasetViewer_project
}
    ${DatasetViewer_ProjectFragmentDoc}`;
export const PreviewDatasetDialog_DatasetFragmentDoc = gql`
    fragment PreviewDatasetDialog_dataset on AccessmodFileset {
  id
  name
}
    `;
export const ProjectCard_ProjectFragmentDoc = gql`
    fragment ProjectCard_project on AccessmodProject {
  id
  name
  spatialResolution
  description
  updatedAt
  permissions {
    user {
      firstName
      lastName
      avatar {
        initials
        color
      }
    }
    team {
      name
    }
    mode
  }
  country {
    name
    flag
    code
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
export const DeleteMembershipTrigger_MembershipFragmentDoc = gql`
    fragment DeleteMembershipTrigger_membership on Membership {
  id
  authorizedActions
  user {
    firstName
    lastName
  }
  team {
    id
    name
  }
}
    `;
export const TeamFormDialog_TeamFragmentDoc = gql`
    fragment TeamFormDialog_team on Team {
  id
  name
}
    `;
export const EditTeamTrigger_TeamFragmentDoc = gql`
    fragment EditTeamTrigger_team on Team {
  ...TeamFormDialog_team
  authorizedActions
}
    ${TeamFormDialog_TeamFragmentDoc}`;
export const DeleteTeamTrigger_TeamFragmentDoc = gql`
    fragment DeleteTeamTrigger_team on Team {
  id
  name
  authorizedActions
}
    `;
export const TeamActionsMenu_TeamFragmentDoc = gql`
    fragment TeamActionsMenu_team on Team {
  id
  name
  ...DeleteTeamTrigger_team
}
    ${DeleteTeamTrigger_TeamFragmentDoc}`;
export const TeamProjectsTable_TeamFragmentDoc = gql`
    fragment TeamProjectsTable_team on Team {
  id
}
    `;
export const DeleteProjectTrigger_ProjectFragmentDoc = gql`
    fragment DeleteProjectTrigger_project on AccessmodProject {
  id
  name
  authorizedActions
}
    `;
export const ProjectActionsMenu_ProjectFragmentDoc = gql`
    fragment ProjectActionsMenu_project on AccessmodProject {
  id
  name
  ...DeleteProjectTrigger_project
}
    ${DeleteProjectTrigger_ProjectFragmentDoc}`;
export const ProjectAnalysesTable_ProjectFragmentDoc = gql`
    fragment ProjectAnalysesTable_project on AccessmodProject {
  id
}
    `;
export const DeleteDatasetTrigger_ProjectFragmentDoc = gql`
    fragment DeleteDatasetTrigger_project on AccessmodProject {
  id
  name
}
    `;
export const User_UserFragmentDoc = gql`
    fragment User_user on User {
  firstName
  lastName
  email
  id
  avatar {
    initials
    color
  }
}
    `;
export const ProjectDatasetsTable_ProjectFragmentDoc = gql`
    fragment ProjectDatasetsTable_project on AccessmodProject {
  ...DeleteDatasetTrigger_project
  id
  author {
    ...User_user
  }
}
    ${DeleteDatasetTrigger_ProjectFragmentDoc}
${User_UserFragmentDoc}`;
export const CreateAnalysisDialog_ProjectFragmentDoc = gql`
    fragment CreateAnalysisDialog_project on AccessmodProject {
  id
}
    `;
export const CreateAnalysisTrigger_ProjectFragmentDoc = gql`
    fragment CreateAnalysisTrigger_project on AccessmodProject {
  ...CreateAnalysisDialog_project
  authorizedActions
}
    ${CreateAnalysisDialog_ProjectFragmentDoc}`;
export const CreateDatasetTrigger_ProjectFragmentDoc = gql`
    fragment CreateDatasetTrigger_project on AccessmodProject {
  ...DatasetFormDialog_project
  authorizedActions
}
    ${DatasetFormDialog_ProjectFragmentDoc}`;
export const EditProjectFormBlock_ProjectFragmentDoc = gql`
    fragment EditProjectFormBlock_project on AccessmodProject {
  id
}
    `;
export const ProjectPermissionPicker_ProjectFragmentDoc = gql`
    fragment ProjectPermissionPicker_project on AccessmodProject {
  permissions {
    mode
    id
  }
}
    `;
export const CreateMembershipForm_ProjectFragmentDoc = gql`
    fragment CreateMembershipForm_project on AccessmodProject {
  id
  ...ProjectPermissionPicker_project
  permissions {
    mode
    team {
      __typename
      id
    }
  }
}
    ${ProjectPermissionPicker_ProjectFragmentDoc}`;
export const DeleteProjectPermissionTrigger_PermissionFragmentDoc = gql`
    fragment DeleteProjectPermissionTrigger_permission on AccessmodProjectPermission {
  id
  authorizedActions
}
    `;
export const ProjectPermissionPicker_PermissionFragmentDoc = gql`
    fragment ProjectPermissionPicker_permission on AccessmodProjectPermission {
  id
  mode
}
    `;
export const ProjectPage_ProjectFragmentDoc = gql`
    fragment ProjectPage_project on AccessmodProject {
  id
  name
  crs
  description
  ...ProjectActionsMenu_project
  ...ProjectAnalysesTable_project
  ...ProjectDatasetsTable_project
  ...CreateAnalysisTrigger_project
  ...CreateDatasetTrigger_project
  ...EditProjectFormBlock_project
  ...CreateMembershipForm_project
  ...ProjectPermissionPicker_project
  authorizedActions
  permissions {
    ...DeleteProjectPermissionTrigger_permission
    ...ProjectPermissionPicker_permission
    id
    team {
      __typename
      id
      name
    }
    authorizedActions
    user {
      __typename
      ...User_user
    }
    mode
    createdAt
    updatedAt
  }
  country {
    name
    code
    flag
  }
  createdAt
  updatedAt
  spatialResolution
  author {
    ...User_user
    email
  }
}
    ${ProjectActionsMenu_ProjectFragmentDoc}
${ProjectAnalysesTable_ProjectFragmentDoc}
${ProjectDatasetsTable_ProjectFragmentDoc}
${CreateAnalysisTrigger_ProjectFragmentDoc}
${CreateDatasetTrigger_ProjectFragmentDoc}
${EditProjectFormBlock_ProjectFragmentDoc}
${CreateMembershipForm_ProjectFragmentDoc}
${ProjectPermissionPicker_ProjectFragmentDoc}
${DeleteProjectPermissionTrigger_PermissionFragmentDoc}
${ProjectPermissionPicker_PermissionFragmentDoc}
${User_UserFragmentDoc}`;
export const HeaderDocument = gql`
    query Header {
  me {
    authorizedActions
  }
  ...Navbar_navbar
}
    ${Navbar_NavbarFragmentDoc}`;

/**
 * __useHeaderQuery__
 *
 * To run a query within a React component, call `useHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeaderQuery({
 *   variables: {
 *   },
 * });
 */
export function useHeaderQuery(baseOptions?: Apollo.QueryHookOptions<HeaderQuery, HeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HeaderQuery, HeaderQueryVariables>(HeaderDocument, options);
      }
export function useHeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeaderQuery, HeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HeaderQuery, HeaderQueryVariables>(HeaderDocument, options);
        }
export type HeaderQueryHookResult = ReturnType<typeof useHeaderQuery>;
export type HeaderLazyQueryHookResult = ReturnType<typeof useHeaderLazyQuery>;
export type HeaderQueryResult = Apollo.QueryResult<HeaderQuery, HeaderQueryVariables>;
export const CreateAccessibilityAnalysisDocument = gql`
    mutation CreateAccessibilityAnalysis($input: CreateAccessmodAccessibilityAnalysisInput) {
  response: createAccessmodAccessibilityAnalysis(input: $input) {
    success
    errors
    analysis {
      id
    }
  }
}
    `;
export type CreateAccessibilityAnalysisMutationFn = Apollo.MutationFunction<CreateAccessibilityAnalysisMutation, CreateAccessibilityAnalysisMutationVariables>;

/**
 * __useCreateAccessibilityAnalysisMutation__
 *
 * To run a mutation, you first call `useCreateAccessibilityAnalysisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccessibilityAnalysisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccessibilityAnalysisMutation, { data, loading, error }] = useCreateAccessibilityAnalysisMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccessibilityAnalysisMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccessibilityAnalysisMutation, CreateAccessibilityAnalysisMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccessibilityAnalysisMutation, CreateAccessibilityAnalysisMutationVariables>(CreateAccessibilityAnalysisDocument, options);
      }
export type CreateAccessibilityAnalysisMutationHookResult = ReturnType<typeof useCreateAccessibilityAnalysisMutation>;
export type CreateAccessibilityAnalysisMutationResult = Apollo.MutationResult<CreateAccessibilityAnalysisMutation>;
export type CreateAccessibilityAnalysisMutationOptions = Apollo.BaseMutationOptions<CreateAccessibilityAnalysisMutation, CreateAccessibilityAnalysisMutationVariables>;
export const FilesetRolePickerDocument = gql`
    query FilesetRolePicker {
  accessmodFilesetRoles {
    id
    name
    format
    createdAt
    updatedAt
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
export const CreateMembershipDocument = gql`
    mutation CreateMembership($input: CreateMembershipInput!) {
  createMembership(input: $input) {
    success
    errors
  }
}
    `;
export type CreateMembershipMutationFn = Apollo.MutationFunction<CreateMembershipMutation, CreateMembershipMutationVariables>;

/**
 * __useCreateMembershipMutation__
 *
 * To run a mutation, you first call `useCreateMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMembershipMutation, { data, loading, error }] = useCreateMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMembershipMutation(baseOptions?: Apollo.MutationHookOptions<CreateMembershipMutation, CreateMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMembershipMutation, CreateMembershipMutationVariables>(CreateMembershipDocument, options);
      }
export type CreateMembershipMutationHookResult = ReturnType<typeof useCreateMembershipMutation>;
export type CreateMembershipMutationResult = Apollo.MutationResult<CreateMembershipMutation>;
export type CreateMembershipMutationOptions = Apollo.BaseMutationOptions<CreateMembershipMutation, CreateMembershipMutationVariables>;
export const UpdateMembershipDocument = gql`
    mutation UpdateMembership($input: UpdateMembershipInput!) {
  updateMembership(input: $input) {
    success
    errors
    membership {
      id
      role
    }
  }
}
    `;
export type UpdateMembershipMutationFn = Apollo.MutationFunction<UpdateMembershipMutation, UpdateMembershipMutationVariables>;

/**
 * __useUpdateMembershipMutation__
 *
 * To run a mutation, you first call `useUpdateMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMembershipMutation, { data, loading, error }] = useUpdateMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMembershipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMembershipMutation, UpdateMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMembershipMutation, UpdateMembershipMutationVariables>(UpdateMembershipDocument, options);
      }
export type UpdateMembershipMutationHookResult = ReturnType<typeof useUpdateMembershipMutation>;
export type UpdateMembershipMutationResult = Apollo.MutationResult<UpdateMembershipMutation>;
export type UpdateMembershipMutationOptions = Apollo.BaseMutationOptions<UpdateMembershipMutation, UpdateMembershipMutationVariables>;
export const TeamMembersTableDocument = gql`
    query TeamMembersTable($teamId: String!) {
  team(id: $teamId) {
    memberships(page: 1, perPage: 10) {
      totalItems
      totalPages
      pageNumber
      items {
        ...DeleteMembershipTrigger_membership
        id
        authorizedActions
        createdAt
        updatedAt
        role
        user {
          ...User_user
        }
      }
    }
  }
}
    ${DeleteMembershipTrigger_MembershipFragmentDoc}
${User_UserFragmentDoc}`;

/**
 * __useTeamMembersTableQuery__
 *
 * To run a query within a React component, call `useTeamMembersTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamMembersTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamMembersTableQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamMembersTableQuery(baseOptions: Apollo.QueryHookOptions<TeamMembersTableQuery, TeamMembersTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamMembersTableQuery, TeamMembersTableQueryVariables>(TeamMembersTableDocument, options);
      }
export function useTeamMembersTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamMembersTableQuery, TeamMembersTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamMembersTableQuery, TeamMembersTableQueryVariables>(TeamMembersTableDocument, options);
        }
export type TeamMembersTableQueryHookResult = ReturnType<typeof useTeamMembersTableQuery>;
export type TeamMembersTableLazyQueryHookResult = ReturnType<typeof useTeamMembersTableLazyQuery>;
export type TeamMembersTableQueryResult = Apollo.QueryResult<TeamMembersTableQuery, TeamMembersTableQueryVariables>;
export const UpdateAccessibilityAnalysisDocument = gql`
    mutation UpdateAccessibilityAnalysis($input: UpdateAccessmodAccessibilityAnalysisInput) {
  updateAccessmodAccessibilityAnalysis(input: $input) {
    success
    errors
    analysis {
      ...AccessibilityAnalysisForm_analysis
    }
  }
}
    ${AccessibilityAnalysisForm_AnalysisFragmentDoc}`;
export type UpdateAccessibilityAnalysisMutationFn = Apollo.MutationFunction<UpdateAccessibilityAnalysisMutation, UpdateAccessibilityAnalysisMutationVariables>;

/**
 * __useUpdateAccessibilityAnalysisMutation__
 *
 * To run a mutation, you first call `useUpdateAccessibilityAnalysisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccessibilityAnalysisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccessibilityAnalysisMutation, { data, loading, error }] = useUpdateAccessibilityAnalysisMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAccessibilityAnalysisMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccessibilityAnalysisMutation, UpdateAccessibilityAnalysisMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccessibilityAnalysisMutation, UpdateAccessibilityAnalysisMutationVariables>(UpdateAccessibilityAnalysisDocument, options);
      }
export type UpdateAccessibilityAnalysisMutationHookResult = ReturnType<typeof useUpdateAccessibilityAnalysisMutation>;
export type UpdateAccessibilityAnalysisMutationResult = Apollo.MutationResult<UpdateAccessibilityAnalysisMutation>;
export type UpdateAccessibilityAnalysisMutationOptions = Apollo.BaseMutationOptions<UpdateAccessibilityAnalysisMutation, UpdateAccessibilityAnalysisMutationVariables>;
export const CreateFilesetDocument = gql`
    mutation CreateFileset($input: CreateAccessmodFilesetInput) {
  createAccessmodFileset(input: $input) {
    success
    errors
    fileset {
      id
      name
      role {
        id
        code
        name
      }
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
export const DatasetPickerDocument = gql`
    query DatasetPicker($projectId: String!, $page: Int = 1, $perPage: Int = 15, $roleId: String, $term: String) {
  filesets: accessmodFilesets(
    projectId: $projectId
    page: $page
    term: $term
    perPage: $perPage
    roleId: $roleId
  ) {
    items {
      ...DatasetPicker_dataset
    }
    totalItems
  }
}
    ${DatasetPicker_DatasetFragmentDoc}`;

/**
 * __useDatasetPickerQuery__
 *
 * To run a query within a React component, call `useDatasetPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useDatasetPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDatasetPickerQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      roleId: // value for 'roleId'
 *      term: // value for 'term'
 *   },
 * });
 */
export function useDatasetPickerQuery(baseOptions: Apollo.QueryHookOptions<DatasetPickerQuery, DatasetPickerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DatasetPickerQuery, DatasetPickerQueryVariables>(DatasetPickerDocument, options);
      }
export function useDatasetPickerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DatasetPickerQuery, DatasetPickerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DatasetPickerQuery, DatasetPickerQueryVariables>(DatasetPickerDocument, options);
        }
export type DatasetPickerQueryHookResult = ReturnType<typeof useDatasetPickerQuery>;
export type DatasetPickerLazyQueryHookResult = ReturnType<typeof useDatasetPickerLazyQuery>;
export type DatasetPickerQueryResult = Apollo.QueryResult<DatasetPickerQuery, DatasetPickerQueryVariables>;
export const PollDatasetStatusDocument = gql`
    query PollDatasetStatus($id: String!) {
  dataset: accessmodFileset(id: $id) {
    id
    status
    metadata
  }
}
    `;

/**
 * __usePollDatasetStatusQuery__
 *
 * To run a query within a React component, call `usePollDatasetStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `usePollDatasetStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePollDatasetStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePollDatasetStatusQuery(baseOptions: Apollo.QueryHookOptions<PollDatasetStatusQuery, PollDatasetStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PollDatasetStatusQuery, PollDatasetStatusQueryVariables>(PollDatasetStatusDocument, options);
      }
export function usePollDatasetStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PollDatasetStatusQuery, PollDatasetStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PollDatasetStatusQuery, PollDatasetStatusQueryVariables>(PollDatasetStatusDocument, options);
        }
export type PollDatasetStatusQueryHookResult = ReturnType<typeof usePollDatasetStatusQuery>;
export type PollDatasetStatusLazyQueryHookResult = ReturnType<typeof usePollDatasetStatusLazyQuery>;
export type PollDatasetStatusQueryResult = Apollo.QueryResult<PollDatasetStatusQuery, PollDatasetStatusQueryVariables>;
export const DeleteDatasetDocument = gql`
    mutation DeleteDataset($input: DeleteAccessmodFilesetInput!) {
  deleteAccessmodFileset(input: $input) {
    success
  }
}
    `;
export type DeleteDatasetMutationFn = Apollo.MutationFunction<DeleteDatasetMutation, DeleteDatasetMutationVariables>;

/**
 * __useDeleteDatasetMutation__
 *
 * To run a mutation, you first call `useDeleteDatasetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDatasetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDatasetMutation, { data, loading, error }] = useDeleteDatasetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDatasetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDatasetMutation, DeleteDatasetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDatasetMutation, DeleteDatasetMutationVariables>(DeleteDatasetDocument, options);
      }
export type DeleteDatasetMutationHookResult = ReturnType<typeof useDeleteDatasetMutation>;
export type DeleteDatasetMutationResult = Apollo.MutationResult<DeleteDatasetMutation>;
export type DeleteDatasetMutationOptions = Apollo.BaseMutationOptions<DeleteDatasetMutation, DeleteDatasetMutationVariables>;
export const PreviewDatasetDialogDocument = gql`
    query PreviewDatasetDialog($id: String!) {
  dataset: accessmodFileset(id: $id) {
    ...DatasetViewer_dataset
    ...DownloadDatasetButton_dataset
  }
}
    ${DatasetViewer_DatasetFragmentDoc}
${DownloadDatasetButton_DatasetFragmentDoc}`;

/**
 * __usePreviewDatasetDialogQuery__
 *
 * To run a query within a React component, call `usePreviewDatasetDialogQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviewDatasetDialogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviewDatasetDialogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePreviewDatasetDialogQuery(baseOptions: Apollo.QueryHookOptions<PreviewDatasetDialogQuery, PreviewDatasetDialogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreviewDatasetDialogQuery, PreviewDatasetDialogQueryVariables>(PreviewDatasetDialogDocument, options);
      }
export function usePreviewDatasetDialogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewDatasetDialogQuery, PreviewDatasetDialogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreviewDatasetDialogQuery, PreviewDatasetDialogQueryVariables>(PreviewDatasetDialogDocument, options);
        }
export type PreviewDatasetDialogQueryHookResult = ReturnType<typeof usePreviewDatasetDialogQuery>;
export type PreviewDatasetDialogLazyQueryHookResult = ReturnType<typeof usePreviewDatasetDialogLazyQuery>;
export type PreviewDatasetDialogQueryResult = Apollo.QueryResult<PreviewDatasetDialogQuery, PreviewDatasetDialogQueryVariables>;
export const CreateProjectMembershipDocument = gql`
    mutation CreateProjectMembership($input: CreateAccessmodProjectPermissionInput!) {
  createAccessmodProjectPermission(input: $input) {
    success
    errors
    permission {
      id
    }
  }
}
    `;
export type CreateProjectMembershipMutationFn = Apollo.MutationFunction<CreateProjectMembershipMutation, CreateProjectMembershipMutationVariables>;

/**
 * __useCreateProjectMembershipMutation__
 *
 * To run a mutation, you first call `useCreateProjectMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMembershipMutation, { data, loading, error }] = useCreateProjectMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMembershipMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMembershipMutation, CreateProjectMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMembershipMutation, CreateProjectMembershipMutationVariables>(CreateProjectMembershipDocument, options);
      }
export type CreateProjectMembershipMutationHookResult = ReturnType<typeof useCreateProjectMembershipMutation>;
export type CreateProjectMembershipMutationResult = Apollo.MutationResult<CreateProjectMembershipMutation>;
export type CreateProjectMembershipMutationOptions = Apollo.BaseMutationOptions<CreateProjectMembershipMutation, CreateProjectMembershipMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateAccessmodProjectInput) {
  createAccessmodProject(input: $input) {
    success
    project {
      id
    }
    errors
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
export const DeleteProjectPermissionDocument = gql`
    mutation DeleteProjectPermission($input: DeleteAccessmodProjectPermissionInput!) {
  deleteAccessmodProjectPermission(input: $input) {
    success
  }
}
    `;
export type DeleteProjectPermissionMutationFn = Apollo.MutationFunction<DeleteProjectPermissionMutation, DeleteProjectPermissionMutationVariables>;

/**
 * __useDeleteProjectPermissionMutation__
 *
 * To run a mutation, you first call `useDeleteProjectPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectPermissionMutation, { data, loading, error }] = useDeleteProjectPermissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteProjectPermissionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectPermissionMutation, DeleteProjectPermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectPermissionMutation, DeleteProjectPermissionMutationVariables>(DeleteProjectPermissionDocument, options);
      }
export type DeleteProjectPermissionMutationHookResult = ReturnType<typeof useDeleteProjectPermissionMutation>;
export type DeleteProjectPermissionMutationResult = Apollo.MutationResult<DeleteProjectPermissionMutation>;
export type DeleteProjectPermissionMutationOptions = Apollo.BaseMutationOptions<DeleteProjectPermissionMutation, DeleteProjectPermissionMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($input: DeleteAccessmodProjectInput) {
  deleteAccessmodProject(input: $input) {
    success
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const EditProjectDocument = gql`
    query EditProject($projectId: String!) {
  project: accessmodProject(id: $projectId) {
    id
    name
    crs
    description
    spatialResolution
  }
}
    `;

/**
 * __useEditProjectQuery__
 *
 * To run a query within a React component, call `useEditProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useEditProjectQuery(baseOptions: Apollo.QueryHookOptions<EditProjectQuery, EditProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditProjectQuery, EditProjectQueryVariables>(EditProjectDocument, options);
      }
export function useEditProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditProjectQuery, EditProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditProjectQuery, EditProjectQueryVariables>(EditProjectDocument, options);
        }
export type EditProjectQueryHookResult = ReturnType<typeof useEditProjectQuery>;
export type EditProjectLazyQueryHookResult = ReturnType<typeof useEditProjectLazyQuery>;
export type EditProjectQueryResult = Apollo.QueryResult<EditProjectQuery, EditProjectQueryVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($input: UpdateAccessmodProjectInput) {
  updateAccessmodProject(input: $input) {
    success
    errors
    project {
      id
      name
      description
      crs
      spatialResolution
    }
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteAnalysisDocument = gql`
    mutation DeleteAnalysis($input: DeleteAccessmodAnalysisInput) {
  deleteAccessmodAnalysis(input: $input) {
    success
  }
}
    `;
export type DeleteAnalysisMutationFn = Apollo.MutationFunction<DeleteAnalysisMutation, DeleteAnalysisMutationVariables>;

/**
 * __useDeleteAnalysisMutation__
 *
 * To run a mutation, you first call `useDeleteAnalysisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAnalysisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAnalysisMutation, { data, loading, error }] = useDeleteAnalysisMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAnalysisMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAnalysisMutation, DeleteAnalysisMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAnalysisMutation, DeleteAnalysisMutationVariables>(DeleteAnalysisDocument, options);
      }
export type DeleteAnalysisMutationHookResult = ReturnType<typeof useDeleteAnalysisMutation>;
export type DeleteAnalysisMutationResult = Apollo.MutationResult<DeleteAnalysisMutation>;
export type DeleteAnalysisMutationOptions = Apollo.BaseMutationOptions<DeleteAnalysisMutation, DeleteAnalysisMutationVariables>;
export const ProjectAnalysesTableDocument = gql`
    query ProjectAnalysesTable($page: Int = 1, $perPage: Int = 5, $projectId: String!) {
  analyses: accessmodAnalyses(
    projectId: $projectId
    page: $page
    perPage: $perPage
  ) {
    items {
      __typename
      id
      type
      name
      createdAt
      status
      ...AnalysisStatus_analysis
    }
    pageNumber
    totalPages
    totalItems
  }
}
    ${AnalysisStatus_AnalysisFragmentDoc}`;

/**
 * __useProjectAnalysesTableQuery__
 *
 * To run a query within a React component, call `useProjectAnalysesTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectAnalysesTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectAnalysesTableQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectAnalysesTableQuery(baseOptions: Apollo.QueryHookOptions<ProjectAnalysesTableQuery, ProjectAnalysesTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectAnalysesTableQuery, ProjectAnalysesTableQueryVariables>(ProjectAnalysesTableDocument, options);
      }
export function useProjectAnalysesTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectAnalysesTableQuery, ProjectAnalysesTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectAnalysesTableQuery, ProjectAnalysesTableQueryVariables>(ProjectAnalysesTableDocument, options);
        }
export type ProjectAnalysesTableQueryHookResult = ReturnType<typeof useProjectAnalysesTableQuery>;
export type ProjectAnalysesTableLazyQueryHookResult = ReturnType<typeof useProjectAnalysesTableLazyQuery>;
export type ProjectAnalysesTableQueryResult = Apollo.QueryResult<ProjectAnalysesTableQuery, ProjectAnalysesTableQueryVariables>;
export const ProjectDatasetsTableDocument = gql`
    query ProjectDatasetsTable($page: Int = 1, $perPage: Int = 5, $projectId: String!, $term: String) {
  accessmodFilesets(
    projectId: $projectId
    page: $page
    perPage: $perPage
    term: $term
  ) {
    items {
      ...DatasetFormDialog_dataset
      ...DatasetStatusBadge_dataset
      ...DeleteDatasetTrigger_dataset
      id
      name
      role {
        name
        id
        format
      }
      author {
        id
        firstName
        lastName
        email
        avatar {
          initials
          color
        }
      }
      status
      createdAt
    }
    pageNumber
    totalPages
    totalItems
  }
}
    ${DatasetFormDialog_DatasetFragmentDoc}
${DatasetStatusBadge_DatasetFragmentDoc}
${DeleteDatasetTrigger_DatasetFragmentDoc}`;

/**
 * __useProjectDatasetsTableQuery__
 *
 * To run a query within a React component, call `useProjectDatasetsTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDatasetsTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDatasetsTableQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      projectId: // value for 'projectId'
 *      term: // value for 'term'
 *   },
 * });
 */
export function useProjectDatasetsTableQuery(baseOptions: Apollo.QueryHookOptions<ProjectDatasetsTableQuery, ProjectDatasetsTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDatasetsTableQuery, ProjectDatasetsTableQueryVariables>(ProjectDatasetsTableDocument, options);
      }
export function useProjectDatasetsTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDatasetsTableQuery, ProjectDatasetsTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDatasetsTableQuery, ProjectDatasetsTableQueryVariables>(ProjectDatasetsTableDocument, options);
        }
export type ProjectDatasetsTableQueryHookResult = ReturnType<typeof useProjectDatasetsTableQuery>;
export type ProjectDatasetsTableLazyQueryHookResult = ReturnType<typeof useProjectDatasetsTableLazyQuery>;
export type ProjectDatasetsTableQueryResult = Apollo.QueryResult<ProjectDatasetsTableQuery, ProjectDatasetsTableQueryVariables>;
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
export const DeleteMembershipDocument = gql`
    mutation DeleteMembership($input: DeleteMembershipInput!) {
  deleteMembership(input: $input) {
    success
    errors
  }
}
    `;
export type DeleteMembershipMutationFn = Apollo.MutationFunction<DeleteMembershipMutation, DeleteMembershipMutationVariables>;

/**
 * __useDeleteMembershipMutation__
 *
 * To run a mutation, you first call `useDeleteMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMembershipMutation, { data, loading, error }] = useDeleteMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMembershipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMembershipMutation, DeleteMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMembershipMutation, DeleteMembershipMutationVariables>(DeleteMembershipDocument, options);
      }
export type DeleteMembershipMutationHookResult = ReturnType<typeof useDeleteMembershipMutation>;
export type DeleteMembershipMutationResult = Apollo.MutationResult<DeleteMembershipMutation>;
export type DeleteMembershipMutationOptions = Apollo.BaseMutationOptions<DeleteMembershipMutation, DeleteMembershipMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($input: DeleteTeamInput!) {
  deleteTeam(input: $input) {
    success
    errors
  }
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($input: CreateTeamInput!) {
  result: createTeam(input: $input) {
    success
    team {
      id
    }
    errors
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($input: UpdateTeamInput!) {
  result: updateTeam(input: $input) {
    success
    team {
      id
      name
    }
    errors
  }
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const TeamPickerDocument = gql`
    query TeamPicker($page: Int = 1, $perPage: Int = 15, $term: String) {
  teams(page: $page, perPage: $perPage, term: $term) {
    items {
      id
      name
    }
    totalItems
  }
}
    `;

/**
 * __useTeamPickerQuery__
 *
 * To run a query within a React component, call `useTeamPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamPickerQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      term: // value for 'term'
 *   },
 * });
 */
export function useTeamPickerQuery(baseOptions?: Apollo.QueryHookOptions<TeamPickerQuery, TeamPickerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamPickerQuery, TeamPickerQueryVariables>(TeamPickerDocument, options);
      }
export function useTeamPickerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamPickerQuery, TeamPickerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamPickerQuery, TeamPickerQueryVariables>(TeamPickerDocument, options);
        }
export type TeamPickerQueryHookResult = ReturnType<typeof useTeamPickerQuery>;
export type TeamPickerLazyQueryHookResult = ReturnType<typeof useTeamPickerLazyQuery>;
export type TeamPickerQueryResult = Apollo.QueryResult<TeamPickerQuery, TeamPickerQueryVariables>;
export const TeamProjectsTableDocument = gql`
    query TeamProjectsTable($page: Int! = 1, $perPage: Int = 10, $teamIds: [String!]!) {
  projects: accessmodProjects(teams: $teamIds, page: $page, perPage: $perPage) {
    totalPages
    totalItems
    items {
      id
      name
      createdAt
      author {
        ...User_user
      }
    }
  }
}
    ${User_UserFragmentDoc}`;

/**
 * __useTeamProjectsTableQuery__
 *
 * To run a query within a React component, call `useTeamProjectsTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamProjectsTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamProjectsTableQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      teamIds: // value for 'teamIds'
 *   },
 * });
 */
export function useTeamProjectsTableQuery(baseOptions: Apollo.QueryHookOptions<TeamProjectsTableQuery, TeamProjectsTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamProjectsTableQuery, TeamProjectsTableQueryVariables>(TeamProjectsTableDocument, options);
      }
export function useTeamProjectsTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamProjectsTableQuery, TeamProjectsTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamProjectsTableQuery, TeamProjectsTableQueryVariables>(TeamProjectsTableDocument, options);
        }
export type TeamProjectsTableQueryHookResult = ReturnType<typeof useTeamProjectsTableQuery>;
export type TeamProjectsTableLazyQueryHookResult = ReturnType<typeof useTeamProjectsTableLazyQuery>;
export type TeamProjectsTableQueryResult = Apollo.QueryResult<TeamProjectsTableQuery, TeamProjectsTableQueryVariables>;
export const LaunchAccessmodAnalysisDocument = gql`
    mutation launchAccessmodAnalysis($input: LaunchAccessmodAnalysisInput) {
  launchAccessmodAnalysis(input: $input) {
    success
    errors
    analysis {
      status
      updatedAt
    }
  }
}
    `;
export type LaunchAccessmodAnalysisMutationFn = Apollo.MutationFunction<LaunchAccessmodAnalysisMutation, LaunchAccessmodAnalysisMutationVariables>;

/**
 * __useLaunchAccessmodAnalysisMutation__
 *
 * To run a mutation, you first call `useLaunchAccessmodAnalysisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLaunchAccessmodAnalysisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [launchAccessmodAnalysisMutation, { data, loading, error }] = useLaunchAccessmodAnalysisMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLaunchAccessmodAnalysisMutation(baseOptions?: Apollo.MutationHookOptions<LaunchAccessmodAnalysisMutation, LaunchAccessmodAnalysisMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LaunchAccessmodAnalysisMutation, LaunchAccessmodAnalysisMutationVariables>(LaunchAccessmodAnalysisDocument, options);
      }
export type LaunchAccessmodAnalysisMutationHookResult = ReturnType<typeof useLaunchAccessmodAnalysisMutation>;
export type LaunchAccessmodAnalysisMutationResult = Apollo.MutationResult<LaunchAccessmodAnalysisMutation>;
export type LaunchAccessmodAnalysisMutationOptions = Apollo.BaseMutationOptions<LaunchAccessmodAnalysisMutation, LaunchAccessmodAnalysisMutationVariables>;
export const MeQueryDocument = gql`
    query MeQuery {
  me {
    user {
      email
      id
      firstName
      lastName
      avatar {
        initials
        color
      }
    }
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
export const GetFilesetRolesDocument = gql`
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

/**
 * __useGetFilesetRolesQuery__
 *
 * To run a query within a React component, call `useGetFilesetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilesetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilesetRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFilesetRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetFilesetRolesQuery, GetFilesetRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilesetRolesQuery, GetFilesetRolesQueryVariables>(GetFilesetRolesDocument, options);
      }
export function useGetFilesetRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilesetRolesQuery, GetFilesetRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilesetRolesQuery, GetFilesetRolesQueryVariables>(GetFilesetRolesDocument, options);
        }
export type GetFilesetRolesQueryHookResult = ReturnType<typeof useGetFilesetRolesQuery>;
export type GetFilesetRolesLazyQueryHookResult = ReturnType<typeof useGetFilesetRolesLazyQuery>;
export type GetFilesetRolesQueryResult = Apollo.QueryResult<GetFilesetRolesQuery, GetFilesetRolesQueryVariables>;
export const GetFileDownloadUrlDocument = gql`
    mutation GetFileDownloadUrl($input: PrepareAccessmodFileDownloadInput) {
  prepareAccessmodFileDownload(input: $input) {
    success
    downloadUrl
  }
}
    `;
export type GetFileDownloadUrlMutationFn = Apollo.MutationFunction<GetFileDownloadUrlMutation, GetFileDownloadUrlMutationVariables>;

/**
 * __useGetFileDownloadUrlMutation__
 *
 * To run a mutation, you first call `useGetFileDownloadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetFileDownloadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getFileDownloadUrlMutation, { data, loading, error }] = useGetFileDownloadUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFileDownloadUrlMutation(baseOptions?: Apollo.MutationHookOptions<GetFileDownloadUrlMutation, GetFileDownloadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetFileDownloadUrlMutation, GetFileDownloadUrlMutationVariables>(GetFileDownloadUrlDocument, options);
      }
export type GetFileDownloadUrlMutationHookResult = ReturnType<typeof useGetFileDownloadUrlMutation>;
export type GetFileDownloadUrlMutationResult = Apollo.MutationResult<GetFileDownloadUrlMutation>;
export type GetFileDownloadUrlMutationOptions = Apollo.BaseMutationOptions<GetFileDownloadUrlMutation, GetFileDownloadUrlMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    success
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
export const AnalysisEditPageDocument = gql`
    query AnalysisEditPage($id: String!, $analysisId: String!) {
  project: accessmodProject(id: $id) {
    id
    name
    ...AnalysisForm_project
  }
  analysis: accessmodAnalysis(id: $analysisId) {
    __typename
    id
    type
    name
    status
    authorizedActions
    ...AnalysisForm_analysis
  }
}
    ${AnalysisForm_ProjectFragmentDoc}
${AnalysisForm_AnalysisFragmentDoc}`;

/**
 * __useAnalysisEditPageQuery__
 *
 * To run a query within a React component, call `useAnalysisEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalysisEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalysisEditPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *      analysisId: // value for 'analysisId'
 *   },
 * });
 */
export function useAnalysisEditPageQuery(baseOptions: Apollo.QueryHookOptions<AnalysisEditPageQuery, AnalysisEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalysisEditPageQuery, AnalysisEditPageQueryVariables>(AnalysisEditPageDocument, options);
      }
export function useAnalysisEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalysisEditPageQuery, AnalysisEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalysisEditPageQuery, AnalysisEditPageQueryVariables>(AnalysisEditPageDocument, options);
        }
export type AnalysisEditPageQueryHookResult = ReturnType<typeof useAnalysisEditPageQuery>;
export type AnalysisEditPageLazyQueryHookResult = ReturnType<typeof useAnalysisEditPageLazyQuery>;
export type AnalysisEditPageQueryResult = Apollo.QueryResult<AnalysisEditPageQuery, AnalysisEditPageQueryVariables>;
export const AnalysisDetailPageDocument = gql`
    query AnalysisDetailPage($id: String!, $analysisId: String!) {
  project: accessmodProject(id: $id) {
    id
    name
    ...AnalysisActionsButton_project
    ...AccessibilityAnalysisOutput_project
  }
  analysis: accessmodAnalysis(id: $analysisId) {
    __typename
    id
    name
    type
    createdAt
    updatedAt
    status
    ...AnalysisActionsButton_analysis
    ...AnalysisStatus_analysis
    ...AccessibilityAnalysisOutput_analysis
    author {
      ...User_user
    }
    ... on AccessmodAccessibilityAnalysis {
      landCover {
        id
        name
      }
      transportNetwork {
        id
        name
      }
      slope {
        id
        name
      }
      water {
        id
        name
      }
      barrier {
        id
        name
      }
      movingSpeeds {
        id
        name
      }
      healthFacilities {
        id
        name
      }
    }
  }
}
    ${AnalysisActionsButton_ProjectFragmentDoc}
${AccessibilityAnalysisOutput_ProjectFragmentDoc}
${AnalysisActionsButton_AnalysisFragmentDoc}
${AnalysisStatus_AnalysisFragmentDoc}
${AccessibilityAnalysisOutput_AnalysisFragmentDoc}
${User_UserFragmentDoc}`;

/**
 * __useAnalysisDetailPageQuery__
 *
 * To run a query within a React component, call `useAnalysisDetailPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalysisDetailPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalysisDetailPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *      analysisId: // value for 'analysisId'
 *   },
 * });
 */
export function useAnalysisDetailPageQuery(baseOptions: Apollo.QueryHookOptions<AnalysisDetailPageQuery, AnalysisDetailPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalysisDetailPageQuery, AnalysisDetailPageQueryVariables>(AnalysisDetailPageDocument, options);
      }
export function useAnalysisDetailPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalysisDetailPageQuery, AnalysisDetailPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalysisDetailPageQuery, AnalysisDetailPageQueryVariables>(AnalysisDetailPageDocument, options);
        }
export type AnalysisDetailPageQueryHookResult = ReturnType<typeof useAnalysisDetailPageQuery>;
export type AnalysisDetailPageLazyQueryHookResult = ReturnType<typeof useAnalysisDetailPageLazyQuery>;
export type AnalysisDetailPageQueryResult = Apollo.QueryResult<AnalysisDetailPageQuery, AnalysisDetailPageQueryVariables>;
export const ProjectAnalysesPageDocument = gql`
    query ProjectAnalysesPage($id: String!) {
  project: accessmodProject(id: $id) {
    id
    name
    ...CreateAnalysisTrigger_project
    ...ProjectAnalysesTable_project
  }
}
    ${CreateAnalysisTrigger_ProjectFragmentDoc}
${ProjectAnalysesTable_ProjectFragmentDoc}`;

/**
 * __useProjectAnalysesPageQuery__
 *
 * To run a query within a React component, call `useProjectAnalysesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectAnalysesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectAnalysesPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectAnalysesPageQuery(baseOptions: Apollo.QueryHookOptions<ProjectAnalysesPageQuery, ProjectAnalysesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectAnalysesPageQuery, ProjectAnalysesPageQueryVariables>(ProjectAnalysesPageDocument, options);
      }
export function useProjectAnalysesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectAnalysesPageQuery, ProjectAnalysesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectAnalysesPageQuery, ProjectAnalysesPageQueryVariables>(ProjectAnalysesPageDocument, options);
        }
export type ProjectAnalysesPageQueryHookResult = ReturnType<typeof useProjectAnalysesPageQuery>;
export type ProjectAnalysesPageLazyQueryHookResult = ReturnType<typeof useProjectAnalysesPageLazyQuery>;
export type ProjectAnalysesPageQueryResult = Apollo.QueryResult<ProjectAnalysesPageQuery, ProjectAnalysesPageQueryVariables>;
export const DatasetDetailPageDocument = gql`
    query DatasetDetailPage($id: String!, $datasetId: String!) {
  project: accessmodProject(id: $id) {
    id
    name
    ...DeleteDatasetTrigger_project
    ...DatasetViewer_project
  }
  dataset: accessmodFileset(id: $datasetId) {
    __typename
    ...DatasetViewer_dataset
    ...DownloadDatasetButton_dataset
    ...DeleteDatasetTrigger_dataset
    id
    name
    createdAt
    updatedAt
    role {
      id
      name
      code
      format
    }
    files {
      name
      mimeType
      createdAt
      uri
    }
    author {
      ...User_user
    }
  }
}
    ${DeleteDatasetTrigger_ProjectFragmentDoc}
${DatasetViewer_ProjectFragmentDoc}
${DatasetViewer_DatasetFragmentDoc}
${DownloadDatasetButton_DatasetFragmentDoc}
${DeleteDatasetTrigger_DatasetFragmentDoc}
${User_UserFragmentDoc}`;

/**
 * __useDatasetDetailPageQuery__
 *
 * To run a query within a React component, call `useDatasetDetailPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDatasetDetailPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDatasetDetailPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *      datasetId: // value for 'datasetId'
 *   },
 * });
 */
export function useDatasetDetailPageQuery(baseOptions: Apollo.QueryHookOptions<DatasetDetailPageQuery, DatasetDetailPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DatasetDetailPageQuery, DatasetDetailPageQueryVariables>(DatasetDetailPageDocument, options);
      }
export function useDatasetDetailPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DatasetDetailPageQuery, DatasetDetailPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DatasetDetailPageQuery, DatasetDetailPageQueryVariables>(DatasetDetailPageDocument, options);
        }
export type DatasetDetailPageQueryHookResult = ReturnType<typeof useDatasetDetailPageQuery>;
export type DatasetDetailPageLazyQueryHookResult = ReturnType<typeof useDatasetDetailPageLazyQuery>;
export type DatasetDetailPageQueryResult = Apollo.QueryResult<DatasetDetailPageQuery, DatasetDetailPageQueryVariables>;
export const ProjectDataPageDocument = gql`
    query ProjectDataPage($id: String!) {
  accessmodProject(id: $id) {
    id
    name
    authorizedActions
    ...DatasetFormDialog_project
    ...ProjectDatasetsTable_project
  }
}
    ${DatasetFormDialog_ProjectFragmentDoc}
${ProjectDatasetsTable_ProjectFragmentDoc}`;

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
export const UpdateProjectPermissionDocument = gql`
    mutation UpdateProjectPermission($input: UpdateAccessmodProjectPermissionInput!) {
  updateAccessmodProjectPermission(input: $input) {
    success
    permission {
      id
      mode
    }
    errors
  }
}
    `;
export type UpdateProjectPermissionMutationFn = Apollo.MutationFunction<UpdateProjectPermissionMutation, UpdateProjectPermissionMutationVariables>;

/**
 * __useUpdateProjectPermissionMutation__
 *
 * To run a mutation, you first call `useUpdateProjectPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectPermissionMutation, { data, loading, error }] = useUpdateProjectPermissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectPermissionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectPermissionMutation, UpdateProjectPermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectPermissionMutation, UpdateProjectPermissionMutationVariables>(UpdateProjectPermissionDocument, options);
      }
export type UpdateProjectPermissionMutationHookResult = ReturnType<typeof useUpdateProjectPermissionMutation>;
export type UpdateProjectPermissionMutationResult = Apollo.MutationResult<UpdateProjectPermissionMutation>;
export type UpdateProjectPermissionMutationOptions = Apollo.BaseMutationOptions<UpdateProjectPermissionMutation, UpdateProjectPermissionMutationVariables>;
export const ProjectPageDocument = gql`
    query ProjectPage($id: String!) {
  project: accessmodProject(id: $id) {
    ...ProjectPage_project
  }
}
    ${ProjectPage_ProjectFragmentDoc}`;

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
    query ProjectsPage($term: String, $countries: [String!], $teams: [String!], $page: Int = 1, $perPage: Int = 20) {
  accessmodProjects(
    term: $term
    teams: $teams
    countries: $countries
    page: $page
    perPage: $perPage
  ) {
    ...ProjectsList_projects
    pageNumber
    totalPages
    totalItems
    items {
      __typename
    }
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
 *      term: // value for 'term'
 *      countries: // value for 'countries'
 *      teams: // value for 'teams'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
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
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    success
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SettingsPageDocument = gql`
    query SettingsPage {
  me {
    user {
      id
      email
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useSettingsPageQuery__
 *
 * To run a query within a React component, call `useSettingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsPageQuery(baseOptions?: Apollo.QueryHookOptions<SettingsPageQuery, SettingsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsPageQuery, SettingsPageQueryVariables>(SettingsPageDocument, options);
      }
export function useSettingsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsPageQuery, SettingsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsPageQuery, SettingsPageQueryVariables>(SettingsPageDocument, options);
        }
export type SettingsPageQueryHookResult = ReturnType<typeof useSettingsPageQuery>;
export type SettingsPageLazyQueryHookResult = ReturnType<typeof useSettingsPageLazyQuery>;
export type SettingsPageQueryResult = Apollo.QueryResult<SettingsPageQuery, SettingsPageQueryVariables>;
export const TeamPageDocument = gql`
    query TeamPage($id: String!) {
  team(id: $id) {
    id
    name
    createdAt
    authorizedActions
    ...TeamMembersTable_team
    ...InviteTeamMemberTrigger_team
    ...TeamFormDialog_team
    ...TeamProjectsTable_team
    ...TeamActionsMenu_team
  }
}
    ${TeamMembersTable_TeamFragmentDoc}
${InviteTeamMemberTrigger_TeamFragmentDoc}
${TeamFormDialog_TeamFragmentDoc}
${TeamProjectsTable_TeamFragmentDoc}
${TeamActionsMenu_TeamFragmentDoc}`;

/**
 * __useTeamPageQuery__
 *
 * To run a query within a React component, call `useTeamPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamPageQuery(baseOptions: Apollo.QueryHookOptions<TeamPageQuery, TeamPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamPageQuery, TeamPageQueryVariables>(TeamPageDocument, options);
      }
export function useTeamPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamPageQuery, TeamPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamPageQuery, TeamPageQueryVariables>(TeamPageDocument, options);
        }
export type TeamPageQueryHookResult = ReturnType<typeof useTeamPageQuery>;
export type TeamPageLazyQueryHookResult = ReturnType<typeof useTeamPageLazyQuery>;
export type TeamPageQueryResult = Apollo.QueryResult<TeamPageQuery, TeamPageQueryVariables>;
export const TeamsPageDocument = gql`
    query TeamsPage($page: Int = 1, $perPage: Int = 20) {
  me {
    authorizedActions
  }
  teams(page: $page, perPage: $perPage) {
    pageNumber
    totalPages
    totalItems
    items {
      name
      id
      memberships(page: 1, perPage: 5) {
        totalItems
        items {
          user {
            id
            email
            firstName
            lastName
            avatar {
              initials
              color
            }
          }
        }
      }
      __typename
    }
  }
}
    `;

/**
 * __useTeamsPageQuery__
 *
 * To run a query within a React component, call `useTeamsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsPageQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useTeamsPageQuery(baseOptions?: Apollo.QueryHookOptions<TeamsPageQuery, TeamsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsPageQuery, TeamsPageQueryVariables>(TeamsPageDocument, options);
      }
export function useTeamsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsPageQuery, TeamsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsPageQuery, TeamsPageQueryVariables>(TeamsPageDocument, options);
        }
export type TeamsPageQueryHookResult = ReturnType<typeof useTeamsPageQuery>;
export type TeamsPageLazyQueryHookResult = ReturnType<typeof useTeamsPageLazyQuery>;
export type TeamsPageQueryResult = Apollo.QueryResult<TeamsPageQuery, TeamsPageQueryVariables>;