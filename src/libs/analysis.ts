import { gql } from "@apollo/client";
import { i18n } from "next-i18next";
import { getApolloClient } from "./apollo";
import {
  AccessmodAnalysisStatus,
  AccessmodAnalysisType,
  CreateAccessibilityAnalysisMutation,
  CreateAccessmodAccessibilityAnalysisInput,
  CreateAccessmodZonalStatisticsInput,
  CreateZonalStatisticsMutation,
} from "./graphql";

export function getLabelFromAnalysisType(type: AccessmodAnalysisType): string {
  switch (type) {
    case AccessmodAnalysisType.Accessibility:
      return i18n!.t("Accessibility Analysis");
    case AccessmodAnalysisType.ZonalStatistics:
      return i18n!.t("Zonal Statistics");
    default:
      return "Analysis";
  }
}

export function getAnalysisStatusLabel(
  status: AccessmodAnalysisStatus
): string {
  switch (status) {
    case AccessmodAnalysisStatus.Draft:
      return i18n!.t("Draft");
    case AccessmodAnalysisStatus.Failed:
      return i18n!.t("Failed");
    case AccessmodAnalysisStatus.Queued:
      return i18n!.t("Queued");
    case AccessmodAnalysisStatus.Ready:
      return i18n!.t("Ready");
    case AccessmodAnalysisStatus.Running:
      return i18n!.t("Running");
    case AccessmodAnalysisStatus.Success:
      return i18n!.t("Success");
  }
}

export async function createAnalysis(
  type: AccessmodAnalysisType,
  input:
    | CreateAccessmodAccessibilityAnalysisInput
    | CreateAccessmodZonalStatisticsInput
) {
  const client = getApolloClient();
  switch (type) {
    case AccessmodAnalysisType.Accessibility:
      return client.mutate<CreateAccessibilityAnalysisMutation>({
        mutation: gql`
          mutation CreateAccessibilityAnalysis(
            $input: CreateAccessmodAccessibilityAnalysisInput!
          ) {
            result: createAccessmodAccessibilityAnalysis(input: $input) {
              success
              analysis {
                id
              }
              errors
            }
          }
        `,
        variables: { input },
      });
    case AccessmodAnalysisType.ZonalStatistics:
      return client.mutate<CreateZonalStatisticsMutation>({
        mutation: gql`
          mutation CreateZonalStatistics(
            $input: CreateAccessmodZonalStatisticsInput!
          ) {
            result: createAccessmodZonalStatistics(input: $input) {
              success
              analysis {
                id
              }
              errors
            }
          }
        `,
        variables: { input },
      });
    default:
      throw new Error("Unknown Type");
  }
}

export async function launchAnalysis(analysis: { id: string }): Promise<void> {
  const client = getApolloClient();
  try {
    const { data } = await client.mutate({
      mutation: gql`
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
      `,
      variables: {
        input: { id: analysis.id },
      },
    });
    if (!data.launchAccessmodAnalysis.success) {
      throw new Error("Impossible to launch analysis");
    }
  } catch (err) {
    throw err;
  }
}

export const ANALYSES_OPTIONS = [
  {
    value: AccessmodAnalysisType.Accessibility,
    label: "Accessibility Analysis",
    description:
      "Compute the traveling time surface, informing the time needed to reach the nearest health facility.",
  },
  {
    value: AccessmodAnalysisType.ZonalStatistics,
    label: "Zonal Statistics Analysis",
    description:
      "Compute the percentage of the population being covered in each sub national division.",
  },
];
