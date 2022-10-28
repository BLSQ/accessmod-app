import { gql } from "@apollo/client";
import Button from "components/Button";
import Menu from "components/Menu";
import { displayAlert } from "libs/alert";
import { launchAnalysis } from "libs/analysis";
import {
  AccessmodAnalysisAuthorizedActions,
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

  const onRun = async () => {
    try {
      await launchAnalysis(analysis);
    } catch (err) {
      displayAlert(t("Impossible to launch analysis."), "error");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {analysis.status === AccessmodAnalysisStatus.Ready &&
        analysis.permissions.run && (
          <Button onClick={onRun} variant="primary">
            {t("Run")}
          </Button>
        )}

      <Menu label={t("Actions")}>
        {[
          AccessmodAnalysisStatus.Ready,
          AccessmodAnalysisStatus.Draft,
        ].includes(analysis.status) &&
          analysis.permissions.update && (
            <Menu.Item>
              <Link
                href={{
                  pathname: routes.project_analysis_edit,
                  query: { projectId: project.id, analysisId: analysis.id },
                }}
              >
                <a className="-mx-2 -my-2 block flex-1 px-2 py-2 text-left">
                  {t("Edit")}
                </a>
              </Link>
            </Menu.Item>
          )}

        {![
          AccessmodAnalysisStatus.Running,
          AccessmodAnalysisStatus.Queued,
        ].includes(analysis.status) &&
          analysis.permissions.delete && (
            <Menu.Item
              onClick={onDeleteClick}
              activeClassName="bg-red-500 text-white"
            >
              {t("Delete")}
            </Menu.Item>
          )}
      </Menu>
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
      permissions {
        update
        delete
        run
      }
    }
  `,
};

export default AnalysisActionsButton;
