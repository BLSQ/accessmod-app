import { gql } from "@apollo/client";
import DescriptionList from "components/DescriptionList";
import {
  ZonalStatisticsOutput_AnalysisFragment,
  ZonalStatisticsOutput_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";

type Props = {
  analysis: ZonalStatisticsOutput_AnalysisFragment;
  project: ZonalStatisticsOutput_ProjectFragment;
};

const ZonalStatisticsOutput = ({ analysis, project }: Props) => {
  const { t } = useTranslation();

  return (
    <DescriptionList>
      <DescriptionList.Item label={t("Statistics Table")}>
        {analysis.zonalStatisticsTable?.name ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Statistics Map")}>
        {analysis.zonalStatisticsGeo?.name ?? "-"}
      </DescriptionList.Item>
    </DescriptionList>
  );
};

ZonalStatisticsOutput.fragments = {
  project: gql`
    fragment ZonalStatisticsOutput_project on AccessmodProject {
      id
    }
  `,
  analysis: gql`
    fragment ZonalStatisticsOutput_analysis on AccessmodZonalStatistics {
      __typename
      id
      status
      zonalStatisticsTable {
        name
      }
      zonalStatisticsGeo {
        name
      }
    }
  `,
};

export default ZonalStatisticsOutput;
