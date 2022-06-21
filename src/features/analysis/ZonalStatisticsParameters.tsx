import { gql } from "@apollo/client";
import DescriptionList from "components/DescriptionList";
import {
  ZonalStatisticsParameters_AnalysisFragment,
  ZonalStatisticsParameters_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";

type Props = {
  analysis: ZonalStatisticsParameters_AnalysisFragment;
  project: ZonalStatisticsParameters_ProjectFragment;
};

const ZonalStatisticsParameters = ({ analysis }: Props) => {
  const { t } = useTranslation();

  return (
    <DescriptionList>
      <DescriptionList.Item label={t("Population")}>
        {analysis.population?.name ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Boundaries")}>
        {analysis.boundaries?.name ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Time Thresholds")}>
        {analysis.timeThresholds.join(", ") ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Travel Times")}>
        {analysis.travelTimes?.name ?? "-"}
      </DescriptionList.Item>
    </DescriptionList>
  );
};

ZonalStatisticsParameters.fragments = {
  project: gql`
    fragment ZonalStatisticsParameters_project on AccessmodProject {
      id
    }
  `,
  analysis: gql`
    fragment ZonalStatisticsParameters_analysis on AccessmodZonalStatistics {
      __typename
      id
      population {
        name
      }
      travelTimes {
        name
      }
      timeThresholds
      boundaries {
        name
      }
    }
  `,
};

export default ZonalStatisticsParameters;
