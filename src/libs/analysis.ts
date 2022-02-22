import { ANALYSIS, AnalysisComponents } from "features/analysis";
import {
  AccessmodAnalysisStatus,
  AccessmodAnalysisType,
  AnalysisDetailPageDocument,
} from "./graphql";

export function getAnalysisTypeFromTypename(__typename: string): string {
  switch (__typename) {
    case "AccessmodAccessibilityAnalysis":
      return "Accessibility";
    default:
      return "Base Analysis";
  }
}

export function getAnalysisStatusLabel(
  status: AccessmodAnalysisStatus
): string {
  switch (status) {
    case AccessmodAnalysisStatus.Pending:
      return "Pending";
    case AccessmodAnalysisStatus.Failed:
      return "Failed";
    case AccessmodAnalysisStatus.Queued:
      return "Queued";
    case AccessmodAnalysisStatus.Ready:
      return "Ready";
    case AccessmodAnalysisStatus.Running:
      return "Running";
    case AccessmodAnalysisStatus.Success:
      return "Success";
  }
}

export function getAnalysisComponentsFromTypename(
  __typename?: string
): AnalysisComponents | undefined {
  if (__typename === "AccessmodAccessibilityAnalysis") {
    return ANALYSIS[AccessmodAnalysisType.Accessibility];
  }
}