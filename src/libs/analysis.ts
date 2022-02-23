import { ANALYSIS, AnalysisComponents } from "features/analysis";
import { i18n } from "next-i18next";
import { AccessmodAnalysisStatus, AccessmodAnalysisType } from "./graphql";

export function getLabelFromAnalysisType(type: AccessmodAnalysisType): string {
  switch (type) {
    case AccessmodAnalysisType.Accessibility:
      return i18n!.t("Accessibility");
    default:
      return "Analysis";
  }
}

export function getAnalysisStatusLabel(
  status: AccessmodAnalysisStatus
): string {
  switch (status) {
    case AccessmodAnalysisStatus.Draft:
      return i18n!.t("Draft");
    case AccessmodAnalysisStatus.Failed:
      return i18n!.t("Failed");
    case AccessmodAnalysisStatus.Queued:
      return i18n!.t("Queued");
    case AccessmodAnalysisStatus.Ready:
      return i18n!.t("Ready");
    case AccessmodAnalysisStatus.Running:
      return i18n!.t("Running");
    case AccessmodAnalysisStatus.Success:
      return i18n!.t("Success");
  }
}

export function getAnalysisComponentsFromTypename(
  __typename?: string
): AnalysisComponents | undefined {
  if (__typename === "AccessmodAccessibilityAnalysis") {
    return ANALYSIS[AccessmodAnalysisType.Accessibility];
  }
}
