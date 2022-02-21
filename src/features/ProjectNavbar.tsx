import { gql } from "@apollo/client";
import clsx from "clsx";
import Block from "components/Block";
import { ProjectNavbar_ProjectFragment } from "libs/graphql";
import Link from "next/link";

const ProjectNavbar = (props: {
  project: ProjectNavbar_ProjectFragment;
  className?: string;
}) => {
  const { project, className } = props;
  return (
    <Block
      as="nav"
      background="bg-midnight-blue"
      className={clsx(
        "   text-white w-full py-4 md:px-4 xl:px-7 md:py-6 h-72",
        className
      )}
    >
      <ul className="list-none">
        <li className="w-full transition-all hover:bg-who-blue-light rounded-md">
          <Link href={`/projects/${encodeURIComponent(project.id)}/`}>
            <a className="flex px-3 py-2 ">Project Summary</a>
          </Link>
        </li>
        <li className="w-full transition-all hover:bg-who-blue-light rounded-md">
          <Link href={`/projects/${encodeURIComponent(project.id)}/analysis`}>
            <a className="flex px-3 py-2 ">Analysis</a>
          </Link>
        </li>
        <li className="w-full transition-all hover:bg-who-blue-light rounded-md">
          <Link href={`/projects/${encodeURIComponent(project.id)}/datasets`}>
            <a className="flex px-3 py-2 ">Datasets</a>
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
