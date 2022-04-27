import { gql } from "@apollo/client";
import { ClockIcon, DocumentTextIcon } from "@heroicons/react/outline";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import type { Column } from "components/DataGrid";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import Time from "components/Time";
import DeleteDatasetTrigger from "features/dataset/DeleteDatasetTrigger";
import TabularDatasetTable from "features/dataset/TabularDatasetTable";
import VectorDatasetMap from "features/dataset/VectorDatasetMap";
import DownloadDatasetButton from "features/dataset/DownloadDatasetButton";
import User from "features/User";
import { getFormatLabel } from "libs/constants";
import {
  AccessmodFilesetFormat,
  useDatasetDetailPageQuery,
} from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import DatasetViewer from "features/dataset/DatasetViewer";
import { DateTime } from "luxon";

type Props = {
  defaultVariables: { id: string; datasetId: string };
};

const Classes = {
  activeTab:
    "whitespace-nowrap border-b-2 px-1.5 pb-2 text-lg font-medium border-lochmara text-lochmara",
  inactiveTab:
    "whitespace-nowrap border-b-2 px-1.5 pb-2 text-lg font-medium border-transparent text-lochmara-500 text-opacity-80 hover:border-lochmara hover:text-opacity-100",
};

const DatasetPage = ({ defaultVariables }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { loading, data } = useDatasetDetailPageQuery({
    pollInterval: 0,
    variables: defaultVariables,
  });

  const dataset = data?.dataset;

  const FILES_COLUMNS = useMemo<Column[]>(
    () => [
      { Header: t("Name") as string, accessor: "name" },
      { Header: t("Mimetype") as string, accessor: "mimeType" },
      {
        Header: t("Created") as string,
        accessor: "createdAt",
        Cell: (cell) => <Time datetime={cell.value} />,
      },
    ],
    [t]
  );

  if (!data?.project || !dataset || loading) {
    // Unknonwn project or not authorized
    return null;
  }

  const hasTabularData =
    dataset.role?.format === AccessmodFilesetFormat.Tabular;
  const hasMapData =
    dataset.role &&
    [AccessmodFilesetFormat.Raster, AccessmodFilesetFormat.Vector].includes(
      dataset.role.format
    );

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
              {dataset.role && (
                <div className="flex items-center">
                  <DocumentTextIcon className="mr-1.5 h-4" />
                  <span>
                    {dataset.role.name} ({getFormatLabel(dataset.role.format)})
                  </span>
                </div>
              )}
              <User user={dataset.author} small textColor="text-white" />
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
          <div className="flex items-center gap-2">
            <DeleteDatasetTrigger dataset={dataset} project={data.project} />
            <DownloadDatasetButton variant="primary" dataset={dataset} />
          </div>
        </div>
      </PageHeader>
      <PageContent className="space-y-4">
        <Block>
          <DatasetViewer dataset={dataset} project={data.project} />
        </Block>
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
        ${DownloadDatasetButton.fragments.dataset}
        ${DeleteDatasetTrigger.fragments.dataset}
        ${DeleteDatasetTrigger.fragments.project}
        ${User.fragments.user}
        ${DatasetViewer.fragments.dataset}
        ${DatasetViewer.fragments.project}
      `,
      variables,
    });

    return {
      props: { defaultVariables: variables },
    };
  },
});

export default DatasetPage;
