import { gql } from "@apollo/client";
import DescriptionList from "components/DescriptionList";
import {
  AccessibilityAnalysisParameters_AnalysisFragment,
  AccessibilityAnalysisParameters_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import Link from "next/link";

type Props = {
  analysis: AccessibilityAnalysisParameters_AnalysisFragment;
  project: AccessibilityAnalysisParameters_ProjectFragment;
};

const AccessibilityAnalysisParameters = ({ analysis, project }: Props) => {
  const { t } = useTranslation();

  if (analysis.__typename !== "AccessmodAccessibilityAnalysis") {
    return null;
  }
  return (
    <DescriptionList>
      <DescriptionList.Item label={t("Land cover")}>
        {analysis.landCover ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.landCover.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.landCover.name}
            </a>
          </Link>
        ) : (
          "-"
        )}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Transport network")}>
        {analysis.transportNetwork ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.transportNetwork.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.transportNetwork.name}
            </a>
          </Link>
        ) : (
          "-"
        )}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Digital elevation model")}>
        {analysis.dem ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.dem.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.dem.name}
            </a>
          </Link>
        ) : (
          "-"
        )}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Stack")}>
        {analysis.stack ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.stack.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.stack.name}
            </a>
          </Link>
        ) : (
          "-"
        )}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Health facilities")}>
        {analysis.healthFacilities ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.healthFacilities.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.healthFacilities.name}
            </a>
          </Link>
        ) : (
          "-"
        )}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Barriers")}>
        {analysis.barrier ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.barrier.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.barrier.name}
            </a>
          </Link>
        ) : (
          "-"
        )}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Water")}>
        {analysis.water ? (
          <Link
            href={`/projects/${encodeURIComponent(
              project.id
            )}/datasets/${encodeURIComponent(analysis.water.id)}/`}
          >
            <a className="flex items-center text-gray-800 hover:text-gray-600">
              {analysis.water.name}
            </a>
          </Link>
        ) : (
          "-"
        )}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Travel Scenario")}>
        {Object.keys(analysis.movingSpeeds ?? {}) ? (
          <table className="who">
            <thead>
              <tr>
                <th>{t("Class")}</th>
                <th>{t("Speed (in km/h)")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries<[string, string]>(analysis.movingSpeeds).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          t("No travel scenario")
        )}
      </DescriptionList.Item>
    </DescriptionList>
  );
};

AccessibilityAnalysisParameters.fragments = {
  project: gql`
    fragment AccessibilityAnalysisParameters_project on AccessmodProject {
      id
    }
  `,
  analysis: gql`
    fragment AccessibilityAnalysisParameters_analysis on AccessmodAccessibilityAnalysis {
      __typename
      id
      landCover {
        id
        name
      }
      transportNetwork {
        id
        name
      }
      water {
        id
        name
      }
      barrier {
        id
        name
      }
      stack {
        id
        name
      }
      dem {
        id
        name
      }
      stackPriorities
      movingSpeeds
      healthFacilities {
        id
        name
      }
    }
  `,
};

export default AccessibilityAnalysisParameters;
