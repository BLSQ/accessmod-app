import { gql } from "@apollo/client";
import DescriptionList from "components/DescriptionList";
import {
  AccessibilityAnalysisParameters_AnalysisFragment,
  AccessibilityAnalysisParameters_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";

type Props = {
  analysis: AccessibilityAnalysisParameters_AnalysisFragment;
  project: AccessibilityAnalysisParameters_ProjectFragment;
};

const AccessibilityAnalysisParameters = ({ analysis }: Props) => {
  const { t } = useTranslation();

  if (analysis.__typename !== "AccessmodAccessibilityAnalysis") {
    return null;
  }
  return (
    <DescriptionList>
      <DescriptionList.Item label={t("Land cover")}>
        {analysis.landCover?.name ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Transport network")}>
        {analysis.transportNetwork?.name ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Digital elevation model")}>
        {analysis.dem?.name ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Stack")}>
        {analysis.stack?.name ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Health facilities")}>
        {analysis.healthFacilities?.name ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Barriers")}>
        {analysis.barrier?.name ?? "-"}
      </DescriptionList.Item>
      <DescriptionList.Item label={t("Water")}>
        {analysis.water?.name ?? "-"}
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
