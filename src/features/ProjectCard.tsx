import clsx from "clsx";
import { gql } from "@apollo/client";
import { ProjectCard_ProjectFragment } from "libs/graphql";
import Link from "next/link";
import User from "./User";

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
        "rounded-lg bg-white shadow divide-y divide-gray-200 border border-gray-200",
        onClick && "cursor-pointer hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <div className="w-full p-6 space-y-3">
        <div className="flex items-center space-x-3 justify-between">
          <h3 className="text-gray-800 text-base font-normal truncate">
            <Link href={`/projects/${encodeURIComponent(project.id)}`}>
              {project.name}
            </Link>
          </h3>
          <img src={project.country.flag} className="h-4" />
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
