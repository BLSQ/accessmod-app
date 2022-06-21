import { gql } from "@apollo/client";
import {
  AnalysisForm_AnalysisFragment,
  AnalysisForm_ProjectFragment,
} from "libs/graphql";
import AccessibilityAnalysisForm from "./AccessibilityAnalysisForm";
import ZonalStatisticsForm from "./ZonalStatisticsForm";

type Props = {
  analysis: AnalysisForm_AnalysisFragment;
  project: AnalysisForm_ProjectFragment;
};

const AnalysisForm = ({ analysis, project }: Props) => {
  switch (analysis.__typename) {
    case "AccessmodAccessibilityAnalysis":
      return (
        <AccessibilityAnalysisForm analysis={analysis} project={project} />
      );
    case "AccessmodZonalStatistics":
      return <ZonalStatisticsForm analysis={analysis} project={project} />;
  }
  return null;
};

AnalysisForm.fragments = {
  project: gql`
    fragment AnalysisForm_project on AccessmodProject {
      ...AccessibilityAnalysisForm_project
      ...ZonalStatisticsForm_project
    }
    ${AccessibilityAnalysisForm.fragments.project}
    ${ZonalStatisticsForm.fragments.project}
  `,
  analysis: gql`
    fragment AnalysisForm_analysis on AccessmodAnalysis {
      ...AccessibilityAnalysisForm_analysis
      ...ZonalStatisticsForm_analysis
    }
    ${AccessibilityAnalysisForm.fragments.analysis}
    ${ZonalStatisticsForm.fragments.analysis}
  `,
};

export default AnalysisForm;
