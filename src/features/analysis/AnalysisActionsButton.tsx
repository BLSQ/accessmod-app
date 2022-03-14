import { gql } from "@apollo/client";
import Button from "components/Button";
import {
  AccessmodAnalysisStatus,
  AnalysisActionsButton_AnalysisFragment,
  AnalysisActionsButton_ProjectFragment,
} from "libs/graphql";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  project: AnalysisActionsButton_ProjectFragment;
  analysis: AnalysisActionsButton_AnalysisFragment;
};

const AnalysisActionsButton = ({ project, analysis }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const onDeleteClick = async () => {
    // TODO: Implement permissions check
    if (
      window.confirm(
        t('Are you sure you want to delete the analysis "{{name}}"?', {
          name: analysis.name,
        })
      )
    ) {
      router.push(routes.project_analysis, { query: project.id });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {analysis.status === AccessmodAnalysisStatus.Ready && (
        <Button variant="primary">{t("Run")}</Button>
      )}
      {[AccessmodAnalysisStatus.Ready, AccessmodAnalysisStatus.Draft].includes(
        analysis.status
      ) && (
        <Link
          href={{
            pathname: routes.project_analysis_edit,
            query: { projectId: project.id, analysisId: analysis.id },
          }}
        >
          <a>
            <Button variant="white">{t("Edit")}</Button>
          </a>
        </Link>
      )}
      {![
        AccessmodAnalysisStatus.Running,
        AccessmodAnalysisStatus.Queued,
      ].includes(analysis.status) && (
        <Button variant="outlined" onClick={onDeleteClick}>
          {t("Delete")}
        </Button>
      )}
    </div>
  );
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
