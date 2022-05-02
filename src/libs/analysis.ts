import { gql } from "@apollo/client";
import { i18n } from "next-i18next";
import { getApolloClient } from "./apollo";
import { AccessmodAnalysisStatus, AccessmodAnalysisType } from "./graphql";

export function getLabelFromAnalysisType(type: AccessmodAnalysisType): string {
  switch (type) {
    case AccessmodAnalysisType.Accessibility:
      return i18n!.t("Accessibility Analysis");
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

export async function launchAnalysis(analysis: {
  id: string;
}): Promise<boolean> {
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

    return data.launchAccessmodAnalysis.success;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const ANALYSES_OPTIONS = [
  {
    value: AccessmodAnalysisType.Accessibility,
    label: "Accessibility Analysis",
    description:
      "Compute the traveling time surface, informing the time needed to reach the nearest health facility.",
  },
];
