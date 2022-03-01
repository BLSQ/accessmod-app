import { gql } from "@apollo/client";
import DescriptionList from "components/DescriptionList";
import DownloadDatasetButton from "features/DownloadDatasetButton";
import {
  AccessmodAnalysisStatus,
  AnalysisOutput_AnalysisFragment,
  DownloadDatasetButton_DatasetFragmentDoc,
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
            <DownloadDatasetButton
              dataset={analysis.frictionSurface}
              variant="secondary"
              size="sm"
            >
              {t("Download {{count}} files", {
                count: analysis.frictionSurface.files.length,
              })}
            </DownloadDatasetButton>
          </DescriptionList.Item>
        )}
        {analysis.travelTimes && (
          <DescriptionList.Item label={t("Travel Times")}>
            <DownloadDatasetButton
              variant="secondary"
              size="sm"
              dataset={analysis.travelTimes}
            >
              {t("Download {{count}} files", {
                count: analysis.travelTimes.files.length,
              })}
            </DownloadDatasetButton>
          </DescriptionList.Item>
        )}
        {analysis.catchmentAreas && (
          <DescriptionList.Item label={t("Catchments Areas")}>
            <DownloadDatasetButton
              dataset={analysis.catchmentAreas}
              variant="secondary"
              size="sm"
            >
              {t("Download {{count}} files", {
                count: analysis.catchmentAreas.files.length,
              })}
            </DownloadDatasetButton>
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
          ...DownloadDatasetButton_dataset
        }
        frictionSurface {
          ...DownloadDatasetButton_dataset
        }
        catchmentAreas {
          ...DownloadDatasetButton_dataset
        }
      }
    }
    ${DownloadDatasetButton_DatasetFragmentDoc}
  `,
};

export default AnalysisOutput;
