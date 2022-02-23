import { AccessmodAnalysisType } from "libs/graphql";
import { ElementType } from "react";
import AccessibilityAnalysisForm from "./AccessibilityAnalysisForm";
import AccessibilityAnalysisSidebar from "./AccessibilityAnalysisSidebar";

export type AnalysisComponents = {
  label: string;
  Aside: ElementType<any>;
  Form: ElementType<any>;
};

export const ANALYSIS: { [key: string]: AnalysisComponents } = {
  [AccessmodAnalysisType.Accessibility]: {
    label: "Accessibility Analysis",
    Aside: AccessibilityAnalysisSidebar,
    Form: AccessibilityAnalysisForm,
  },
};
