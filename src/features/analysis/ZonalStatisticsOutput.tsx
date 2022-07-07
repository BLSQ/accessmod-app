import Link from "next/link";
import { useTranslation } from "next-i18next";
import { gql } from "@apollo/client";
import { LinkIcon } from "@heroicons/react/outline";
import DescriptionList from "components/DescriptionList";
import {
  ZonalStatisticsOutput_AnalysisFragment,
  ZonalStatisticsOutput_ProjectFragment,
} from "libs/graphql";

type Props = {
  analysis: ZonalStatisticsOutput_AnalysisFragment;
  project: ZonalStatisticsOutput_ProjectFragment;
};

const ZonalStatisticsOutput = ({ analysis, project }: Props) => {
  const { t } = useTranslation();

  return (
    <DescriptionList>
      {analysis.zonalStatisticsTable && (
        <DescriptionList.Item label={t("Statistics Table")}>
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(
              analysis.zonalStatisticsTable.id
            )}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.zonalStatisticsTable.name}
              <LinkIcon className="ml-1 inline w-4" />{" "}
            </a>
          </Link>
        </DescriptionList.Item>
      )}
      {analysis.zonalStatisticsGeo && (
        <DescriptionList.Item label={t("Statistics Map")}>
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.zonalStatisticsGeo.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.zonalStatisticsGeo.name}
              <LinkIcon className="ml-1 inline w-4" />{" "}
            </a>
          </Link>
        </DescriptionList.Item>
      )}
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
        id
      }
      zonalStatisticsGeo {
        name
        id
      }
    }
  `,
};

export default ZonalStatisticsOutput;
