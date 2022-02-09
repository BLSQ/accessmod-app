import { gql } from "@apollo/client";
import Block from "components/Block";
import { ProjectNavbar_ProjectFragment } from "libs/graphql";
import Link from "next/link";

const ProjectNavbar = (props: { project: ProjectNavbar_ProjectFragment }) => {
  const { project } = props;
  return (
    <Block
      as="nav"
      className="bg-who-blue-dark text-white basis-56 px-3 py-4 min-w-fit"
    >
      <ul className="list-none">
        <li className="w-full transition-all hover:bg-who-blue-light rounded-md">
          <Link href={`/projects/${encodeURIComponent(project.id)}/`}>
            <a className="flex px-3 py-2 ">Project Summary</a>
          </Link>
        </li>
        <li className="w-full transition-all hover:bg-who-blue-light rounded-md">
          <Link href={`/projects/${encodeURIComponent(project.id)}/analysis`}>
            <a className="flex px-3 py-2 ">Analyses</a>
          </Link>
        </li>
        <li className="w-full transition-all hover:bg-who-blue-light rounded-md">
          <Link href={`/projects/${encodeURIComponent(project.id)}/data`}>
            <a className="flex px-3 py-2 ">Data</a>
          </Link>
        </li>
      </ul>
    </Block>
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
