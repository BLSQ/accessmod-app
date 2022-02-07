import ProjectCard from "./ProjectCard";
import { gql } from "@apollo/client";
import { ProjectsList_ProjectsFragment } from "libs/graphql";

type Props = {
  projects: ProjectsList_ProjectsFragment;
};

const ProjectsList = (props: Props) => {
  const { projects } = props;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {projects.items.map((project) => (
        <li key={project.id} className="col-span-1">
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
};

ProjectsList.fragments = {
  projects: gql`
    fragment ProjectsList_projects on AccessmodProjectPage {
      items {
        id
        ...ProjectCard_project
      }
      pageNumber
      totalPages
    }
    ${ProjectCard.fragments.project}
  `,
};

export default ProjectsList;