import { gql } from "@apollo/client";
import DescriptionList from "components/DescriptionList";
import {
  AccessmodAnalysisStatus,
  AnalysisOutput_AnalysisFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";

type Props = {
  analysis: AnalysisOutput_AnalysisFragment;
};

const AnalysisOutput = ({ analysis }: Props) => {
  const { t } = useTranslation();
  if (analysis.status !== AccessmodAnalysisStatus.Success) {
    return null;
  }

  if (analysis.__typename === "AccessmodAccessibilityAnalysis") {
    return (
      <DescriptionList>
        {analysis.frictionSurface && (
          <DescriptionList.Item label={t("Friction Surface")}>
            {t("{{count}} files", {
              count: analysis.frictionSurface.files.length,
            })}
          </DescriptionList.Item>
        )}
        {analysis.travelTimes && (
          <DescriptionList.Item label={t("Travel Times")}>
            {t("{{count}} files", { count: analysis.travelTimes.files.length })}
          </DescriptionList.Item>
        )}
        {analysis.catchmentAreas && (
          <DescriptionList.Item label={t("Catchments Areas")}>
            {t("{{count}} files", {
              count: analysis.catchmentAreas.files.length,
            })}
          </DescriptionList.Item>
        )}
      </DescriptionList>
    );
  }

  return null;
};

AnalysisOutput.fragments = {
  analysis: gql`
    fragment AnalysisOutput_analysis on AccessmodAnalysis {
      __typename
      id
      status
      ... on AccessmodAccessibilityAnalysis {
        travelTimes {
          id
          name
          files {
            __typename
          }
        }
        frictionSurface {
          id
          name
          files {
            __typename
          }
        }
        catchmentAreas {
          id
          name
          files {
            __typename
          }
        }
      }
    }
  `,
};

export default AnalysisOutput;
