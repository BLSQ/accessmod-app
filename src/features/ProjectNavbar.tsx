import { gql } from "@apollo/client";
import Aside from "components/Aside";
import { ProjectNavbar_ProjectFragment } from "libs/graphql";

const ProjectNavbar = (props: {
  project: ProjectNavbar_ProjectFragment;
  className?: string;
}) => {
  const { project, className } = props;
  return (
    <Aside as="nav" className={className}>
      <Aside.LinkItem href={`/projects/${encodeURIComponent(project.id)}/`}>
        Project Summary
      </Aside.LinkItem>
      <Aside.LinkItem
        href={`/projects/${encodeURIComponent(project.id)}/analysis`}
      >
        Analysis
      </Aside.LinkItem>
      <Aside.LinkItem
        href={`/projects/${encodeURIComponent(project.id)}/datasets`}
      >
        Datasets
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
