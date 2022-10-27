import { gql } from "@apollo/client";
import {
  ClockIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ErrorBoundary } from "@sentry/nextjs";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import Toggle from "components/Toggle";
import DatasetActionsMenu from "features/dataset/DatasetActionsMenu";
import { DatasetDialog } from "features/dataset/DatasetDialog";
import DatasetMetadataBlock from "features/dataset/DatasetMetadataBlock";
import DatasetStatusBadge from "features/dataset/DatasetStatusBadge";
import DatasetViewer from "features/dataset/DatasetViewer";
import DeleteDatasetTrigger from "features/dataset/DeleteDatasetTrigger";
import DownloadDatasetButton from "features/dataset/DownloadDatasetButton";
import Team from "features/team/Team";
import User from "features/User";
import { getFormatLabel } from "libs/constants";
import {
  AccessmodFilesetStatus,
  useDatasetDetailPageQuery,
} from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { DateTime } from "luxon";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

type Props = {
  defaultVariables: { id: string; datasetId: string };
};

const DatasetPage = ({ defaultVariables }: Props) => {
  const { t } = useTranslation();
  const { loading, data, startPolling, stopPolling } =
    useDatasetDetailPageQuery({
      pollInterval: 0,
      variables: defaultVariables,
    });

  const dataset = data?.dataset;

  useEffect(() => {
    if (!dataset) return;
    if (
      [
        AccessmodFilesetStatus.Pending,
        AccessmodFilesetStatus.Validating,
      ].includes(dataset.status)
    ) {
      startPolling(1000);
    }

    return () => {
      stopPolling();
    };
  }, [dataset, startPolling, stopPolling]);

  if (!data?.project || !dataset || loading) {
    // Unknonwn project or not authorized
    return null;
  }

  return (
    <Page title={dataset.name}>
      <PageHeader>
        <Breadcrumbs className="mb-2">
          <Breadcrumbs.Part href="/projects">{t("Projects")}</Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project,
              query: { projectId: data.project.id },
            }}
          >
            {data.project.name}
          </Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project_datasets_list,
              query: { projectId: data.project.id },
            }}
          >
            {t("Datasets")}
          </Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project_dataset,
              query: {
                projectId: data.project.id,
                datasetId: dataset.id,
              },
            }}
          >
            {dataset.name}
          </Breadcrumbs.Part>
        </Breadcrumbs>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="flex justify-between gap-3 text-3xl font-bold text-white">
              {dataset.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-10 gap-y-2 text-sm text-white">
              <DatasetStatusBadge dataset={dataset} />
              {dataset.role && (
                <div className="flex items-center">
                  <DocumentTextIcon className="mr-1.5 h-4" />
                  <span>
                    {dataset.role.name} ({getFormatLabel(dataset.role.format)})
                  </span>
                </div>
              )}
              {dataset.owner?.__typename === "User" && (
                <User user={dataset.owner} small textColor="text-white" />
              )}
              {dataset.owner?.__typename === "Team" && (
                <Team team={dataset.owner} iconClassName="h-4 w-4 mr-1.5" />
              )}
              <div className="flex items-center">
                <ClockIcon className="mr-1.5 h-4" />
                <span>
                  {t("Updated at {{date}}", {
                    date: DateTime.fromISO(dataset.updatedAt).toLocaleString(
                      DateTime.DATETIME_SHORT
                    ),
                  })}
                </span>
              </div>
            </div>
          </div>
          <DatasetActionsMenu dataset={dataset} project={data.project} />
        </div>
      </PageHeader>
      <PageContent className="space-y-4">
        {[
          AccessmodFilesetStatus.Pending,
          AccessmodFilesetStatus.Validating,
        ].includes(dataset.status) && (
          <Block className="flex items-center gap-2 text-gray-600">
            <InformationCircleIcon className="h-10 w-10 text-picton-blue" />
            {t("This dataset will be validated soon.")}
          </Block>
        )}
        {dataset.status === AccessmodFilesetStatus.ToAcquire && (
          <Block className="flex items-center gap-2 text-gray-600">
            <InformationCircleIcon className="h-10 w-10 text-picton-blue" />
            {t("This dataset will be downloaded soon.")}
          </Block>
        )}
        {dataset.status === AccessmodFilesetStatus.Invalid && (
          <Block className="flex items-center gap-2 text-gray-600">
            <XCircleIcon className="h-10 w-10 text-red-400" />
            <span className="flex-1">
              {t("This dataset is invalid. {{error}}", {
                error: dataset.metadata?.validation_error,
              })}
            </span>
            <Toggle>
              {({ toggle, isToggled }) => (
                <>
                  <Button onClick={toggle} variant="secondary">
                    {t("Edit")}
                  </Button>
                  <DatasetDialog
                    dataset={dataset}
                    onClose={toggle}
                    open={isToggled}
                  />
                </>
              )}
            </Toggle>
          </Block>
        )}
        <ErrorBoundary>
          <DatasetMetadataBlock dataset={dataset} />
        </ErrorBoundary>
        {dataset.status === AccessmodFilesetStatus.Valid && (
          <ErrorBoundary>
            <Block>
              <DatasetViewer dataset={dataset} project={data.project} />
            </Block>
          </ErrorBoundary>
        )}
      </PageContent>
    </Page>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async ({ params }, client) => {
    if (!params || !params.id || !params.datasetId) {
      return {
        notFound: true,
      };
    }
    const variables = {
      id: params.id as string,
      datasetId: params.datasetId as string,
    };

    await Layout.prefetch(client);
    await client.query({
      query: gql`
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
        ${DatasetDialog.fragments.dataset}
        ${DownloadDatasetButton.fragments.dataset}
        ${DatasetActionsMenu.fragments.dataset}
        ${DatasetActionsMenu.fragments.project}
        ${DeleteDatasetTrigger.fragments.dataset}
        ${DeleteDatasetTrigger.fragments.project}
        ${DatasetMetadataBlock.fragments.dataset}
        ${User.fragments.user}
        ${Team.fragments.team}
        ${DatasetViewer.fragments.dataset}
        ${DatasetViewer.fragments.project}
        ${DatasetStatusBadge.fragments.dataset}
      `,
      variables,
    });

    return {
      props: { defaultVariables: variables },
    };
  },
});

export default DatasetPage;
