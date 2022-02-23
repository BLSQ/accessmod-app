import { ANALYSIS, AnalysisComponents } from "features/analysis";
import { AccessmodAnalysisStatus, AccessmodAnalysisType } from "./graphql";

export function getLabelFromAnalysisType(type: AccessmodAnalysisType): string {
  switch (type) {
    case AccessmodAnalysisType.Accessibility:
      return "Accessibility";
    default:
      return "Base Analysis";
  }
}

export function getAnalysisStatusLabel(
  status: AccessmodAnalysisStatus
): string {
  switch (status) {
    case AccessmodAnalysisStatus.Draft:
      return "Draft";
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
