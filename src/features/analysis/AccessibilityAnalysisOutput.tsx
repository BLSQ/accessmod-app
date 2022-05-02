import { gql } from "@apollo/client";
import { LinkIcon } from "@heroicons/react/outline";
import DescriptionList from "components/DescriptionList";
import {
  AccessibilityAnalysisOutput_AnalysisFragment,
  AccessibilityAnalysisOutput_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import Link from "next/link";

type Props = {
  analysis: AccessibilityAnalysisOutput_AnalysisFragment;
  project: AccessibilityAnalysisOutput_ProjectFragment;
};

const AccessibilityAnalysisOutput = ({ analysis, project }: Props) => {
  const { t } = useTranslation();

  return (
    <DescriptionList>
      {analysis.frictionSurface && (
        <DescriptionList.Item label={t("Friction Surface")}>
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.frictionSurface.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.frictionSurface.name}
              <LinkIcon className="ml-1 inline w-4" />{" "}
            </a>
          </Link>
        </DescriptionList.Item>
      )}
      {analysis.travelTimes && (
        <DescriptionList.Item label={t("Travel Times")}>
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.travelTimes.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.travelTimes.name}
              <LinkIcon className="ml-1 inline w-4" />{" "}
            </a>
          </Link>
        </DescriptionList.Item>
      )}
      {analysis.catchmentAreas && (
        <DescriptionList.Item label={t("Catchments Areas")}>
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.catchmentAreas.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.catchmentAreas.name}
              <LinkIcon className="ml-1 inline w-4" />{" "}
            </a>
          </Link>
        </DescriptionList.Item>
      )}
    </DescriptionList>
  );
};

AccessibilityAnalysisOutput.fragments = {
  project: gql`
    fragment AccessibilityAnalysisOutput_project on AccessmodProject {
      id
    }
  `,
  analysis: gql`
    fragment AccessibilityAnalysisOutput_analysis on AccessmodAnalysis {
      __typename
      id
      status
      ... on AccessmodAccessibilityAnalysis {
        travelTimes {
          name
          id
        }
        frictionSurface {
          name
          id
        }
        catchmentAreas {
          name
          id
        }
      }
    }
  `,
};

export default AccessibilityAnalysisOutput;
