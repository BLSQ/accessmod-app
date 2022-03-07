import { gql } from "@apollo/client";
import ButtonGroup, { ButtonGroupOption } from "components/ButtonGroup";
import {
  AccessmodAnalysisStatus,
  AnalysisActionsButton_AnalysisFragment,
  AnalysisActionsButton_ProjectFragment,
} from "libs/graphql";
import { routes } from "libs/router";
import { useRouter } from "next/router";
import { useMemo } from "react";

type Props = {
  project: AnalysisActionsButton_ProjectFragment;
  analysis: AnalysisActionsButton_AnalysisFragment;
};

const AnalysisActionsButton = ({ project, analysis }: Props) => {
  const router = useRouter();

  const onDeleteClick = async () => {
    // TODO: Implement permissions check
    if (
      window.confirm(
        `Are you sure you want to delete the project "${analysis.name}"?`
      )
    ) {
      router.push(routes.project_analysis, { query: project.id });
    }
  };

  const items = useMemo<ButtonGroupOption[]>(() => {
    const actions = [];
    if (analysis.status === AccessmodAnalysisStatus.Ready) {
      actions.push({
        label: "Run",
        onClick: () => {
          console.log("run analysis");
        },
      });
    }

    if (
      [AccessmodAnalysisStatus.Ready, AccessmodAnalysisStatus.Draft].includes(
        analysis.status
      )
    )
      actions.push({
        label: "Edit",
        onClick: () => {
          router.push({
            pathname: routes.project_analysis_edit,
            query: { projectId: project.id, analysisId: analysis.id },
          });
        },
      });

    if (
      ![
        AccessmodAnalysisStatus.Running,
        AccessmodAnalysisStatus.Queued,
      ].includes(analysis.status)
    ) {
      actions.push({ label: "Delete", onClick: onDeleteClick });
    }

    return actions;
  }, [analysis]);

  if (!items.length) {
    return null;
  }

  return <ButtonGroup items={items} />;
};

AnalysisActionsButton.fragments = {
  project: gql`
    fragment AnalysisActionsButton_project on AccessmodProject {
      id
      name
    }
  `,
  analysis: gql`
    fragment AnalysisActionsButton_analysis on AccessmodAnalysis {
      id
      name
      status
      type
    }
  `,
};

export default AnalysisActionsButton;
