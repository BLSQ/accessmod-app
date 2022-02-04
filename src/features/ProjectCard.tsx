import clsx from "clsx";
import { gql } from "@apollo/client";
import { ProjectCard_ProjectFragment } from "libs/graphql";
import Link from "next/link";
import Avatar from "components/Avatar";

type Props = {
  project: ProjectCard_ProjectFragment;
  className?: string;
};

function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const ProjectCard = (props: Props) => {
  const { project, className } = props;
  return (
    <div
      className={clsx(
        "rounded-lg bg-white shadow divide-y divide-gray-200 ",
        className
      )}
    >
      <div className="w-full flex justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-who-blue-dark text-sm font-medium truncate">
              <Link href={`/projects/${encodeURIComponent(project.id)}`}>
                {project.name}
              </Link>
            </h3>
          </div>
          <p className="mt-1 text-gray-500 text-sm truncate">
            {getFlagEmoji(project.country.code)} {project.country.name}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Avatar
            size="sm"
            initials={project.owner.avatar.initials}
            color={project.owner.avatar.color}
          />
        </div>
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
        firstName
        email
        lastName
        avatar {
          initials
          color
        }
      }
    }
  `,
};

export default ProjectCard;
