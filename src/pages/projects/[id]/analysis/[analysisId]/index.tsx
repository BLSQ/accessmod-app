import { gql } from "@apollo/client";
import Block from "components/Block";
import Layout, { PageHeader } from "components/layouts/Layout";
import AnalysisActionsButton from "features/analysis/AnalysisActionsButton";
import AnalysisStatus from "features/analysis/AnalysisStatus";
import ProjectNavbar from "features/ProjectNavbar";
import User from "features/User";
import { getLabelFromAnalysisType } from "libs/analysis";
import { useAnalysisDetailPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { NextPageWithLayout } from "libs/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const AnalysisPage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { loading, data } = useAnalysisDetailPageQuery({
    variables: {
      id: router.query.id as string,
      analysisId: router.query.analysisId as string,
    },
  });

  if (!data?.project || !data.analysis || loading) {
    // Unknonwn project or not authorized
    return null;
  }

  return (
    <>
      <PageHeader className="pb-4">
        <h1 className="text-3xl font-bold text-white">{data.project?.name}</h1>
      </PageHeader>
      <div className="flex-1 grid grid-cols-12 gap-4 lg:gap-8">
        <ProjectNavbar
          className="col-span-3 xl:col-span-2"
          project={data.project}
        />
        <div className="col-span-9 xl:col-span-10 space-y-4">
          <div>
            <h2 className="text-white font-medium mb-3 flex justify-between">
              <span>{data.analysis.name}</span>
              <AnalysisActionsButton
                analysis={data.analysis}
                project={data.project}
              />
            </h2>
            <Block>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {t("Status")}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 col-span-2">
                    <AnalysisStatus analysis={data.analysis} />
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {t("Analysis Type")}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 col-span-2">
                    {getLabelFromAnalysisType(data.analysis.type)}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {t("Owner")}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 col-span-2">
                    <User user={data.analysis.owner} />
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {t("Name")}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 col-span-2">
                    {data.analysis.name}
                  </dd>
                </div>
              </dl>
            </Block>
          </div>

          {data.analysis.__typename === "AccessmodAccessibilityAnalysis" && (
            <div>
              <h3 className="font-medium mb-2 flex justify-between">
                {t("Input Parameters")}
              </h3>
              <Block>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {t("Land Cover")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 col-span-2">
                      {data.analysis.landCover?.name ?? "Automatic"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {t("Barrier")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 col-span-2">
                      {data.analysis.barrier?.name ?? "Automatic"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {t("Water")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 col-span-2">
                      {data.analysis.water?.name ?? "Automatic"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {t("Health Facilities")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 col-span-2">
                      {data.analysis.healthFacilities?.name ?? "Automatic"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {t("Slope")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 col-span-2">
                      {data.analysis.slope?.name ?? "Automatic"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {t("Travel Scenario")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 col-span-2">
                      {data.analysis.movingSpeeds?.name ?? "Automatic"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {t("Transport Network")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 col-span-2">
                      {data.analysis.transportNetwork?.name ?? "Automatic"}
                    </dd>
                  </div>
                </dl>
              </Block>
            </div>
          )}
          <div>
            <h3 className="font-medium mb-2 flex justify-between">
              {t("Output")}
            </h3>
            <Block>
              <div className="w-full text-sm text-gray-500 text-center italic">
                Nothing Yet
              </div>
            </Block>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async ({ params }, client) => {
    if (!params || !params.id || !params.analysisId) {
      return {
        notFound: true,
      };
    }
    await Layout.prefetch(client);
    await client.query({
      query: gql`
        query AnalysisDetailPage($id: String!, $analysisId: String!) {
          project: accessmodProject(id: $id) {
            id
            name
            ...ProjectNavbar_project
            ...AnalysisActionsButton_project
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
            owner {
              ...User_user
            }

            ... on AccessmodAccessibilityAnalysis {
              landCover {
                name
              }
              transportNetwork {
                name
              }
              slope {
                name
              }
              water {
                name
              }
              barrier {
                name
              }
              movingSpeeds {
                name
              }
              healthFacilities {
                name
              }
            }
          }
        }
        ${ProjectNavbar.fragments.project}
        ${AnalysisActionsButton.fragments.project}
        ${AnalysisActionsButton.fragments.analysis}
        ${AnalysisStatus.fragments.analysis}
        ${User.fragments.user}
      `,
      variables: {
        id: params.id as string,
        analysisId: params.analysisId as string,
      },
    });
  },
});

export default AnalysisPage;
