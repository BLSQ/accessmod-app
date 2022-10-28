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
  JSON: any;
  MovingSpeeds: any;
  SimplifiedExtentType: any;
  StackPriorities: any;
  TimeThresholds: any;
  URL: any;
};

export type AccessmodAccessRequest = {
  __typename?: 'AccessmodAccessRequest';
  acceptedTos: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  status: AccessmodAccessRequestStatus;
  updatedAt: Scalars['DateTime'];
};

export type AccessmodAccessRequestPage = {
  __typename?: 'AccessmodAccessRequestPage';
  items: Array<AccessmodAccessRequest>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum AccessmodAccessRequestStatus {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  Pending = 'PENDING'
}

export type AccessmodAccessibilityAnalysis = AccessmodAnalysis & AccessmodOwnership & {
  __typename?: 'AccessmodAccessibilityAnalysis';
  algorithm?: Maybe<AccessmodAccessibilityAnalysisAlgorithm>;
  author: User;
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: Array<AccessmodAnalysisAuthorizedActions>;
  barrier?: Maybe<AccessmodFileset>;
  createdAt: Scalars['DateTime'];
  dem?: Maybe<AccessmodFileset>;
  frictionSurface?: Maybe<AccessmodFileset>;
  healthFacilities?: Maybe<AccessmodFileset>;
  id: Scalars['String'];
  invertDirection?: Maybe<Scalars['Boolean']>;
  knightMove?: Maybe<Scalars['Boolean']>;
  landCover?: Maybe<AccessmodFileset>;
  maxTravelTime?: Maybe<Scalars['Int']>;
  movingSpeeds?: Maybe<Scalars['MovingSpeeds']>;
  name: Scalars['String'];
  owner?: Maybe<AccessmodOwner>;
  permissions: AccessmodAnalysisPermissions;
  stack?: Maybe<AccessmodFileset>;
  stackPriorities?: Maybe<Scalars['StackPriorities']>;
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
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: Array<AccessmodAnalysisAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  permissions: AccessmodAnalysisPermissions;
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

export type AccessmodAnalysisPermissions = {
  __typename?: 'AccessmodAnalysisPermissions';
  delete: Scalars['Boolean'];
  run: Scalars['Boolean'];
  update: Scalars['Boolean'];
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
  GeographicCoverage = 'GEOGRAPHIC_COVERAGE',
  ZonalStatistics = 'ZONAL_STATISTICS'
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

export type AccessmodFileset = AccessmodOwnership & {
  __typename?: 'AccessmodFileset';
  author: User;
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: Array<AccessmodFilesetAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  files: Array<AccessmodFile>;
  id: Scalars['String'];
  metadata: Scalars['AccessmodFilesetMetadata'];
  mode: AccessmodFilesetMode;
  name: Scalars['String'];
  owner?: Maybe<AccessmodOwner>;
  permissions: AccessmodFilesetPermissions;
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

export enum AccessmodFilesetMode {
  AutomaticAcquisition = 'AUTOMATIC_ACQUISITION',
  UserInput = 'USER_INPUT'
}

export type AccessmodFilesetPage = {
  __typename?: 'AccessmodFilesetPage';
  items: Array<AccessmodFileset>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type AccessmodFilesetPermissions = {
  __typename?: 'AccessmodFilesetPermissions';
  createFile: Scalars['Boolean'];
  delete: Scalars['Boolean'];
  update: Scalars['Boolean'];
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
  Boundaries = 'BOUNDARIES',
  Coverage = 'COVERAGE',
  Dem = 'DEM',
  FrictionSurface = 'FRICTION_SURFACE',
  Geometry = 'GEOMETRY',
  HealthFacilities = 'HEALTH_FACILITIES',
  LandCover = 'LAND_COVER',
  Population = 'POPULATION',
  Stack = 'STACK',
  TransportNetwork = 'TRANSPORT_NETWORK',
  TravelTimes = 'TRAVEL_TIMES',
  Water = 'WATER',
  ZonalStatistics = 'ZONAL_STATISTICS',
  ZonalStatisticsTable = 'ZONAL_STATISTICS_TABLE'
}

export enum AccessmodFilesetStatus {
  Invalid = 'INVALID',
  Pending = 'PENDING',
  ToAcquire = 'TO_ACQUIRE',
  Valid = 'VALID',
  Validating = 'VALIDATING'
}

export type AccessmodGeographicCoverageAnalysis = AccessmodAnalysis & AccessmodOwnership & {
  __typename?: 'AccessmodGeographicCoverageAnalysis';
  anisotropic?: Maybe<Scalars['Boolean']>;
  author: User;
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
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
  owner?: Maybe<AccessmodOwner>;
  permissions: AccessmodAnalysisPermissions;
  population?: Maybe<AccessmodFileset>;
  status: AccessmodAnalysisStatus;
  type: AccessmodAnalysisType;
  updatedAt: Scalars['DateTime'];
};

export type AccessmodOwner = Team | User;

export type AccessmodOwnership = {
  owner?: Maybe<AccessmodOwner>;
};

export type AccessmodProject = AccessmodOwnership & {
  __typename?: 'AccessmodProject';
  author: User;
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: Array<AccessmodProjectAuthorizedActions>;
  country: Country;
  createdAt: Scalars['DateTime'];
  crs: Scalars['Int'];
  dem?: Maybe<AccessmodFileset>;
  description: Scalars['String'];
  extent?: Maybe<Array<Array<Scalars['Float']>>>;
  id: Scalars['String'];
  members: Array<AccessmodProjectMember>;
  name: Scalars['String'];
  owner?: Maybe<AccessmodOwner>;
  permissions: AccessmodProjectPermissions;
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

export type AccessmodProjectMember = {
  __typename?: 'AccessmodProjectMember';
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: Array<AccessmodProjectPermissionAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  mode: PermissionMode;
  permissions: AccessmodProjectMemberPermissions;
  project: AccessmodProject;
  team?: Maybe<Team>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type AccessmodProjectMemberPermissions = {
  __typename?: 'AccessmodProjectMemberPermissions';
  delete: Scalars['Boolean'];
  update: Scalars['Boolean'];
};

export enum AccessmodProjectOrder {
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type AccessmodProjectPage = {
  __typename?: 'AccessmodProjectPage';
  items: Array<AccessmodProject>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum AccessmodProjectPermissionAuthorizedActions {
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type AccessmodProjectPermissions = {
  __typename?: 'AccessmodProjectPermissions';
  createAnalysis: Scalars['Boolean'];
  createFileset: Scalars['Boolean'];
  createMember: Scalars['Boolean'];
  createPermission: Scalars['Boolean'];
  delete: Scalars['Boolean'];
  update: Scalars['Boolean'];
};

export type AccessmodZonalStatistics = AccessmodAnalysis & AccessmodOwnership & {
  __typename?: 'AccessmodZonalStatistics';
  author: User;
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: Array<AccessmodAnalysisAuthorizedActions>;
  boundaries?: Maybe<AccessmodFileset>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner?: Maybe<AccessmodOwner>;
  permissions: AccessmodAnalysisPermissions;
  population?: Maybe<AccessmodFileset>;
  status: AccessmodAnalysisStatus;
  timeThresholds?: Maybe<Scalars['TimeThresholds']>;
  travelTimes?: Maybe<AccessmodFileset>;
  type: AccessmodAnalysisType;
  updatedAt: Scalars['DateTime'];
  zonalStatisticsGeo?: Maybe<AccessmodFileset>;
  zonalStatisticsTable?: Maybe<AccessmodFileset>;
};

export enum ApproveAccessmodAccessRequestError {
  Invalid = 'INVALID'
}

export type ApproveAccessmodAccessRequestInput = {
  id: Scalars['String'];
};

export type ApproveAccessmodAccessRequestResult = {
  __typename?: 'ApproveAccessmodAccessRequestResult';
  errors: Array<ApproveAccessmodAccessRequestError>;
  success: Scalars['Boolean'];
};

export type Avatar = {
  __typename?: 'Avatar';
  color: Scalars['String'];
  initials: Scalars['String'];
};

export type CatalogEntry = {
  __typename?: 'CatalogEntry';
  countries: Array<Country>;
  datasource?: Maybe<Datasource>;
  description?: Maybe<Scalars['String']>;
  externalDescription?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  externalName?: Maybe<Scalars['String']>;
  externalSubtype?: Maybe<Scalars['String']>;
  externalType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastSyncedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  objectId: Scalars['String'];
  objectUrl: Scalars['URL'];
  symbol?: Maybe<Scalars['URL']>;
  type: CatalogEntryType;
};

export type CatalogEntryType = {
  __typename?: 'CatalogEntryType';
  app: Scalars['String'];
  id: Scalars['String'];
  model: Scalars['String'];
  name: Scalars['String'];
};

export type CatalogPage = {
  __typename?: 'CatalogPage';
  items: Array<CatalogEntry>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Collection = {
  __typename?: 'Collection';
  author?: Maybe<User>;
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: CollectionAuthorizedActions;
  countries: Array<Country>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  elements: CollectionElementPage;
  id: Scalars['String'];
  name: Scalars['String'];
  permissions: CollectionPermissions;
  summary?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime'];
};


export type CollectionElementsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type CollectionAuthorizedActions = {
  __typename?: 'CollectionAuthorizedActions';
  canDelete: Scalars['Boolean'];
  canUpdate: Scalars['Boolean'];
};

export type CollectionElement = {
  __typename?: 'CollectionElement';
  app: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  model: Scalars['String'];
  name: Scalars['String'];
  objectId: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['URL']>;
};

export type CollectionElementPage = {
  __typename?: 'CollectionElementPage';
  items: Array<CollectionElement>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type CollectionPage = {
  __typename?: 'CollectionPage';
  items: Array<Collection>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type CollectionPermissions = {
  __typename?: 'CollectionPermissions';
  delete: Scalars['Boolean'];
  update: Scalars['Boolean'];
};

export type Country = {
  __typename?: 'Country';
  alpha3: Scalars['String'];
  code: Scalars['String'];
  flag: Scalars['String'];
  name: Scalars['String'];
  whoInfo: WhoInfo;
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
  automatic?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Scalars['AccessmodFilesetMetadata']>;
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
  extent?: InputMaybe<Array<Array<Scalars['Float']>>>;
  name: Scalars['String'];
  spatialResolution: Scalars['Int'];
};

export enum CreateAccessmodProjectMemberError {
  AlreadyExists = 'ALREADY_EXISTS',
  NotFound = 'NOT_FOUND',
  NotImplemented = 'NOT_IMPLEMENTED',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type CreateAccessmodProjectMemberInput = {
  mode: PermissionMode;
  projectId: Scalars['String'];
  teamId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateAccessmodProjectMemberResult = {
  __typename?: 'CreateAccessmodProjectMemberResult';
  errors: Array<CreateAccessmodProjectMemberError>;
  member?: Maybe<AccessmodProjectMember>;
  success: Scalars['Boolean'];
};

export type CreateAccessmodProjectResult = {
  __typename?: 'CreateAccessmodProjectResult';
  errors: Array<CreateAccessmodProjectError>;
  project?: Maybe<AccessmodProject>;
  success: Scalars['Boolean'];
};

export enum CreateAccessmodZonalStatisticsError {
  NameDuplicate = 'NAME_DUPLICATE'
}

export type CreateAccessmodZonalStatisticsInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type CreateAccessmodZonalStatisticsResult = {
  __typename?: 'CreateAccessmodZonalStatisticsResult';
  analysis?: Maybe<AccessmodZonalStatistics>;
  errors: Array<CreateAccessmodZonalStatisticsError>;
  success: Scalars['Boolean'];
};

export enum CreateCollectionElementError {
  CollectionNotFound = 'COLLECTION_NOT_FOUND',
  Invalid = 'INVALID',
  ObjectNotFound = 'OBJECT_NOT_FOUND'
}

export type CreateCollectionElementInput = {
  app: Scalars['String'];
  collectionId: Scalars['String'];
  model: Scalars['String'];
  objectId: Scalars['String'];
};

export type CreateCollectionElementResult = {
  __typename?: 'CreateCollectionElementResult';
  element?: Maybe<CollectionElement>;
  errors: Array<CreateCollectionElementError>;
  success: Scalars['Boolean'];
};

export enum CreateCollectionError {
  Invalid = 'INVALID'
}

export type CreateCollectionInput = {
  authorId?: InputMaybe<Scalars['String']>;
  countries?: InputMaybe<Array<CountryInput>>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  summary?: InputMaybe<Scalars['String']>;
  tagIds?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateCollectionResult = {
  __typename?: 'CreateCollectionResult';
  collection?: Maybe<Collection>;
  errors: Array<CreateCollectionError>;
  success: Scalars['Boolean'];
};

export enum CreateMembershipError {
  AlreadyExists = 'ALREADY_EXISTS',
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

export type Dag = {
  __typename?: 'DAG';
  countries: Array<Country>;
  description?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
  externalUrl?: Maybe<Scalars['URL']>;
  formCode?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  label: Scalars['String'];
  runs: DagRunPage;
  schedule?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
  template: DagTemplate;
  user?: Maybe<User>;
};


export type DagRunsArgs = {
  orderBy?: InputMaybe<DagRunOrderBy>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type DagPage = {
  __typename?: 'DAGPage';
  items: Array<Dag>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type DagRun = {
  __typename?: 'DAGRun';
  config?: Maybe<Scalars['JSON']>;
  duration?: Maybe<Scalars['Int']>;
  executionDate?: Maybe<Scalars['DateTime']>;
  externalId?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['URL']>;
  id: Scalars['String'];
  isFavorite: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  lastRefreshedAt?: Maybe<Scalars['DateTime']>;
  logs?: Maybe<Scalars['String']>;
  messages: Array<DagRunMessage>;
  outputs: Array<DagRunOutput>;
  progress: Scalars['Int'];
  status: DagRunStatus;
  triggerMode?: Maybe<DagRunTrigger>;
  user?: Maybe<User>;
};

export type DagRunMessage = {
  __typename?: 'DAGRunMessage';
  message: Scalars['String'];
  priority: Scalars['String'];
  timestamp?: Maybe<Scalars['DateTime']>;
};

export enum DagRunOrderBy {
  ExecutionDateAsc = 'EXECUTION_DATE_ASC',
  ExecutionDateDesc = 'EXECUTION_DATE_DESC'
}

export type DagRunOutput = {
  __typename?: 'DAGRunOutput';
  title: Scalars['String'];
  uri: Scalars['String'];
};

export type DagRunPage = {
  __typename?: 'DAGRunPage';
  items: Array<DagRun>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum DagRunStatus {
  Failed = 'failed',
  Queued = 'queued',
  Running = 'running',
  Success = 'success'
}

export enum DagRunTrigger {
  Manual = 'MANUAL',
  Scheduled = 'SCHEDULED'
}

export type DagTemplate = {
  __typename?: 'DAGTemplate';
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  sampleConfig?: Maybe<Scalars['JSON']>;
};

export type Dhis2DataElement = {
  __typename?: 'DHIS2DataElement';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  instance: Dhis2Instance;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Dhis2DataElementPage = {
  __typename?: 'DHIS2DataElementPage';
  items: Array<Dhis2DataElement>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Dhis2Instance = {
  __typename?: 'DHIS2Instance';
  id: Scalars['String'];
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type Datasource = {
  __typename?: 'Datasource';
  id: Scalars['String'];
  name: Scalars['String'];
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

export enum DeleteAccessmodFilesetError {
  FilesetInUse = 'FILESET_IN_USE',
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

export enum DeleteAccessmodProjectMemberError {
  NotFound = 'NOT_FOUND',
  NotImplemented = 'NOT_IMPLEMENTED',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type DeleteAccessmodProjectMemberInput = {
  id: Scalars['String'];
};

export type DeleteAccessmodProjectMemberResult = {
  __typename?: 'DeleteAccessmodProjectMemberResult';
  errors: Array<DeleteAccessmodProjectMemberError>;
  success: Scalars['Boolean'];
};

export type DeleteAccessmodProjectResult = {
  __typename?: 'DeleteAccessmodProjectResult';
  errors: Array<DeleteAccessmodProjectError>;
  success: Scalars['Boolean'];
};

export enum DeleteCollectionElementError {
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND'
}

export type DeleteCollectionElementInput = {
  id: Scalars['String'];
};

export type DeleteCollectionElementResult = {
  __typename?: 'DeleteCollectionElementResult';
  collection?: Maybe<Collection>;
  errors: Array<DeleteCollectionElementError>;
  success: Scalars['Boolean'];
};

export enum DeleteCollectionError {
  Invalid = 'INVALID'
}

export type DeleteCollectionInput = {
  id: Scalars['String'];
};

export type DeleteCollectionResult = {
  __typename?: 'DeleteCollectionResult';
  errors: Array<DeleteCollectionError>;
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

export enum DenyAccessmodAccessRequestError {
  Invalid = 'INVALID'
}

export type DenyAccessmodAccessRequestInput = {
  id: Scalars['String'];
};

export type DenyAccessmodAccessRequestResult = {
  __typename?: 'DenyAccessmodAccessRequestResult';
  errors: Array<DenyAccessmodAccessRequestError>;
  success: Scalars['Boolean'];
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  code: Scalars['String'];
  config: Scalars['JSON'];
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
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: Array<MeAuthorizedActions>;
  features: Array<FeatureFlag>;
  permissions: MePermissions;
  user?: Maybe<User>;
};

export enum MeAuthorizedActions {
  AdminPanel = 'ADMIN_PANEL',
  CreateAccessmodProject = 'CREATE_ACCESSMOD_PROJECT',
  CreateTeam = 'CREATE_TEAM',
  ManageAccessmodAccessRequests = 'MANAGE_ACCESSMOD_ACCESS_REQUESTS',
  SuperUser = 'SUPER_USER'
}

export type MePermissions = {
  __typename?: 'MePermissions';
  adminPanel: Scalars['Boolean'];
  createAccessmodProject: Scalars['Boolean'];
  createCollection: Scalars['Boolean'];
  createTeam: Scalars['Boolean'];
  manageAccessmodAccessRequests: Scalars['Boolean'];
  superUser: Scalars['Boolean'];
};

export type Membership = {
  __typename?: 'Membership';
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: Array<MembershipAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  permissions: MembershipPermissions;
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

export type MembershipPermissions = {
  __typename?: 'MembershipPermissions';
  delete: Scalars['Boolean'];
  update: Scalars['Boolean'];
};

export enum MembershipRole {
  Admin = 'ADMIN',
  Regular = 'REGULAR'
}

export type Mutation = {
  __typename?: 'Mutation';
  approveAccessmodAccessRequest: ApproveAccessmodAccessRequestResult;
  createAccessmodAccessibilityAnalysis: CreateAccessmodAccessibilityAnalysisResult;
  createAccessmodFile: CreateAccessmodFileResult;
  createAccessmodFileset: CreateAccessmodFilesetResult;
  createAccessmodProject: CreateAccessmodProjectResult;
  createAccessmodProjectMember: CreateAccessmodProjectMemberResult;
  createAccessmodZonalStatistics: CreateAccessmodZonalStatisticsResult;
  createCollection: CreateCollectionResult;
  createCollectionElement: CreateCollectionElementResult;
  createMembership: CreateMembershipResult;
  createTeam: CreateTeamResult;
  deleteAccessmodAnalysis: DeleteAccessmodAnalysisResult;
  deleteAccessmodFileset: DeleteAccessmodFilesetResult;
  deleteAccessmodProject: DeleteAccessmodProjectResult;
  deleteAccessmodProjectMember: DeleteAccessmodProjectMemberResult;
  deleteCollection: DeleteCollectionResult;
  deleteCollectionElement: DeleteCollectionElementResult;
  deleteMembership: DeleteMembershipResult;
  deleteTeam: DeleteTeamResult;
  denyAccessmodAccessRequest: DenyAccessmodAccessRequestResult;
  launchAccessmodAnalysis: LaunchAccessmodAnalysisResult;
  login: LoginResult;
  logout: LogoutResult;
  prepareAccessmodFileDownload: PrepareAccessmodFileDownloadResult;
  prepareAccessmodFileUpload: PrepareAccessmodFileUploadResult;
  prepareAccessmodFilesetVisualizationDownload: PrepareAccessmodFilesetVisualizationDownloadResult;
  prepareDownloadURL?: Maybe<PrepareDownloadUrlResult>;
  requestAccessmodAccess: RequestAccessmodAccessInputResult;
  resetPassword: ResetPasswordResult;
  runDAG: RunDagResult;
  setDAGRunFavorite?: Maybe<SetDagRunFavoriteResult>;
  setPassword: SetPasswordResult;
  updateAccessmodAccessibilityAnalysis: UpdateAccessmodAccessibilityAnalysisResult;
  updateAccessmodFileset: UpdateAccessmodFilesetResult;
  updateAccessmodProject: UpdateAccessmodProjectResult;
  updateAccessmodProjectMember: UpdateAccessmodProjectMemberResult;
  updateAccessmodZonalStatistics: UpdateAccessmodZonalStatisticsResult;
  updateCollection: UpdateCollectionResult;
  updateDAG: UpdateDagResult;
  updateMembership: UpdateMembershipResult;
  updateTeam: UpdateTeamResult;
};


export type MutationApproveAccessmodAccessRequestArgs = {
  input: ApproveAccessmodAccessRequestInput;
};


export type MutationCreateAccessmodAccessibilityAnalysisArgs = {
  input?: InputMaybe<CreateAccessmodAccessibilityAnalysisInput>;
};


export type MutationCreateAccessmodFileArgs = {
  input: CreateAccessmodFileInput;
};


export type MutationCreateAccessmodFilesetArgs = {
  input: CreateAccessmodFilesetInput;
};


export type MutationCreateAccessmodProjectArgs = {
  input: CreateAccessmodProjectInput;
};


export type MutationCreateAccessmodProjectMemberArgs = {
  input: CreateAccessmodProjectMemberInput;
};


export type MutationCreateAccessmodZonalStatisticsArgs = {
  input?: InputMaybe<CreateAccessmodZonalStatisticsInput>;
};


export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationCreateCollectionElementArgs = {
  input: CreateCollectionElementInput;
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


export type MutationDeleteAccessmodFilesetArgs = {
  input: DeleteAccessmodFilesetInput;
};


export type MutationDeleteAccessmodProjectArgs = {
  input: DeleteAccessmodProjectInput;
};


export type MutationDeleteAccessmodProjectMemberArgs = {
  input: DeleteAccessmodProjectMemberInput;
};


export type MutationDeleteCollectionArgs = {
  input: DeleteCollectionInput;
};


export type MutationDeleteCollectionElementArgs = {
  input: DeleteCollectionElementInput;
};


export type MutationDeleteMembershipArgs = {
  input: DeleteMembershipInput;
};


export type MutationDeleteTeamArgs = {
  input: DeleteTeamInput;
};


export type MutationDenyAccessmodAccessRequestArgs = {
  input: DenyAccessmodAccessRequestInput;
};


export type MutationLaunchAccessmodAnalysisArgs = {
  input?: InputMaybe<LaunchAccessmodAnalysisInput>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPrepareAccessmodFileDownloadArgs = {
  input: PrepareAccessmodFileDownloadInput;
};


export type MutationPrepareAccessmodFileUploadArgs = {
  input: PrepareAccessmodFileUploadInput;
};


export type MutationPrepareAccessmodFilesetVisualizationDownloadArgs = {
  input: PrepareAccessmodFilesetVisualizationDownloadInput;
};


export type MutationPrepareDownloadUrlArgs = {
  input: PrepareDownloadUrlInput;
};


export type MutationRequestAccessmodAccessArgs = {
  input: RequestAccessmodAccessInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationRunDagArgs = {
  input: RunDagInput;
};


export type MutationSetDagRunFavoriteArgs = {
  input: SetDagRunFavoriteInput;
};


export type MutationSetPasswordArgs = {
  input: SetPasswordInput;
};


export type MutationUpdateAccessmodAccessibilityAnalysisArgs = {
  input?: InputMaybe<UpdateAccessmodAccessibilityAnalysisInput>;
};


export type MutationUpdateAccessmodFilesetArgs = {
  input: UpdateAccessmodFilesetInput;
};


export type MutationUpdateAccessmodProjectArgs = {
  input: UpdateAccessmodProjectInput;
};


export type MutationUpdateAccessmodProjectMemberArgs = {
  input: UpdateAccessmodProjectMemberInput;
};


export type MutationUpdateAccessmodZonalStatisticsArgs = {
  input?: InputMaybe<UpdateAccessmodZonalStatisticsInput>;
};


export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};


export type MutationUpdateDagArgs = {
  input: UpdateDagInput;
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

export type PrepareAccessmodFilesetVisualizationDownloadInput = {
  id: Scalars['String'];
};

export type PrepareAccessmodFilesetVisualizationDownloadResult = {
  __typename?: 'PrepareAccessmodFilesetVisualizationDownloadResult';
  success: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
};

export type PrepareDownloadUrlInput = {
  uri: Scalars['URL'];
};

export type PrepareDownloadUrlResult = {
  __typename?: 'PrepareDownloadURLResult';
  success: Scalars['Boolean'];
  url?: Maybe<Scalars['URL']>;
};

export type Query = {
  __typename?: 'Query';
  accessmodAccessRequests: AccessmodAccessRequestPage;
  accessmodAnalyses: AccessmodAnalysisPage;
  accessmodAnalysis?: Maybe<AccessmodAnalysis>;
  accessmodFileset?: Maybe<AccessmodFileset>;
  accessmodFilesetRole?: Maybe<AccessmodFilesetRole>;
  accessmodFilesetRoles: Array<AccessmodFilesetRole>;
  accessmodFilesets: AccessmodFilesetPage;
  accessmodProject?: Maybe<AccessmodProject>;
  accessmodProjects: AccessmodProjectPage;
  boundaries: Array<WhoBoundary>;
  catalog: CatalogPage;
  collection?: Maybe<Collection>;
  collections: CollectionPage;
  countries: Array<Country>;
  country?: Maybe<Country>;
  dag?: Maybe<Dag>;
  dagRun?: Maybe<DagRun>;
  dags: DagPage;
  me: Me;
  organizations: Array<Organization>;
  search: SearchQueryResult;
  team?: Maybe<Team>;
  teams: TeamPage;
};


export type QueryAccessmodAccessRequestsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
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
  mode?: InputMaybe<AccessmodFilesetMode>;
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
  orderBy?: InputMaybe<AccessmodProjectOrder>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  teams?: InputMaybe<Array<Scalars['String']>>;
  term?: InputMaybe<Scalars['String']>;
};


export type QueryBoundariesArgs = {
  country_code: Scalars['String'];
  level: Scalars['String'];
};


export type QueryCatalogArgs = {
  page?: InputMaybe<Scalars['Int']>;
  path?: InputMaybe<Scalars['String']>;
  perPage?: InputMaybe<Scalars['Int']>;
};


export type QueryCollectionArgs = {
  id: Scalars['String'];
};


export type QueryCollectionsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};


export type QueryCountryArgs = {
  alpha3?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
};


export type QueryDagArgs = {
  id: Scalars['String'];
};


export type QueryDagRunArgs = {
  id: Scalars['String'];
};


export type QueryDagsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchArgs = {
  datasourceIds?: InputMaybe<Array<Scalars['String']>>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};


export type QueryTeamsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  term?: InputMaybe<Scalars['String']>;
};

export enum RequestAccessmodAccessError {
  AlreadyExists = 'ALREADY_EXISTS',
  Invalid = 'INVALID',
  MustAcceptTos = 'MUST_ACCEPT_TOS'
}

export type RequestAccessmodAccessInput = {
  acceptTos: Scalars['Boolean'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type RequestAccessmodAccessInputResult = {
  __typename?: 'RequestAccessmodAccessInputResult';
  errors: Array<RequestAccessmodAccessError>;
  success: Scalars['Boolean'];
};

export type ResetPasswordInput = {
  email: Scalars['String'];
};

export type ResetPasswordResult = {
  __typename?: 'ResetPasswordResult';
  success: Scalars['Boolean'];
};

export enum RunDagError {
  DagNotFound = 'DAG_NOT_FOUND',
  InvalidConfig = 'INVALID_CONFIG'
}

export type RunDagInput = {
  config: Scalars['JSON'];
  dagId: Scalars['String'];
};

export type RunDagResult = {
  __typename?: 'RunDAGResult';
  dag?: Maybe<Dag>;
  dagRun?: Maybe<DagRun>;
  errors: Array<RunDagError>;
  success: Scalars['Boolean'];
};

export type S3Bucket = {
  __typename?: 'S3Bucket';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type S3Object = {
  __typename?: 'S3Object';
  bucket: S3Bucket;
  collections: Array<Collection>;
  createdAt: Scalars['DateTime'];
  etag: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  key: Scalars['String'];
  lastModified: Scalars['DateTime'];
  parentKey: Scalars['String'];
  size: Scalars['Int'];
  storageClass: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type S3ObjectPage = {
  __typename?: 'S3ObjectPage';
  items: Array<S3Object>;
  pageNumber: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SearchQueryResult = {
  __typename?: 'SearchQueryResult';
  results: Array<SearchResult>;
  types: Array<SearchType>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  object: SearchResultObject;
  rank: Scalars['Float'];
};

export type SearchResultObject = CatalogEntry | Collection;

export type SearchType = {
  __typename?: 'SearchType';
  label: Scalars['String'];
  value: Scalars['String'];
};

export enum SetDagRunFavoriteError {
  Invalid = 'INVALID',
  MissingLabel = 'MISSING_LABEL',
  NotFound = 'NOT_FOUND'
}

export type SetDagRunFavoriteInput = {
  id: Scalars['String'];
  isFavorite: Scalars['Boolean'];
  label?: InputMaybe<Scalars['String']>;
};

export type SetDagRunFavoriteResult = {
  __typename?: 'SetDAGRunFavoriteResult';
  dagRun?: Maybe<DagRun>;
  errors: Array<SetDagRunFavoriteError>;
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

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  /** @deprecated authorizedActions is deprecated. Use permissions instead. */
  authorizedActions: Array<TeamAuthorizedActions>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  memberships: MembershipPage;
  name: Scalars['String'];
  permissions: TeamPermissions;
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

export type TeamPermissions = {
  __typename?: 'TeamPermissions';
  createMembership: Scalars['Boolean'];
  delete: Scalars['Boolean'];
  update: Scalars['Boolean'];
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
  maxTravelTime?: InputMaybe<Scalars['Int']>;
  movingSpeeds?: InputMaybe<Scalars['MovingSpeeds']>;
  name?: InputMaybe<Scalars['String']>;
  stackId?: InputMaybe<Scalars['String']>;
  stackPriorities?: InputMaybe<Scalars['StackPriorities']>;
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

export enum UpdateAccessmodFilesetError {
  NameDuplicate = 'NAME_DUPLICATE',
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type UpdateAccessmodFilesetInput = {
  id: Scalars['String'];
  metadata?: InputMaybe<Scalars['AccessmodFilesetMetadata']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateAccessmodFilesetResult = {
  __typename?: 'UpdateAccessmodFilesetResult';
  errors: Array<UpdateAccessmodFilesetError>;
  fileset?: Maybe<AccessmodFileset>;
  success: Scalars['Boolean'];
};

export enum UpdateAccessmodProjectError {
  NameDuplicate = 'NAME_DUPLICATE',
  NotFound = 'NOT_FOUND',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type UpdateAccessmodProjectInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export enum UpdateAccessmodProjectMemberError {
  NotFound = 'NOT_FOUND',
  NotImplemented = 'NOT_IMPLEMENTED',
  PermissionDenied = 'PERMISSION_DENIED'
}

export type UpdateAccessmodProjectMemberInput = {
  id: Scalars['String'];
  mode: PermissionMode;
};

export type UpdateAccessmodProjectMemberResult = {
  __typename?: 'UpdateAccessmodProjectMemberResult';
  errors: Array<UpdateAccessmodProjectMemberError>;
  member?: Maybe<AccessmodProjectMember>;
  success: Scalars['Boolean'];
};

export type UpdateAccessmodProjectResult = {
  __typename?: 'UpdateAccessmodProjectResult';
  errors: Array<UpdateAccessmodProjectError>;
  project?: Maybe<AccessmodProject>;
  success: Scalars['Boolean'];
};

export enum UpdateAccessmodZonalStatisticsError {
  NameDuplicate = 'NAME_DUPLICATE',
  NotFound = 'NOT_FOUND'
}

export type UpdateAccessmodZonalStatisticsInput = {
  boundariesId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  populationId?: InputMaybe<Scalars['String']>;
  timeThresholds?: InputMaybe<Scalars['TimeThresholds']>;
  travelTimesId?: InputMaybe<Scalars['String']>;
};

export type UpdateAccessmodZonalStatisticsResult = {
  __typename?: 'UpdateAccessmodZonalStatisticsResult';
  analysis?: Maybe<AccessmodZonalStatistics>;
  errors: Array<UpdateAccessmodZonalStatisticsError>;
  success: Scalars['Boolean'];
};

export enum UpdateCollectionError {
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND'
}

export type UpdateCollectionInput = {
  authorId?: InputMaybe<Scalars['String']>;
  countries?: InputMaybe<Array<CountryInput>>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  tagIds?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateCollectionResult = {
  __typename?: 'UpdateCollectionResult';
  collection?: Maybe<Collection>;
  errors: Array<CreateCollectionError>;
  success: Scalars['Boolean'];
};

export enum UpdateDagError {
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND'
}

export type UpdateDagInput = {
  countries?: InputMaybe<Array<CountryInput>>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  schedule?: InputMaybe<Scalars['String']>;
};

export type UpdateDagResult = {
  __typename?: 'UpdateDAGResult';
  dag?: Maybe<Dag>;
  errors: Array<UpdateDagError>;
  success: Scalars['Boolean'];
};

export enum UpdateMembershipError {
  InvalidRole = 'INVALID_ROLE',
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
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
};

export type WhoBoundary = {
  __typename?: 'WHOBoundary';
  administrative_level: Scalars['Int'];
  country: Country;
  extent: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
};

export type WhoInfo = {
  __typename?: 'WHOInfo';
  defaultCRS: Scalars['Int'];
  region?: Maybe<WhoRegion>;
  simplifiedExtent?: Maybe<Scalars['SimplifiedExtentType']>;
};

export type WhoRegion = {
  __typename?: 'WHORegion';
  code: Scalars['String'];
  name: Scalars['String'];
};

export type HeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type HeaderQuery = { __typename?: 'Query', me: { __typename?: 'Me', permissions: { __typename?: 'MePermissions', createAccessmodProject: boolean, manageAccessmodAccessRequests: boolean }, user?: { __typename?: 'User', avatar: { __typename?: 'Avatar', initials: string, color: string } } | null }, teams: { __typename?: 'TeamPage', items: Array<{ __typename?: 'Team', id: string, name: string }> }, projects: { __typename?: 'AccessmodProjectPage', items: Array<{ __typename?: 'AccessmodProject', id: string, name: string }> } };

export type Navbar_NavbarFragment = { __typename?: 'Query', teams: { __typename?: 'TeamPage', items: Array<{ __typename?: 'Team', id: string, name: string }> }, projects: { __typename?: 'AccessmodProjectPage', items: Array<{ __typename?: 'AccessmodProject', id: string, name: string }> } };

export type UserMenu_MeFragment = { __typename?: 'Me', permissions: { __typename?: 'MePermissions', manageAccessmodAccessRequests: boolean }, user?: { __typename?: 'User', avatar: { __typename?: 'Avatar', initials: string, color: string } } | null };

export type CreateAnalysisDialog_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type CreateAnalysisTrigger_ProjectFragment = { __typename?: 'AccessmodProject', id: string, permissions: { __typename?: 'AccessmodProjectPermissions', createAnalysis: boolean } };

export type FilesetRolePickerQueryVariables = Exact<{ [key: string]: never; }>;


export type FilesetRolePickerQuery = { __typename?: 'Query', accessmodFilesetRoles: Array<{ __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, createdAt: any, updatedAt: any }> };

export type CreateMembershipMutationVariables = Exact<{
  input: CreateMembershipInput;
}>;


export type CreateMembershipMutation = { __typename?: 'Mutation', createMembership: { __typename?: 'CreateMembershipResult', success: boolean, errors: Array<CreateMembershipError> } };

export type InviteTeamMemberDialog_TeamFragment = { __typename?: 'Team', id: string, name: string };

export type InviteTeamMemberTrigger_TeamFragment = { __typename?: 'Team', id: string, name: string, permissions: { __typename?: 'TeamPermissions', createMembership: boolean } };

export type UpdateMembershipMutationVariables = Exact<{
  input: UpdateMembershipInput;
}>;


export type UpdateMembershipMutation = { __typename?: 'Mutation', updateMembership: { __typename?: 'UpdateMembershipResult', success: boolean, errors: Array<UpdateMembershipError>, membership?: { __typename?: 'Membership', id: string, role: MembershipRole } | null } };

export type TeamMembersTable_TeamFragment = { __typename?: 'Team', id: string };

export type TeamMembersTableQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type TeamMembersTableQuery = { __typename?: 'Query', team?: { __typename?: 'Team', memberships: { __typename?: 'MembershipPage', totalItems: number, totalPages: number, pageNumber: number, items: Array<{ __typename?: 'Membership', id: string, createdAt: any, updatedAt: any, role: MembershipRole, permissions: { __typename?: 'MembershipPermissions', update: boolean, delete: boolean }, user: { __typename?: 'User', firstName?: string | null, lastName?: string | null, displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } }, team: { __typename?: 'Team', id: string, name: string } }> } } | null };

export type User_UserFragment = { __typename?: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } };

export type ApproveAccessRequestMutationVariables = Exact<{
  input: ApproveAccessmodAccessRequestInput;
}>;


export type ApproveAccessRequestMutation = { __typename?: 'Mutation', approveAccessmodAccessRequest: { __typename?: 'ApproveAccessmodAccessRequestResult', success: boolean, errors: Array<ApproveAccessmodAccessRequestError> } };

export type DenyAccessmodAccessRequestMutationVariables = Exact<{
  input: DenyAccessmodAccessRequestInput;
}>;


export type DenyAccessmodAccessRequestMutation = { __typename?: 'Mutation', denyAccessmodAccessRequest: { __typename?: 'DenyAccessmodAccessRequestResult', success: boolean, errors: Array<DenyAccessmodAccessRequestError> } };

export type AccessRequestsTableQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type AccessRequestsTableQuery = { __typename?: 'Query', accessRequests: { __typename?: 'AccessmodAccessRequestPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename?: 'AccessmodAccessRequest', id: string, firstName: string, lastName: string, acceptedTos: boolean, email: string, status: AccessmodAccessRequestStatus, createdAt: any, updatedAt: any }> } };

export type AccessibilityAnalysisForm_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', createFileset: boolean } };

export type AccessibilityAnalysisForm_AnalysisFragment = { __typename: 'AccessmodAccessibilityAnalysis', id: string, name: string, movingSpeeds?: any | null, type: AccessmodAnalysisType, waterAllTouched?: boolean | null, stackPriorities?: any | null, knightMove?: boolean | null, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, invertDirection?: boolean | null, maxTravelTime?: number | null, status: AccessmodAnalysisStatus, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, stack?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null };

export type UpdateAccessibilityAnalysisMutationVariables = Exact<{
  input?: InputMaybe<UpdateAccessmodAccessibilityAnalysisInput>;
}>;


export type UpdateAccessibilityAnalysisMutation = { __typename?: 'Mutation', updateAccessmodAccessibilityAnalysis: { __typename?: 'UpdateAccessmodAccessibilityAnalysisResult', success: boolean, errors: Array<UpdateAccessmodAccessibilityAnalysisError>, analysis?: { __typename: 'AccessmodAccessibilityAnalysis', id: string, name: string, movingSpeeds?: any | null, type: AccessmodAnalysisType, waterAllTouched?: boolean | null, stackPriorities?: any | null, knightMove?: boolean | null, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, invertDirection?: boolean | null, maxTravelTime?: number | null, status: AccessmodAnalysisStatus, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, stack?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null } | null } };

export type AccessibilityAnalysisOutput_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

type AccessibilityAnalysisOutput_Analysis_AccessmodAccessibilityAnalysis_Fragment = { __typename: 'AccessmodAccessibilityAnalysis', id: string, status: AccessmodAnalysisStatus, travelTimes?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, frictionSurface?: { __typename?: 'AccessmodFileset', name: string, id: string } | null };

type AccessibilityAnalysisOutput_Analysis_AccessmodGeographicCoverageAnalysis_Fragment = { __typename: 'AccessmodGeographicCoverageAnalysis', id: string, status: AccessmodAnalysisStatus };

type AccessibilityAnalysisOutput_Analysis_AccessmodZonalStatistics_Fragment = { __typename: 'AccessmodZonalStatistics', id: string, status: AccessmodAnalysisStatus };

export type AccessibilityAnalysisOutput_AnalysisFragment = AccessibilityAnalysisOutput_Analysis_AccessmodAccessibilityAnalysis_Fragment | AccessibilityAnalysisOutput_Analysis_AccessmodGeographicCoverageAnalysis_Fragment | AccessibilityAnalysisOutput_Analysis_AccessmodZonalStatistics_Fragment;

export type AccessibilityAnalysisParameters_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type AccessibilityAnalysisParameters_AnalysisFragment = { __typename: 'AccessmodAccessibilityAnalysis', id: string, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, stackPriorities?: any | null, movingSpeeds?: any | null, knightMove?: boolean | null, maxTravelTime?: number | null, invertDirection?: boolean | null, waterAllTouched?: boolean | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, stack?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string } | null };

export type AnalysisActionsButton_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string };

type AnalysisActionsButton_Analysis_AccessmodAccessibilityAnalysis_Fragment = { __typename?: 'AccessmodAccessibilityAnalysis', id: string, name: string, status: AccessmodAnalysisStatus, type: AccessmodAnalysisType, permissions: { __typename?: 'AccessmodAnalysisPermissions', update: boolean, delete: boolean, run: boolean } };

type AnalysisActionsButton_Analysis_AccessmodGeographicCoverageAnalysis_Fragment = { __typename?: 'AccessmodGeographicCoverageAnalysis', id: string, name: string, status: AccessmodAnalysisStatus, type: AccessmodAnalysisType, permissions: { __typename?: 'AccessmodAnalysisPermissions', update: boolean, delete: boolean, run: boolean } };

type AnalysisActionsButton_Analysis_AccessmodZonalStatistics_Fragment = { __typename?: 'AccessmodZonalStatistics', id: string, name: string, status: AccessmodAnalysisStatus, type: AccessmodAnalysisType, permissions: { __typename?: 'AccessmodAnalysisPermissions', update: boolean, delete: boolean, run: boolean } };

export type AnalysisActionsButton_AnalysisFragment = AnalysisActionsButton_Analysis_AccessmodAccessibilityAnalysis_Fragment | AnalysisActionsButton_Analysis_AccessmodGeographicCoverageAnalysis_Fragment | AnalysisActionsButton_Analysis_AccessmodZonalStatistics_Fragment;

export type AnalysisForm_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', createFileset: boolean } };

type AnalysisForm_Analysis_AccessmodAccessibilityAnalysis_Fragment = { __typename: 'AccessmodAccessibilityAnalysis', id: string, name: string, movingSpeeds?: any | null, type: AccessmodAnalysisType, waterAllTouched?: boolean | null, stackPriorities?: any | null, knightMove?: boolean | null, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, invertDirection?: boolean | null, maxTravelTime?: number | null, status: AccessmodAnalysisStatus, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, stack?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null };

type AnalysisForm_Analysis_AccessmodGeographicCoverageAnalysis_Fragment = { __typename?: 'AccessmodGeographicCoverageAnalysis' };

type AnalysisForm_Analysis_AccessmodZonalStatistics_Fragment = { __typename: 'AccessmodZonalStatistics', id: string, name: string, type: AccessmodAnalysisType, timeThresholds?: any | null, status: AccessmodAnalysisStatus, travelTimes?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, boundaries?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, population?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null };

export type AnalysisForm_AnalysisFragment = AnalysisForm_Analysis_AccessmodAccessibilityAnalysis_Fragment | AnalysisForm_Analysis_AccessmodGeographicCoverageAnalysis_Fragment | AnalysisForm_Analysis_AccessmodZonalStatistics_Fragment;

type AnalysisStatus_Analysis_AccessmodAccessibilityAnalysis_Fragment = { __typename: 'AccessmodAccessibilityAnalysis', status: AccessmodAnalysisStatus };

type AnalysisStatus_Analysis_AccessmodGeographicCoverageAnalysis_Fragment = { __typename: 'AccessmodGeographicCoverageAnalysis', status: AccessmodAnalysisStatus };

type AnalysisStatus_Analysis_AccessmodZonalStatistics_Fragment = { __typename: 'AccessmodZonalStatistics', status: AccessmodAnalysisStatus };

export type AnalysisStatus_AnalysisFragment = AnalysisStatus_Analysis_AccessmodAccessibilityAnalysis_Fragment | AnalysisStatus_Analysis_AccessmodGeographicCoverageAnalysis_Fragment | AnalysisStatus_Analysis_AccessmodZonalStatistics_Fragment;

export type TabularDatasetEditorQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TabularDatasetEditorQuery = { __typename?: 'Query', dataset?: { __typename?: 'AccessmodFileset', id: string, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', id: string, code: AccessmodFilesetRoleCode, format: AccessmodFilesetFormat }, files: Array<{ __typename?: 'AccessmodFile', id: string, name: string, mimeType: string }> } | null };

export type TabularDatasetEditor_DatasetFragment = { __typename?: 'AccessmodFileset', id: string };

export type ZonalStatisticsForm_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', createFileset: boolean } };

export type ZonalStatisticsForm_AnalysisFragment = { __typename: 'AccessmodZonalStatistics', id: string, name: string, type: AccessmodAnalysisType, timeThresholds?: any | null, status: AccessmodAnalysisStatus, travelTimes?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, boundaries?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, population?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null };

export type UpdateZonalStatisticsMutationVariables = Exact<{
  input?: InputMaybe<UpdateAccessmodZonalStatisticsInput>;
}>;


export type UpdateZonalStatisticsMutation = { __typename?: 'Mutation', updateAccessmodZonalStatistics: { __typename?: 'UpdateAccessmodZonalStatisticsResult', success: boolean, errors: Array<UpdateAccessmodZonalStatisticsError>, analysis?: { __typename: 'AccessmodZonalStatistics', id: string, name: string, type: AccessmodAnalysisType, timeThresholds?: any | null, status: AccessmodAnalysisStatus, travelTimes?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, boundaries?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, population?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null } | null } };

export type ZonalStatisticsOutput_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type ZonalStatisticsOutput_AnalysisFragment = { __typename: 'AccessmodZonalStatistics', id: string, status: AccessmodAnalysisStatus, zonalStatisticsTable?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, zonalStatisticsGeo?: { __typename?: 'AccessmodFileset', name: string, id: string } | null };

export type ZonalStatisticsParameters_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type ZonalStatisticsParameters_AnalysisFragment = { __typename: 'AccessmodZonalStatistics', id: string, timeThresholds?: any | null, population?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, travelTimes?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, boundaries?: { __typename?: 'AccessmodFileset', name: string, id: string } | null };

export type CreateDatasetTrigger_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', createFileset: boolean } };

export type DatasetActionsMenu_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, status: AccessmodFilesetStatus, metadata: any, name: string, mode: AccessmodFilesetMode, permissions: { __typename?: 'AccessmodFilesetPermissions', update: boolean, delete: boolean }, role: { __typename?: 'AccessmodFilesetRole', code: AccessmodFilesetRoleCode, format: AccessmodFilesetFormat }, files: Array<{ __typename?: 'AccessmodFile', id: string, name: string, mimeType: string }> };

export type DatasetActionsMenu_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string };

export type UpdateDatasetMutationVariables = Exact<{
  input: UpdateAccessmodFilesetInput;
}>;


export type UpdateDatasetMutation = { __typename?: 'Mutation', updateAccessmodFileset: { __typename?: 'UpdateAccessmodFilesetResult', success: boolean, errors: Array<UpdateAccessmodFilesetError>, fileset?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, status: AccessmodFilesetStatus } | null } };

export type DatasetDialog_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, mode: AccessmodFilesetMode, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', code: AccessmodFilesetRoleCode, format: AccessmodFilesetFormat } };

export type DatasetFormDialog_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string };

export type DatasetMetadataBlock_DatasetFragment = { __typename?: 'AccessmodFileset', metadata: any, status: AccessmodFilesetStatus, role: { __typename?: 'AccessmodFilesetRole', code: AccessmodFilesetRoleCode } };

export type DatasetPicker_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } };

export type DatasetPicker_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', createFileset: boolean } };

export type DatasetPickerQueryVariables = Exact<{
  projectId: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  roleId?: InputMaybe<Scalars['String']>;
  term?: InputMaybe<Scalars['String']>;
}>;


export type DatasetPickerQuery = { __typename?: 'Query', filesets: { __typename?: 'AccessmodFilesetPage', totalItems: number, items: Array<{ __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } }> } };

export type PollDatasetStatusQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PollDatasetStatusQuery = { __typename?: 'Query', dataset?: { __typename?: 'AccessmodFileset', id: string, status: AccessmodFilesetStatus, metadata: any } | null };

export type DatasetStatusBadge_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, status: AccessmodFilesetStatus };

export type DatasetStatusIcon_DatasetFragment = { __typename?: 'AccessmodFileset', status: AccessmodFilesetStatus, metadata: any };

export type DatasetViewer_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type DatasetViewer_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, metadata: any, role: { __typename?: 'AccessmodFilesetRole', id: string, code: AccessmodFilesetRoleCode, name: string, format: AccessmodFilesetFormat }, files: Array<{ __typename?: 'AccessmodFile', name: string, mimeType: string, id: string }> };

export type DeleteDatasetMutationVariables = Exact<{
  input: DeleteAccessmodFilesetInput;
}>;


export type DeleteDatasetMutation = { __typename?: 'Mutation', deleteAccessmodFileset: { __typename?: 'DeleteAccessmodFilesetResult', success: boolean } };

export type DeleteDatasetTrigger_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string };

export type DeleteDatasetTrigger_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, permissions: { __typename?: 'AccessmodFilesetPermissions', delete: boolean } };

export type DownloadDatasetButton_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, name: string, files: Array<{ __typename?: 'AccessmodFile', id: string, name: string, mimeType: string }> };

export type PreviewDatasetDialogQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PreviewDatasetDialogQuery = { __typename?: 'Query', dataset?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, role: { __typename?: 'AccessmodFilesetRole', id: string, code: AccessmodFilesetRoleCode, name: string, format: AccessmodFilesetFormat }, files: Array<{ __typename?: 'AccessmodFile', id: string, name: string, mimeType: string }> } | null };

export type PreviewDatasetDialog_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type PreviewDatasetDialog_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, name: string };

export type RasterDatasetMap_DatasetFragment = { __typename?: 'AccessmodFileset', id: string, metadata: any, role: { __typename?: 'AccessmodFilesetRole', code: AccessmodFilesetRoleCode } };

export type TabularDatasetTable_DatasetFragment = { __typename?: 'AccessmodFileset', role: { __typename?: 'AccessmodFilesetRole', format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode }, files: Array<{ __typename?: 'AccessmodFile', name: string, mimeType: string, id: string }> };

export type VectorDatasetMap_DatasetFragment = { __typename?: 'AccessmodFileset', id: string };

export type ChangeProjectOwnershipMutationVariables = Exact<{
  input: CreateAccessmodProjectMemberInput;
}>;


export type ChangeProjectOwnershipMutation = { __typename?: 'Mutation', createAccessmodProjectMember: { __typename?: 'CreateAccessmodProjectMemberResult', success: boolean, errors: Array<CreateAccessmodProjectMemberError>, member?: { __typename?: 'AccessmodProjectMember', id: string } | null } };

export type ChangeProjectOwnerDialog_ProjectFragment = { __typename?: 'AccessmodProject', id: string, owner?: { __typename: 'Team', id: string, name: string } | { __typename: 'User' } | null };

export type CreateProjectMutationVariables = Exact<{
  input: CreateAccessmodProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createAccessmodProject: { __typename?: 'CreateAccessmodProjectResult', success: boolean, errors: Array<CreateAccessmodProjectError>, project?: { __typename?: 'AccessmodProject', id: string } | null } };

export type DeleteProjectMutationVariables = Exact<{
  input: DeleteAccessmodProjectInput;
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteAccessmodProject: { __typename?: 'DeleteAccessmodProjectResult', success: boolean } };

export type DeleteProjectTrigger_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', delete: boolean } };

export type EditProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type EditProjectQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string, description: string, permissions: { __typename?: 'AccessmodProjectPermissions', createFileset: boolean } } | null };

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateAccessmodProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateAccessmodProject: { __typename?: 'UpdateAccessmodProjectResult', success: boolean, errors: Array<UpdateAccessmodProjectError>, project?: { __typename?: 'AccessmodProject', id: string, name: string, description: string } | null } };

export type EditProjectFormBlock_ProjectFragment = { __typename?: 'AccessmodProject', id: string };

export type ProjectActionsMenu_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', createPermission: boolean, delete: boolean }, owner?: { __typename: 'Team', id: string, name: string } | { __typename: 'User' } | null };

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


export type ProjectAnalysesTableQuery = { __typename?: 'Query', analyses: { __typename?: 'AccessmodAnalysisPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename: 'AccessmodAccessibilityAnalysis', id: string, type: AccessmodAnalysisType, name: string, createdAt: any, status: AccessmodAnalysisStatus, author: { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } } | { __typename: 'AccessmodGeographicCoverageAnalysis', id: string, type: AccessmodAnalysisType, name: string, createdAt: any, status: AccessmodAnalysisStatus, author: { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } } | { __typename: 'AccessmodZonalStatistics', id: string, type: AccessmodAnalysisType, name: string, createdAt: any, status: AccessmodAnalysisStatus, author: { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } }> } };

export type ProjectCard_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, spatialResolution: number, description: string, updatedAt: any, members: Array<{ __typename?: 'AccessmodProjectMember', mode: PermissionMode, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, team?: { __typename?: 'Team', name: string } | null }>, country: { __typename?: 'Country', name: string, flag: string, code: string } };

export type ProjectDatasetsTableQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['String'];
  term?: InputMaybe<Scalars['String']>;
}>;


export type ProjectDatasetsTableQuery = { __typename?: 'Query', accessmodFilesets: { __typename?: 'AccessmodFilesetPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename?: 'AccessmodFileset', id: string, name: string, status: AccessmodFilesetStatus, createdAt: any, role: { __typename?: 'AccessmodFilesetRole', name: string, id: string, format: AccessmodFilesetFormat }, author: { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } }, permissions: { __typename?: 'AccessmodFilesetPermissions', delete: boolean } }> } };

export type ProjectDatasetsTable_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string };

export type ProjectPickerQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectPickerQuery = { __typename?: 'Query', accessmodProjects: { __typename?: 'AccessmodProjectPage', items: Array<{ __typename?: 'AccessmodProject', id: string, name: string, createdAt: any, updatedAt: any, country: { __typename?: 'Country', flag: string, name: string, code: string } }> } };

export type ProjectsList_ProjectsFragment = { __typename?: 'AccessmodProjectPage', pageNumber: number, totalPages: number, items: Array<{ __typename?: 'AccessmodProject', id: string, name: string, spatialResolution: number, description: string, updatedAt: any, members: Array<{ __typename?: 'AccessmodProjectMember', mode: PermissionMode, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, team?: { __typename?: 'Team', name: string } | null }>, country: { __typename?: 'Country', name: string, flag: string, code: string } }> };

export type DeleteMembershipMutationVariables = Exact<{
  input: DeleteMembershipInput;
}>;


export type DeleteMembershipMutation = { __typename?: 'Mutation', deleteMembership: { __typename?: 'DeleteMembershipResult', success: boolean, errors: Array<DeleteMembershipError> } };

export type DeleteMembershipTrigger_MembershipFragment = { __typename?: 'Membership', id: string, permissions: { __typename?: 'MembershipPermissions', delete: boolean }, user: { __typename?: 'User', firstName?: string | null, lastName?: string | null }, team: { __typename?: 'Team', id: string, name: string } };

export type DeleteTeamMutationVariables = Exact<{
  input: DeleteTeamInput;
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: { __typename?: 'DeleteTeamResult', success: boolean, errors: Array<DeleteTeamError> } };

export type DeleteTeamTrigger_TeamFragment = { __typename?: 'Team', id: string, name: string, permissions: { __typename?: 'TeamPermissions', delete: boolean } };

export type EditTeamTrigger_TeamFragment = { __typename?: 'Team', id: string, name: string };

export type Team_TeamFragment = { __typename?: 'Team', id: string, name: string };

export type TeamActionsMenu_TeamFragment = { __typename?: 'Team', id: string, name: string, permissions: { __typename?: 'TeamPermissions', update: boolean, delete: boolean } };

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


export type TeamProjectsTableQuery = { __typename?: 'Query', projects: { __typename?: 'AccessmodProjectPage', totalPages: number, totalItems: number, items: Array<{ __typename?: 'AccessmodProject', id: string, name: string, createdAt: any, owner?: { __typename: 'Team', id: string, name: string } | { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null }> } };

export type UseDatasetWatcherQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UseDatasetWatcherQuery = { __typename?: 'Query', dataset?: { __typename?: 'AccessmodFileset', status: AccessmodFilesetStatus, id: string, name: string, metadata: any, createdAt: any, updatedAt: any, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null };

export type CreateAccessibilityAnalysisMutationVariables = Exact<{
  input: CreateAccessmodAccessibilityAnalysisInput;
}>;


export type CreateAccessibilityAnalysisMutation = { __typename?: 'Mutation', result: { __typename?: 'CreateAccessmodAccessibilityAnalysisResult', success: boolean, errors: Array<CreateAccessmodAccessibilityAnalysisError>, analysis?: { __typename?: 'AccessmodAccessibilityAnalysis', id: string } | null } };

export type CreateZonalStatisticsMutationVariables = Exact<{
  input: CreateAccessmodZonalStatisticsInput;
}>;


export type CreateZonalStatisticsMutation = { __typename?: 'Mutation', result: { __typename?: 'CreateAccessmodZonalStatisticsResult', success: boolean, errors: Array<CreateAccessmodZonalStatisticsError>, analysis?: { __typename?: 'AccessmodZonalStatistics', id: string } | null } };

export type LaunchAccessmodAnalysisMutationVariables = Exact<{
  input?: InputMaybe<LaunchAccessmodAnalysisInput>;
}>;


export type LaunchAccessmodAnalysisMutation = { __typename?: 'Mutation', launchAccessmodAnalysis: { __typename?: 'LaunchAccessmodAnalysisResult', success: boolean, errors: Array<LaunchAccessmodAnalysisError>, analysis?: { __typename?: 'AccessmodAccessibilityAnalysis', status: AccessmodAnalysisStatus, updatedAt: any } | { __typename?: 'AccessmodGeographicCoverageAnalysis', status: AccessmodAnalysisStatus, updatedAt: any } | { __typename?: 'AccessmodZonalStatistics', status: AccessmodAnalysisStatus, updatedAt: any } | null } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me: { __typename?: 'Me', user?: { __typename?: 'User', email: string, id: string, firstName?: string | null, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResult', success: boolean } };

export type FetchCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', code: string, alpha3: string, name: string, flag: string, whoInfo: { __typename?: 'WHOInfo', defaultCRS: number, region?: { __typename?: 'WHORegion', code: string, name: string } | null } }> };

export type GetUploadUrlMutationVariables = Exact<{
  input: PrepareAccessmodFileUploadInput;
}>;


export type GetUploadUrlMutation = { __typename?: 'Mutation', prepareAccessmodFileUpload: { __typename?: 'PrepareAccessmodFileUploadResult', success: boolean, uploadUrl?: string | null, fileUri?: string | null } };

export type CreateFileMutationVariables = Exact<{
  input: CreateAccessmodFileInput;
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: { __typename?: 'CreateAccessmodFileResult', success: boolean } };

export type GetFilesetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilesetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode, createdAt: any, updatedAt: any }> };

export type GetFileDownloadUrlMutationVariables = Exact<{
  input: PrepareAccessmodFileDownloadInput;
}>;


export type GetFileDownloadUrlMutation = { __typename?: 'Mutation', prepareAccessmodFileDownload: { __typename?: 'PrepareAccessmodFileDownloadResult', success: boolean, downloadUrl?: string | null } };

export type GetDatasetVisualizationUrlMutationVariables = Exact<{
  input: PrepareAccessmodFilesetVisualizationDownloadInput;
}>;


export type GetDatasetVisualizationUrlMutation = { __typename?: 'Mutation', prepareAccessmodFilesetVisualizationDownload: { __typename?: 'PrepareAccessmodFilesetVisualizationDownloadResult', success: boolean, url?: string | null } };

export type CreateDatasetMutationVariables = Exact<{
  input: CreateAccessmodFilesetInput;
}>;


export type CreateDatasetMutation = { __typename?: 'Mutation', createAccessmodFileset: { __typename?: 'CreateAccessmodFilesetResult', success: boolean, errors: Array<CreateAccessmodFilesetError>, fileset?: { __typename?: 'AccessmodFileset', id: string, name: string, status: AccessmodFilesetStatus, metadata: any, role: { __typename?: 'AccessmodFilesetRole', id: string, code: AccessmodFilesetRoleCode, name: string, format: AccessmodFilesetFormat } } | null } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResetPasswordResult', success: boolean } };

export type SetPasswordMutationVariables = Exact<{
  input: SetPasswordInput;
}>;


export type SetPasswordMutation = { __typename?: 'Mutation', setPassword: { __typename?: 'SetPasswordResult', success: boolean, error?: SetPasswordError | null } };

export type SettingsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsPageQuery = { __typename?: 'Query', me: { __typename?: 'Me', user?: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null } | null } };

export type RequestAccessMutationVariables = Exact<{
  input: RequestAccessmodAccessInput;
}>;


export type RequestAccessMutation = { __typename?: 'Mutation', requestAccessmodAccess: { __typename?: 'RequestAccessmodAccessInputResult', success: boolean, errors: Array<RequestAccessmodAccessError> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', success: boolean } };

export type AnalysisEditPageQueryVariables = Exact<{
  id: Scalars['String'];
  analysisId: Scalars['String'];
}>;


export type AnalysisEditPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', createFileset: boolean } } | null, analysis?: { __typename: 'AccessmodAccessibilityAnalysis', id: string, type: AccessmodAnalysisType, name: string, status: AccessmodAnalysisStatus, movingSpeeds?: any | null, waterAllTouched?: boolean | null, stackPriorities?: any | null, knightMove?: boolean | null, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, invertDirection?: boolean | null, maxTravelTime?: number | null, permissions: { __typename?: 'AccessmodAnalysisPermissions', update: boolean }, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, stack?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null } | { __typename: 'AccessmodGeographicCoverageAnalysis', id: string, type: AccessmodAnalysisType, name: string, status: AccessmodAnalysisStatus, permissions: { __typename?: 'AccessmodAnalysisPermissions', update: boolean } } | { __typename: 'AccessmodZonalStatistics', id: string, type: AccessmodAnalysisType, name: string, status: AccessmodAnalysisStatus, timeThresholds?: any | null, permissions: { __typename?: 'AccessmodAnalysisPermissions', update: boolean }, travelTimes?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, boundaries?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null, population?: { __typename?: 'AccessmodFileset', id: string, name: string, metadata: any, createdAt: any, updatedAt: any, status: AccessmodFilesetStatus, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode } } | null } | null };

export type AnalysisDetailPageQueryVariables = Exact<{
  id: Scalars['String'];
  analysisId: Scalars['String'];
}>;


export type AnalysisDetailPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string } | null, analysis?: { __typename: 'AccessmodAccessibilityAnalysis', id: string, name: string, type: AccessmodAnalysisType, createdAt: any, updatedAt: any, status: AccessmodAnalysisStatus, algorithm?: AccessmodAccessibilityAnalysisAlgorithm | null, stackPriorities?: any | null, movingSpeeds?: any | null, knightMove?: boolean | null, maxTravelTime?: number | null, invertDirection?: boolean | null, waterAllTouched?: boolean | null, owner?: { __typename: 'Team', id: string, name: string } | { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, permissions: { __typename?: 'AccessmodAnalysisPermissions', update: boolean, delete: boolean, run: boolean }, travelTimes?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, frictionSurface?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, landCover?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, transportNetwork?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, water?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, barrier?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, stack?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, dem?: { __typename?: 'AccessmodFileset', id: string, name: string } | null, healthFacilities?: { __typename?: 'AccessmodFileset', id: string, name: string } | null } | { __typename: 'AccessmodGeographicCoverageAnalysis', id: string, name: string, type: AccessmodAnalysisType, createdAt: any, updatedAt: any, status: AccessmodAnalysisStatus, owner?: { __typename: 'Team', id: string, name: string } | { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, permissions: { __typename?: 'AccessmodAnalysisPermissions', update: boolean, delete: boolean, run: boolean } } | { __typename: 'AccessmodZonalStatistics', id: string, name: string, type: AccessmodAnalysisType, createdAt: any, updatedAt: any, status: AccessmodAnalysisStatus, timeThresholds?: any | null, owner?: { __typename: 'Team', id: string, name: string } | { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, permissions: { __typename?: 'AccessmodAnalysisPermissions', update: boolean, delete: boolean, run: boolean }, zonalStatisticsTable?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, zonalStatisticsGeo?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, population?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, travelTimes?: { __typename?: 'AccessmodFileset', name: string, id: string } | null, boundaries?: { __typename?: 'AccessmodFileset', name: string, id: string } | null } | null };

export type ProjectAnalysesPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectAnalysesPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', createAnalysis: boolean } } | null };

export type DatasetDetailPageQueryVariables = Exact<{
  id: Scalars['String'];
  datasetId: Scalars['String'];
}>;


export type DatasetDetailPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string } | null, dataset?: { __typename: 'AccessmodFileset', id: string, name: string, metadata: any, status: AccessmodFilesetStatus, createdAt: any, updatedAt: any, mode: AccessmodFilesetMode, role: { __typename?: 'AccessmodFilesetRole', id: string, name: string, format: AccessmodFilesetFormat, code: AccessmodFilesetRoleCode }, owner?: { __typename: 'Team', id: string, name: string } | { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, files: Array<{ __typename?: 'AccessmodFile', id: string, name: string, mimeType: string }>, permissions: { __typename?: 'AccessmodFilesetPermissions', delete: boolean, update: boolean } } | null };

export type ProjectDatasetsPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectDatasetsPageQuery = { __typename?: 'Query', accessmodProject?: { __typename?: 'AccessmodProject', id: string, name: string, permissions: { __typename?: 'AccessmodProjectPermissions', createFileset: boolean } } | null };

export type ProjectPage_ProjectFragment = { __typename?: 'AccessmodProject', id: string, name: string, crs: number, description: string, createdAt: any, updatedAt: any, spatialResolution: number, permissions: { __typename?: 'AccessmodProjectPermissions', createPermission: boolean, update: boolean, createAnalysis: boolean, createFileset: boolean, delete: boolean }, country: { __typename?: 'Country', name: string, code: string, flag: string }, author: { __typename?: 'User', email: string, displayName: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } }, owner?: { __typename: 'Team', id: string, name: string } | { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null };

export type ProjectPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectPageQuery = { __typename?: 'Query', project?: { __typename?: 'AccessmodProject', id: string, name: string, crs: number, description: string, createdAt: any, updatedAt: any, spatialResolution: number, permissions: { __typename?: 'AccessmodProjectPermissions', createPermission: boolean, update: boolean, createAnalysis: boolean, createFileset: boolean, delete: boolean }, country: { __typename?: 'Country', name: string, code: string, flag: string }, author: { __typename?: 'User', email: string, displayName: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } }, owner?: { __typename: 'Team', id: string, name: string } | { __typename: 'User', displayName: string, email: string, id: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null } | null };

export type ProjectsPageQueryVariables = Exact<{
  term?: InputMaybe<Scalars['String']>;
  countries?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  teams?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type ProjectsPageQuery = { __typename?: 'Query', accessmodProjects: { __typename?: 'AccessmodProjectPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename: 'AccessmodProject', id: string, name: string, spatialResolution: number, description: string, updatedAt: any, members: Array<{ __typename?: 'AccessmodProjectMember', mode: PermissionMode, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, avatar: { __typename?: 'Avatar', initials: string, color: string } } | null, team?: { __typename?: 'Team', name: string } | null }>, country: { __typename?: 'Country', name: string, flag: string, code: string } }> } };

export type TeamPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TeamPageQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, createdAt: any, permissions: { __typename?: 'TeamPermissions', createMembership: boolean, update: boolean, delete: boolean } } | null };

export type TeamsPageQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type TeamsPageQuery = { __typename?: 'Query', me: { __typename?: 'Me', permissions: { __typename?: 'MePermissions', createTeam: boolean } }, teams: { __typename?: 'TeamPage', pageNumber: number, totalPages: number, totalItems: number, items: Array<{ __typename: 'Team', name: string, id: string, memberships: { __typename?: 'MembershipPage', totalItems: number, items: Array<{ __typename?: 'Membership', role: MembershipRole, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, displayName: string, avatar: { __typename?: 'Avatar', initials: string, color: string } } }> } }> } };

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
export const UserMenu_MeFragmentDoc = gql`
    fragment UserMenu_me on Me {
  permissions {
    manageAccessmodAccessRequests
  }
  user {
    avatar {
      initials
      color
    }
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
  permissions {
    createMembership
  }
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
  }
}
    `;
export const AccessibilityAnalysisParameters_ProjectFragmentDoc = gql`
    fragment AccessibilityAnalysisParameters_project on AccessmodProject {
  id
}
    `;
export const AccessibilityAnalysisParameters_AnalysisFragmentDoc = gql`
    fragment AccessibilityAnalysisParameters_analysis on AccessmodAccessibilityAnalysis {
  __typename
  id
  landCover {
    id
    name
  }
  transportNetwork {
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
  stack {
    id
    name
  }
  dem {
    id
    name
  }
  algorithm
  stackPriorities
  movingSpeeds
  knightMove
  maxTravelTime
  invertDirection
  waterAllTouched
  healthFacilities {
    id
    name
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
  permissions {
    update
    delete
    run
  }
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
  permissions {
    createFileset
  }
  ...DatasetFormDialog_project
}
    ${DatasetFormDialog_ProjectFragmentDoc}`;
export const AccessibilityAnalysisForm_ProjectFragmentDoc = gql`
    fragment AccessibilityAnalysisForm_project on AccessmodProject {
  id
  ...DatasetPicker_project
}
    ${DatasetPicker_ProjectFragmentDoc}`;
export const ZonalStatisticsForm_ProjectFragmentDoc = gql`
    fragment ZonalStatisticsForm_project on AccessmodProject {
  id
  ...DatasetPicker_project
}
    ${DatasetPicker_ProjectFragmentDoc}`;
export const AnalysisForm_ProjectFragmentDoc = gql`
    fragment AnalysisForm_project on AccessmodProject {
  ...AccessibilityAnalysisForm_project
  ...ZonalStatisticsForm_project
}
    ${AccessibilityAnalysisForm_ProjectFragmentDoc}
${ZonalStatisticsForm_ProjectFragmentDoc}`;
export const DatasetStatusBadge_DatasetFragmentDoc = gql`
    fragment DatasetStatusBadge_dataset on AccessmodFileset {
  id
  status
}
    `;
export const DatasetDialog_DatasetFragmentDoc = gql`
    fragment DatasetDialog_dataset on AccessmodFileset {
  id
  name
  role {
    code
    format
  }
  metadata
  ...DatasetStatusBadge_dataset
  mode
  status
}
    ${DatasetStatusBadge_DatasetFragmentDoc}`;
export const DatasetStatusIcon_DatasetFragmentDoc = gql`
    fragment DatasetStatusIcon_dataset on AccessmodFileset {
  status
  metadata
}
    `;
export const DatasetPicker_DatasetFragmentDoc = gql`
    fragment DatasetPicker_dataset on AccessmodFileset {
  id
  name
  role {
    id
    name
    format
    code
  }
  metadata
  createdAt
  updatedAt
  status
  ...DatasetDialog_dataset
  ...DatasetStatusIcon_dataset
}
    ${DatasetDialog_DatasetFragmentDoc}
${DatasetStatusIcon_DatasetFragmentDoc}`;
export const AccessibilityAnalysisForm_AnalysisFragmentDoc = gql`
    fragment AccessibilityAnalysisForm_analysis on AccessmodAccessibilityAnalysis {
  __typename
  id
  name
  movingSpeeds
  healthFacilities {
    ...DatasetPicker_dataset
  }
  type
  waterAllTouched
  stackPriorities
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
  stack {
    ...DatasetPicker_dataset
  }
  barrier {
    ...DatasetPicker_dataset
  }
  water {
    ...DatasetPicker_dataset
  }
  transportNetwork {
    ...DatasetPicker_dataset
  }
}
    ${DatasetPicker_DatasetFragmentDoc}`;
export const ZonalStatisticsForm_AnalysisFragmentDoc = gql`
    fragment ZonalStatisticsForm_analysis on AccessmodZonalStatistics {
  __typename
  id
  name
  type
  timeThresholds
  travelTimes {
    id
    ...DatasetPicker_dataset
  }
  boundaries {
    id
    ...DatasetPicker_dataset
  }
  population {
    id
    ...DatasetPicker_dataset
  }
  status
}
    ${DatasetPicker_DatasetFragmentDoc}`;
export const AnalysisForm_AnalysisFragmentDoc = gql`
    fragment AnalysisForm_analysis on AccessmodAnalysis {
  ...AccessibilityAnalysisForm_analysis
  ...ZonalStatisticsForm_analysis
}
    ${AccessibilityAnalysisForm_AnalysisFragmentDoc}
${ZonalStatisticsForm_AnalysisFragmentDoc}`;
export const AnalysisStatus_AnalysisFragmentDoc = gql`
    fragment AnalysisStatus_analysis on AccessmodAnalysis {
  __typename
  status
}
    `;
export const TabularDatasetEditor_DatasetFragmentDoc = gql`
    fragment TabularDatasetEditor_dataset on AccessmodFileset {
  id
}
    `;
export const ZonalStatisticsOutput_ProjectFragmentDoc = gql`
    fragment ZonalStatisticsOutput_project on AccessmodProject {
  id
}
    `;
export const ZonalStatisticsOutput_AnalysisFragmentDoc = gql`
    fragment ZonalStatisticsOutput_analysis on AccessmodZonalStatistics {
  __typename
  id
  status
  zonalStatisticsTable {
    name
    id
  }
  zonalStatisticsGeo {
    name
    id
  }
}
    `;
export const ZonalStatisticsParameters_ProjectFragmentDoc = gql`
    fragment ZonalStatisticsParameters_project on AccessmodProject {
  id
}
    `;
export const ZonalStatisticsParameters_AnalysisFragmentDoc = gql`
    fragment ZonalStatisticsParameters_analysis on AccessmodZonalStatistics {
  __typename
  id
  population {
    name
    id
  }
  travelTimes {
    name
    id
  }
  timeThresholds
  boundaries {
    name
    id
  }
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
export const DeleteDatasetTrigger_DatasetFragmentDoc = gql`
    fragment DeleteDatasetTrigger_dataset on AccessmodFileset {
  id
  permissions {
    delete
  }
}
    `;
export const DatasetActionsMenu_DatasetFragmentDoc = gql`
    fragment DatasetActionsMenu_dataset on AccessmodFileset {
  id
  status
  metadata
  permissions {
    update
    delete
  }
  ...DatasetDialog_dataset
  ...DownloadDatasetButton_dataset
  ...DeleteDatasetTrigger_dataset
}
    ${DatasetDialog_DatasetFragmentDoc}
${DownloadDatasetButton_DatasetFragmentDoc}
${DeleteDatasetTrigger_DatasetFragmentDoc}`;
export const DeleteDatasetTrigger_ProjectFragmentDoc = gql`
    fragment DeleteDatasetTrigger_project on AccessmodProject {
  id
  name
}
    `;
export const DatasetActionsMenu_ProjectFragmentDoc = gql`
    fragment DatasetActionsMenu_project on AccessmodProject {
  id
  ...DeleteDatasetTrigger_project
}
    ${DeleteDatasetTrigger_ProjectFragmentDoc}`;
export const DatasetMetadataBlock_DatasetFragmentDoc = gql`
    fragment DatasetMetadataBlock_dataset on AccessmodFileset {
  metadata
  status
  role {
    code
  }
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
}
    `;
export const RasterDatasetMap_DatasetFragmentDoc = gql`
    fragment RasterDatasetMap_dataset on AccessmodFileset {
  id
  metadata
  role {
    code
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
  members {
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
  permissions {
    delete
  }
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
}
    ${TeamFormDialog_TeamFragmentDoc}`;
export const DeleteTeamTrigger_TeamFragmentDoc = gql`
    fragment DeleteTeamTrigger_team on Team {
  id
  name
  permissions {
    delete
  }
}
    `;
export const TeamActionsMenu_TeamFragmentDoc = gql`
    fragment TeamActionsMenu_team on Team {
  id
  name
  permissions {
    update
    delete
  }
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
  permissions {
    delete
  }
}
    `;
export const ChangeProjectOwnerDialog_ProjectFragmentDoc = gql`
    fragment ChangeProjectOwnerDialog_project on AccessmodProject {
  id
  owner {
    __typename
    ... on Team {
      id
      name
    }
  }
}
    `;
export const ProjectActionsMenu_ProjectFragmentDoc = gql`
    fragment ProjectActionsMenu_project on AccessmodProject {
  id
  name
  permissions {
    createPermission
  }
  ...DeleteProjectTrigger_project
  ...ChangeProjectOwnerDialog_project
}
    ${DeleteProjectTrigger_ProjectFragmentDoc}
${ChangeProjectOwnerDialog_ProjectFragmentDoc}`;
export const ProjectAnalysesTable_ProjectFragmentDoc = gql`
    fragment ProjectAnalysesTable_project on AccessmodProject {
  id
}
    `;
export const ProjectDatasetsTable_ProjectFragmentDoc = gql`
    fragment ProjectDatasetsTable_project on AccessmodProject {
  ...DeleteDatasetTrigger_project
  id
}
    ${DeleteDatasetTrigger_ProjectFragmentDoc}`;
export const CreateAnalysisDialog_ProjectFragmentDoc = gql`
    fragment CreateAnalysisDialog_project on AccessmodProject {
  id
}
    `;
export const CreateAnalysisTrigger_ProjectFragmentDoc = gql`
    fragment CreateAnalysisTrigger_project on AccessmodProject {
  ...CreateAnalysisDialog_project
  permissions {
    createAnalysis
  }
}
    ${CreateAnalysisDialog_ProjectFragmentDoc}`;
export const CreateDatasetTrigger_ProjectFragmentDoc = gql`
    fragment CreateDatasetTrigger_project on AccessmodProject {
  ...DatasetFormDialog_project
  permissions {
    createFileset
  }
}
    ${DatasetFormDialog_ProjectFragmentDoc}`;
export const EditProjectFormBlock_ProjectFragmentDoc = gql`
    fragment EditProjectFormBlock_project on AccessmodProject {
  id
}
    `;
export const User_UserFragmentDoc = gql`
    fragment User_user on User {
  displayName
  email
  id
  avatar {
    initials
    color
  }
}
    `;
export const Team_TeamFragmentDoc = gql`
    fragment Team_team on Team {
  id
  name
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
  ...ChangeProjectOwnerDialog_project
  permissions {
    createPermission
    update
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
  owner {
    __typename
    ...User_user
    ...Team_team
  }
}
    ${ProjectActionsMenu_ProjectFragmentDoc}
${ProjectAnalysesTable_ProjectFragmentDoc}
${ProjectDatasetsTable_ProjectFragmentDoc}
${CreateAnalysisTrigger_ProjectFragmentDoc}
${CreateDatasetTrigger_ProjectFragmentDoc}
${EditProjectFormBlock_ProjectFragmentDoc}
${ChangeProjectOwnerDialog_ProjectFragmentDoc}
${User_UserFragmentDoc}
${Team_TeamFragmentDoc}`;
export const HeaderDocument = gql`
    query Header {
  me {
    permissions {
      createAccessmodProject
    }
    ...UserMenu_me
  }
  ...Navbar_navbar
}
    ${UserMenu_MeFragmentDoc}
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
        permissions {
          update
          delete
        }
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
export const ApproveAccessRequestDocument = gql`
    mutation ApproveAccessRequest($input: ApproveAccessmodAccessRequestInput!) {
  approveAccessmodAccessRequest(input: $input) {
    success
    errors
  }
}
    `;
export type ApproveAccessRequestMutationFn = Apollo.MutationFunction<ApproveAccessRequestMutation, ApproveAccessRequestMutationVariables>;

/**
 * __useApproveAccessRequestMutation__
 *
 * To run a mutation, you first call `useApproveAccessRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveAccessRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveAccessRequestMutation, { data, loading, error }] = useApproveAccessRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApproveAccessRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApproveAccessRequestMutation, ApproveAccessRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveAccessRequestMutation, ApproveAccessRequestMutationVariables>(ApproveAccessRequestDocument, options);
      }
export type ApproveAccessRequestMutationHookResult = ReturnType<typeof useApproveAccessRequestMutation>;
export type ApproveAccessRequestMutationResult = Apollo.MutationResult<ApproveAccessRequestMutation>;
export type ApproveAccessRequestMutationOptions = Apollo.BaseMutationOptions<ApproveAccessRequestMutation, ApproveAccessRequestMutationVariables>;
export const DenyAccessmodAccessRequestDocument = gql`
    mutation DenyAccessmodAccessRequest($input: DenyAccessmodAccessRequestInput!) {
  denyAccessmodAccessRequest(input: $input) {
    success
    errors
  }
}
    `;
export type DenyAccessmodAccessRequestMutationFn = Apollo.MutationFunction<DenyAccessmodAccessRequestMutation, DenyAccessmodAccessRequestMutationVariables>;

/**
 * __useDenyAccessmodAccessRequestMutation__
 *
 * To run a mutation, you first call `useDenyAccessmodAccessRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDenyAccessmodAccessRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [denyAccessmodAccessRequestMutation, { data, loading, error }] = useDenyAccessmodAccessRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDenyAccessmodAccessRequestMutation(baseOptions?: Apollo.MutationHookOptions<DenyAccessmodAccessRequestMutation, DenyAccessmodAccessRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DenyAccessmodAccessRequestMutation, DenyAccessmodAccessRequestMutationVariables>(DenyAccessmodAccessRequestDocument, options);
      }
export type DenyAccessmodAccessRequestMutationHookResult = ReturnType<typeof useDenyAccessmodAccessRequestMutation>;
export type DenyAccessmodAccessRequestMutationResult = Apollo.MutationResult<DenyAccessmodAccessRequestMutation>;
export type DenyAccessmodAccessRequestMutationOptions = Apollo.BaseMutationOptions<DenyAccessmodAccessRequestMutation, DenyAccessmodAccessRequestMutationVariables>;
export const AccessRequestsTableDocument = gql`
    query AccessRequestsTable($page: Int = 1, $perPage: Int = 10) {
  accessRequests: accessmodAccessRequests(page: $page, perPage: $perPage) {
    pageNumber
    items {
      id
      firstName
      lastName
      acceptedTos
      email
      status
      createdAt
      updatedAt
    }
    totalPages
    totalItems
  }
}
    `;

/**
 * __useAccessRequestsTableQuery__
 *
 * To run a query within a React component, call `useAccessRequestsTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessRequestsTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessRequestsTableQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useAccessRequestsTableQuery(baseOptions?: Apollo.QueryHookOptions<AccessRequestsTableQuery, AccessRequestsTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccessRequestsTableQuery, AccessRequestsTableQueryVariables>(AccessRequestsTableDocument, options);
      }
export function useAccessRequestsTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessRequestsTableQuery, AccessRequestsTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccessRequestsTableQuery, AccessRequestsTableQueryVariables>(AccessRequestsTableDocument, options);
        }
export type AccessRequestsTableQueryHookResult = ReturnType<typeof useAccessRequestsTableQuery>;
export type AccessRequestsTableLazyQueryHookResult = ReturnType<typeof useAccessRequestsTableLazyQuery>;
export type AccessRequestsTableQueryResult = Apollo.QueryResult<AccessRequestsTableQuery, AccessRequestsTableQueryVariables>;
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
export const TabularDatasetEditorDocument = gql`
    query TabularDatasetEditor($id: String!) {
  dataset: accessmodFileset(id: $id) {
    ...TabularDatasetTable_dataset
    id
    role {
      id
      code
      format
    }
    status
    files {
      id
      name
      mimeType
    }
  }
}
    ${TabularDatasetTable_DatasetFragmentDoc}`;

/**
 * __useTabularDatasetEditorQuery__
 *
 * To run a query within a React component, call `useTabularDatasetEditorQuery` and pass it any options that fit your needs.
 * When your component renders, `useTabularDatasetEditorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTabularDatasetEditorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTabularDatasetEditorQuery(baseOptions: Apollo.QueryHookOptions<TabularDatasetEditorQuery, TabularDatasetEditorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TabularDatasetEditorQuery, TabularDatasetEditorQueryVariables>(TabularDatasetEditorDocument, options);
      }
export function useTabularDatasetEditorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TabularDatasetEditorQuery, TabularDatasetEditorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TabularDatasetEditorQuery, TabularDatasetEditorQueryVariables>(TabularDatasetEditorDocument, options);
        }
export type TabularDatasetEditorQueryHookResult = ReturnType<typeof useTabularDatasetEditorQuery>;
export type TabularDatasetEditorLazyQueryHookResult = ReturnType<typeof useTabularDatasetEditorLazyQuery>;
export type TabularDatasetEditorQueryResult = Apollo.QueryResult<TabularDatasetEditorQuery, TabularDatasetEditorQueryVariables>;
export const UpdateZonalStatisticsDocument = gql`
    mutation UpdateZonalStatistics($input: UpdateAccessmodZonalStatisticsInput) {
  updateAccessmodZonalStatistics(input: $input) {
    success
    errors
    analysis {
      ...ZonalStatisticsForm_analysis
    }
  }
}
    ${ZonalStatisticsForm_AnalysisFragmentDoc}`;
export type UpdateZonalStatisticsMutationFn = Apollo.MutationFunction<UpdateZonalStatisticsMutation, UpdateZonalStatisticsMutationVariables>;

/**
 * __useUpdateZonalStatisticsMutation__
 *
 * To run a mutation, you first call `useUpdateZonalStatisticsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateZonalStatisticsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateZonalStatisticsMutation, { data, loading, error }] = useUpdateZonalStatisticsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateZonalStatisticsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateZonalStatisticsMutation, UpdateZonalStatisticsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateZonalStatisticsMutation, UpdateZonalStatisticsMutationVariables>(UpdateZonalStatisticsDocument, options);
      }
export type UpdateZonalStatisticsMutationHookResult = ReturnType<typeof useUpdateZonalStatisticsMutation>;
export type UpdateZonalStatisticsMutationResult = Apollo.MutationResult<UpdateZonalStatisticsMutation>;
export type UpdateZonalStatisticsMutationOptions = Apollo.BaseMutationOptions<UpdateZonalStatisticsMutation, UpdateZonalStatisticsMutationVariables>;
export const UpdateDatasetDocument = gql`
    mutation UpdateDataset($input: UpdateAccessmodFilesetInput!) {
  updateAccessmodFileset(input: $input) {
    success
    fileset {
      id
      name
      metadata
      status
    }
    errors
  }
}
    `;
export type UpdateDatasetMutationFn = Apollo.MutationFunction<UpdateDatasetMutation, UpdateDatasetMutationVariables>;

/**
 * __useUpdateDatasetMutation__
 *
 * To run a mutation, you first call `useUpdateDatasetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDatasetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDatasetMutation, { data, loading, error }] = useUpdateDatasetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDatasetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDatasetMutation, UpdateDatasetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDatasetMutation, UpdateDatasetMutationVariables>(UpdateDatasetDocument, options);
      }
export type UpdateDatasetMutationHookResult = ReturnType<typeof useUpdateDatasetMutation>;
export type UpdateDatasetMutationResult = Apollo.MutationResult<UpdateDatasetMutation>;
export type UpdateDatasetMutationOptions = Apollo.BaseMutationOptions<UpdateDatasetMutation, UpdateDatasetMutationVariables>;
export const DatasetPickerDocument = gql`
    query DatasetPicker($projectId: String!, $page: Int = 1, $perPage: Int = 15, $roleId: String, $term: String) {
  filesets: accessmodFilesets(
    projectId: $projectId
    page: $page
    term: $term
    perPage: $perPage
    roleId: $roleId
    mode: USER_INPUT
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
export const ChangeProjectOwnershipDocument = gql`
    mutation ChangeProjectOwnership($input: CreateAccessmodProjectMemberInput!) {
  createAccessmodProjectMember(input: $input) {
    success
    errors
    member {
      id
    }
  }
}
    `;
export type ChangeProjectOwnershipMutationFn = Apollo.MutationFunction<ChangeProjectOwnershipMutation, ChangeProjectOwnershipMutationVariables>;

/**
 * __useChangeProjectOwnershipMutation__
 *
 * To run a mutation, you first call `useChangeProjectOwnershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProjectOwnershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProjectOwnershipMutation, { data, loading, error }] = useChangeProjectOwnershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeProjectOwnershipMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProjectOwnershipMutation, ChangeProjectOwnershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProjectOwnershipMutation, ChangeProjectOwnershipMutationVariables>(ChangeProjectOwnershipDocument, options);
      }
export type ChangeProjectOwnershipMutationHookResult = ReturnType<typeof useChangeProjectOwnershipMutation>;
export type ChangeProjectOwnershipMutationResult = Apollo.MutationResult<ChangeProjectOwnershipMutation>;
export type ChangeProjectOwnershipMutationOptions = Apollo.BaseMutationOptions<ChangeProjectOwnershipMutation, ChangeProjectOwnershipMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateAccessmodProjectInput!) {
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
export const DeleteProjectDocument = gql`
    mutation DeleteProject($input: DeleteAccessmodProjectInput!) {
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
    description
    ...DatasetPicker_project
  }
}
    ${DatasetPicker_ProjectFragmentDoc}`;

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
    mutation UpdateProject($input: UpdateAccessmodProjectInput!) {
  updateAccessmodProject(input: $input) {
    success
    errors
    project {
      id
      name
      description
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
      author {
        __typename
        ...User_user
      }
      createdAt
      status
      ...AnalysisStatus_analysis
    }
    pageNumber
    totalPages
    totalItems
  }
}
    ${User_UserFragmentDoc}
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
    mode: USER_INPUT
  ) {
    items {
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
        __typename
        ...User_user
      }
      status
      createdAt
    }
    pageNumber
    totalPages
    totalItems
  }
}
    ${DatasetStatusBadge_DatasetFragmentDoc}
${DeleteDatasetTrigger_DatasetFragmentDoc}
${User_UserFragmentDoc}`;

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
      owner {
        __typename
        ...User_user
        ...Team_team
      }
    }
  }
}
    ${User_UserFragmentDoc}
${Team_TeamFragmentDoc}`;

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
export const UseDatasetWatcherDocument = gql`
    query useDatasetWatcher($id: String!) {
  dataset: accessmodFileset(id: $id) {
    status
    ...DatasetPicker_dataset
  }
}
    ${DatasetPicker_DatasetFragmentDoc}`;

/**
 * __useUseDatasetWatcherQuery__
 *
 * To run a query within a React component, call `useUseDatasetWatcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useUseDatasetWatcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUseDatasetWatcherQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUseDatasetWatcherQuery(baseOptions: Apollo.QueryHookOptions<UseDatasetWatcherQuery, UseDatasetWatcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UseDatasetWatcherQuery, UseDatasetWatcherQueryVariables>(UseDatasetWatcherDocument, options);
      }
export function useUseDatasetWatcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UseDatasetWatcherQuery, UseDatasetWatcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UseDatasetWatcherQuery, UseDatasetWatcherQueryVariables>(UseDatasetWatcherDocument, options);
        }
export type UseDatasetWatcherQueryHookResult = ReturnType<typeof useUseDatasetWatcherQuery>;
export type UseDatasetWatcherLazyQueryHookResult = ReturnType<typeof useUseDatasetWatcherLazyQuery>;
export type UseDatasetWatcherQueryResult = Apollo.QueryResult<UseDatasetWatcherQuery, UseDatasetWatcherQueryVariables>;
export const CreateAccessibilityAnalysisDocument = gql`
    mutation CreateAccessibilityAnalysis($input: CreateAccessmodAccessibilityAnalysisInput!) {
  result: createAccessmodAccessibilityAnalysis(input: $input) {
    success
    analysis {
      id
    }
    errors
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
export const CreateZonalStatisticsDocument = gql`
    mutation CreateZonalStatistics($input: CreateAccessmodZonalStatisticsInput!) {
  result: createAccessmodZonalStatistics(input: $input) {
    success
    analysis {
      id
    }
    errors
  }
}
    `;
export type CreateZonalStatisticsMutationFn = Apollo.MutationFunction<CreateZonalStatisticsMutation, CreateZonalStatisticsMutationVariables>;

/**
 * __useCreateZonalStatisticsMutation__
 *
 * To run a mutation, you first call `useCreateZonalStatisticsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateZonalStatisticsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createZonalStatisticsMutation, { data, loading, error }] = useCreateZonalStatisticsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateZonalStatisticsMutation(baseOptions?: Apollo.MutationHookOptions<CreateZonalStatisticsMutation, CreateZonalStatisticsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateZonalStatisticsMutation, CreateZonalStatisticsMutationVariables>(CreateZonalStatisticsDocument, options);
      }
export type CreateZonalStatisticsMutationHookResult = ReturnType<typeof useCreateZonalStatisticsMutation>;
export type CreateZonalStatisticsMutationResult = Apollo.MutationResult<CreateZonalStatisticsMutation>;
export type CreateZonalStatisticsMutationOptions = Apollo.BaseMutationOptions<CreateZonalStatisticsMutation, CreateZonalStatisticsMutationVariables>;
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
export const FetchCountriesDocument = gql`
    query FetchCountries {
  countries {
    code
    alpha3
    name
    flag
    whoInfo {
      defaultCRS
      region {
        code
        name
      }
    }
  }
}
    `;

/**
 * __useFetchCountriesQuery__
 *
 * To run a query within a React component, call `useFetchCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchCountriesQuery(baseOptions?: Apollo.QueryHookOptions<FetchCountriesQuery, FetchCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCountriesQuery, FetchCountriesQueryVariables>(FetchCountriesDocument, options);
      }
export function useFetchCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCountriesQuery, FetchCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCountriesQuery, FetchCountriesQueryVariables>(FetchCountriesDocument, options);
        }
export type FetchCountriesQueryHookResult = ReturnType<typeof useFetchCountriesQuery>;
export type FetchCountriesLazyQueryHookResult = ReturnType<typeof useFetchCountriesLazyQuery>;
export type FetchCountriesQueryResult = Apollo.QueryResult<FetchCountriesQuery, FetchCountriesQueryVariables>;
export const GetUploadUrlDocument = gql`
    mutation GetUploadUrl($input: PrepareAccessmodFileUploadInput!) {
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
    mutation CreateFile($input: CreateAccessmodFileInput!) {
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
    mutation GetFileDownloadUrl($input: PrepareAccessmodFileDownloadInput!) {
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
export const GetDatasetVisualizationUrlDocument = gql`
    mutation GetDatasetVisualizationUrl($input: PrepareAccessmodFilesetVisualizationDownloadInput!) {
  prepareAccessmodFilesetVisualizationDownload(input: $input) {
    success
    url
  }
}
    `;
export type GetDatasetVisualizationUrlMutationFn = Apollo.MutationFunction<GetDatasetVisualizationUrlMutation, GetDatasetVisualizationUrlMutationVariables>;

/**
 * __useGetDatasetVisualizationUrlMutation__
 *
 * To run a mutation, you first call `useGetDatasetVisualizationUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetDatasetVisualizationUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getDatasetVisualizationUrlMutation, { data, loading, error }] = useGetDatasetVisualizationUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetDatasetVisualizationUrlMutation(baseOptions?: Apollo.MutationHookOptions<GetDatasetVisualizationUrlMutation, GetDatasetVisualizationUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetDatasetVisualizationUrlMutation, GetDatasetVisualizationUrlMutationVariables>(GetDatasetVisualizationUrlDocument, options);
      }
export type GetDatasetVisualizationUrlMutationHookResult = ReturnType<typeof useGetDatasetVisualizationUrlMutation>;
export type GetDatasetVisualizationUrlMutationResult = Apollo.MutationResult<GetDatasetVisualizationUrlMutation>;
export type GetDatasetVisualizationUrlMutationOptions = Apollo.BaseMutationOptions<GetDatasetVisualizationUrlMutation, GetDatasetVisualizationUrlMutationVariables>;
export const CreateDatasetDocument = gql`
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
    `;
export type CreateDatasetMutationFn = Apollo.MutationFunction<CreateDatasetMutation, CreateDatasetMutationVariables>;

/**
 * __useCreateDatasetMutation__
 *
 * To run a mutation, you first call `useCreateDatasetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDatasetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDatasetMutation, { data, loading, error }] = useCreateDatasetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDatasetMutation(baseOptions?: Apollo.MutationHookOptions<CreateDatasetMutation, CreateDatasetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDatasetMutation, CreateDatasetMutationVariables>(CreateDatasetDocument, options);
      }
export type CreateDatasetMutationHookResult = ReturnType<typeof useCreateDatasetMutation>;
export type CreateDatasetMutationResult = Apollo.MutationResult<CreateDatasetMutation>;
export type CreateDatasetMutationOptions = Apollo.BaseMutationOptions<CreateDatasetMutation, CreateDatasetMutationVariables>;
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
export const SetPasswordDocument = gql`
    mutation setPassword($input: SetPasswordInput!) {
  setPassword(input: $input) {
    success
    error
  }
}
    `;
export type SetPasswordMutationFn = Apollo.MutationFunction<SetPasswordMutation, SetPasswordMutationVariables>;

/**
 * __useSetPasswordMutation__
 *
 * To run a mutation, you first call `useSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordMutation, { data, loading, error }] = useSetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SetPasswordMutation, SetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPasswordMutation, SetPasswordMutationVariables>(SetPasswordDocument, options);
      }
export type SetPasswordMutationHookResult = ReturnType<typeof useSetPasswordMutation>;
export type SetPasswordMutationResult = Apollo.MutationResult<SetPasswordMutation>;
export type SetPasswordMutationOptions = Apollo.BaseMutationOptions<SetPasswordMutation, SetPasswordMutationVariables>;
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
export const RequestAccessDocument = gql`
    mutation RequestAccess($input: RequestAccessmodAccessInput!) {
  requestAccessmodAccess(input: $input) {
    success
    errors
  }
}
    `;
export type RequestAccessMutationFn = Apollo.MutationFunction<RequestAccessMutation, RequestAccessMutationVariables>;

/**
 * __useRequestAccessMutation__
 *
 * To run a mutation, you first call `useRequestAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestAccessMutation, { data, loading, error }] = useRequestAccessMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestAccessMutation(baseOptions?: Apollo.MutationHookOptions<RequestAccessMutation, RequestAccessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestAccessMutation, RequestAccessMutationVariables>(RequestAccessDocument, options);
      }
export type RequestAccessMutationHookResult = ReturnType<typeof useRequestAccessMutation>;
export type RequestAccessMutationResult = Apollo.MutationResult<RequestAccessMutation>;
export type RequestAccessMutationOptions = Apollo.BaseMutationOptions<RequestAccessMutation, RequestAccessMutationVariables>;
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
    permissions {
      update
    }
    ...AnalysisStatus_analysis
    ...AnalysisForm_analysis
  }
}
    ${AnalysisForm_ProjectFragmentDoc}
${AnalysisStatus_AnalysisFragmentDoc}
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
    ...AccessibilityAnalysisParameters_project
    ...ZonalStatisticsOutput_project
    ...ZonalStatisticsParameters_project
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
    ...AccessibilityAnalysisParameters_analysis
    ...ZonalStatisticsOutput_analysis
    ...ZonalStatisticsParameters_analysis
    ... on AccessmodOwnership {
      owner {
        __typename
        ...User_user
        ...Team_team
      }
    }
  }
}
    ${AnalysisActionsButton_ProjectFragmentDoc}
${AccessibilityAnalysisOutput_ProjectFragmentDoc}
${AccessibilityAnalysisParameters_ProjectFragmentDoc}
${ZonalStatisticsOutput_ProjectFragmentDoc}
${ZonalStatisticsParameters_ProjectFragmentDoc}
${AnalysisActionsButton_AnalysisFragmentDoc}
${AnalysisStatus_AnalysisFragmentDoc}
${AccessibilityAnalysisOutput_AnalysisFragmentDoc}
${AccessibilityAnalysisParameters_AnalysisFragmentDoc}
${ZonalStatisticsOutput_AnalysisFragmentDoc}
${ZonalStatisticsParameters_AnalysisFragmentDoc}
${User_UserFragmentDoc}
${Team_TeamFragmentDoc}`;

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
    ...DatasetActionsMenu_project
  }
  dataset: accessmodFileset(id: $datasetId) {
    __typename
    ...DatasetStatusBadge_dataset
    ...DatasetViewer_dataset
    ...DownloadDatasetButton_dataset
    ...DeleteDatasetTrigger_dataset
    ...DatasetActionsMenu_dataset
    ...DatasetDialog_dataset
    ...DatasetMetadataBlock_dataset
    id
    name
    metadata
    status
    createdAt
    updatedAt
    role {
      id
      name
      format
    }
    owner {
      __typename
      ...User_user
      ...Team_team
    }
  }
}
    ${DeleteDatasetTrigger_ProjectFragmentDoc}
${DatasetViewer_ProjectFragmentDoc}
${DatasetActionsMenu_ProjectFragmentDoc}
${DatasetStatusBadge_DatasetFragmentDoc}
${DatasetViewer_DatasetFragmentDoc}
${DownloadDatasetButton_DatasetFragmentDoc}
${DeleteDatasetTrigger_DatasetFragmentDoc}
${DatasetActionsMenu_DatasetFragmentDoc}
${DatasetDialog_DatasetFragmentDoc}
${DatasetMetadataBlock_DatasetFragmentDoc}
${User_UserFragmentDoc}
${Team_TeamFragmentDoc}`;

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
export const ProjectDatasetsPageDocument = gql`
    query ProjectDatasetsPage($id: String!) {
  accessmodProject(id: $id) {
    id
    name
    permissions {
      createFileset
    }
    ...DatasetFormDialog_project
    ...ProjectDatasetsTable_project
  }
}
    ${DatasetFormDialog_ProjectFragmentDoc}
${ProjectDatasetsTable_ProjectFragmentDoc}`;

/**
 * __useProjectDatasetsPageQuery__
 *
 * To run a query within a React component, call `useProjectDatasetsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDatasetsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDatasetsPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectDatasetsPageQuery(baseOptions: Apollo.QueryHookOptions<ProjectDatasetsPageQuery, ProjectDatasetsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDatasetsPageQuery, ProjectDatasetsPageQueryVariables>(ProjectDatasetsPageDocument, options);
      }
export function useProjectDatasetsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDatasetsPageQuery, ProjectDatasetsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDatasetsPageQuery, ProjectDatasetsPageQueryVariables>(ProjectDatasetsPageDocument, options);
        }
export type ProjectDatasetsPageQueryHookResult = ReturnType<typeof useProjectDatasetsPageQuery>;
export type ProjectDatasetsPageLazyQueryHookResult = ReturnType<typeof useProjectDatasetsPageLazyQuery>;
export type ProjectDatasetsPageQueryResult = Apollo.QueryResult<ProjectDatasetsPageQuery, ProjectDatasetsPageQueryVariables>;
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
    orderBy: UPDATED_AT_DESC
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
export const TeamPageDocument = gql`
    query TeamPage($id: String!) {
  team(id: $id) {
    id
    name
    createdAt
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
    permissions {
      createTeam
    }
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
          role
          user {
            id
            email
            firstName
            lastName
            displayName
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