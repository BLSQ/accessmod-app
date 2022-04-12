import clsx from "clsx";
import { gql } from "@apollo/client";
import { ProjectCard_ProjectFragment } from "libs/graphql";
import Link from "next/link";
import User from "../User";

type Props = {
  project: ProjectCard_ProjectFragment;
  onClick?: (event: { preventDefault: Function }) => void;
  className?: string;
};

const ProjectCard = (props: Props) => {
  const { project, className, onClick } = props;

  return (
    <div
      className={clsx(
        "divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow",
        onClick && "cursor-pointer hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <div className="w-full space-y-3 p-6">
        <div className="flex items-center justify-between space-x-3">
          <h3 className="truncate text-base font-normal text-gray-800">
            <Link href={`/projects/${encodeURIComponent(project.id)}`}>
              {project.name}
            </Link>
          </h3>
          <img
            alt="Country"
            src={project.country.flag}
            title={project.country.name}
            className="h-4"
          />
        </div>
        <User user={project.owner} />
      </div>
    </div>
  );
};

ProjectCard.fragments = {
  project: gql`
    fragment ProjectCard_project on AccessmodProject {
      id
      name
      spatialResolution
      country {
        name
        flag
        code
      }
      owner {
        ...User_user
        firstName
        email
        lastName
        avatar {
          initials
          color
        }
      }
    }
    ${User.fragments.user}
  `,
};

export default ProjectCard;
