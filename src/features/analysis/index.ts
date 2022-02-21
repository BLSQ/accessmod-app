import { ElementType } from "react";
import AccessibilityAnalysisForm from "./AccessibilityAnalysisForm";
import AccessibilityAnalysisSidebar from "./AccessibilityAnalysisSidebar";

type AnalysisRegistry = {
  [key: string]: {
    label: string;
    Aside: ElementType<any>;
    Form: ElementType<any>;
  };
};

export const ANALYSIS: AnalysisRegistry = {
  accessibility: {
    label: "Accessibility Analysis",
    Aside: AccessibilityAnalysisSidebar,
    Form: AccessibilityAnalysisForm,
  },
};
