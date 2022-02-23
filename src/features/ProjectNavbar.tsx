import { gql } from "@apollo/client";
import Aside from "components/Aside";
import { ProjectNavbar_ProjectFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";

const ProjectNavbar = (props: {
  project: ProjectNavbar_ProjectFragment;
  className?: string;
}) => {
  const { t } = useTranslation();
  const { project, className } = props;
  return (
    <Aside as="nav" className={className}>
      <Aside.LinkItem href={`/projects/${encodeURIComponent(project.id)}/`}>
        {t("Project Summary")}
      </Aside.LinkItem>
      <Aside.LinkItem
        href={`/projects/${encodeURIComponent(project.id)}/analysis`}
      >
        {t("Analysis")}
      </Aside.LinkItem>
      <Aside.LinkItem
        href={`/projects/${encodeURIComponent(project.id)}/datasets`}
      >
        {t("Datasets")}
      </Aside.LinkItem>
    </Aside>
  );
};

ProjectNavbar.fragments = {
  project: gql`
    fragment ProjectNavbar_project on AccessmodProject {
      id
    }
  `,
};

export default ProjectNavbar;
