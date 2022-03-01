import { gql } from "@apollo/client";
import {
  AnalysisForm_AnalysisFragment,
  AnalysisForm_ProjectFragment,
} from "libs/graphql";
import AccessibilityAnalysisForm from "./AccessibilityAnalysisForm";

type Props = {
  analysis: AnalysisForm_AnalysisFragment;
  project: AnalysisForm_ProjectFragment;
};

const AnalysisForm = ({ analysis, project }: Props) => {
  if (analysis.__typename === "AccessmodAccessibilityAnalysis") {
    return <AccessibilityAnalysisForm analysis={analysis} project={project} />;
  }
  return null;
};

AnalysisForm.fragments = {
  project: gql`
    fragment AnalysisForm_project on AccessmodProject {
      ...AccessibilityAnalysisForm_project
    }
    ${AccessibilityAnalysisForm.fragments.project}
  `,
  analysis: gql`
    fragment AnalysisForm_analysis on AccessmodAnalysis {
      ...AccessibilityAnalysisForm_analysis
    }
    ${AccessibilityAnalysisForm.fragments.analysis}
  `,
};

export default AnalysisForm;
