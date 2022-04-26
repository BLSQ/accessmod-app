import ProjectCard from "./ProjectCard";
import { gql } from "@apollo/client";
import { ProjectsList_ProjectsFragment } from "libs/graphql";
import { useRouter } from "next/router";

type Props = {
  projects: ProjectsList_ProjectsFragment;
};

const ProjectsList = (props: Props) => {
  const { projects } = props;
  const router = useRouter();

  return (
    <ul
      role="list"
      className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
    >
      {projects.items.map((project) => (
        <li key={project.id} className="col-span-1">
          <ProjectCard
            project={project}
            className="h-full"
            onClick={() =>
              router.push(`/projects/${encodeURIComponent(project.id)}`)
            }
          />
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
