import { gql } from "@apollo/client";
import { LinkIcon } from "@heroicons/react/outline";
import DescriptionList from "components/DescriptionList";
import {
  ZonalStatisticsParameters_AnalysisFragment,
  ZonalStatisticsParameters_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import Link from "next/link";

type Props = {
  analysis: ZonalStatisticsParameters_AnalysisFragment;
  project: ZonalStatisticsParameters_ProjectFragment;
};

const ZonalStatisticsParameters = ({ analysis, project }: Props) => {
  const { t } = useTranslation();

  return (
    <DescriptionList>
      <DescriptionList.Item label={t("Population")}>
        {analysis.population ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.population.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.population.name ?? "-"}
              <LinkIcon className="ml-1 inline w-4" />
            </a>
          </Link>
        ) : (
          "-"
        )}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Boundaries")}>
        {analysis.boundaries ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.boundaries.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.boundaries.name ?? "-"}
              <LinkIcon className="ml-1 inline w-4" />
            </a>
          </Link>
        ) : (
          "-"
        )}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Time Thresholds")}>
        {analysis.timeThresholds.join(", ") ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Travel Times")}>
        {analysis.travelTimes ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.travelTimes.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.travelTimes.name ?? "-"}
              <LinkIcon className="ml-1 inline w-4" />
            </a>
          </Link>
        ) : (
          "-"
        )}
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
        id
      }
      travelTimes {
        name
        id
      }
      timeThresholds
      boundaries {
        name
        id
      }
    }
  `,
};

export default ZonalStatisticsParameters;
