import { gql } from "@apollo/client";
import { ClockIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { PermissionMode, ProjectCard_ProjectFragment } from "libs/graphql";
import { DateTime } from "luxon";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  project: ProjectCard_ProjectFragment;
  onClick?: (event: { preventDefault: Function }) => void;
  className?: string;
};

const ProjectCard = (props: Props) => {
  const { project, className, onClick } = props;
  const { t } = useTranslation();
  const owner = useMemo(
    () =>
      project.permissions.find((perm) => perm.mode === PermissionMode.Owner),
    [project]
  );

  return (
    <div
      className={clsx(
        "flex w-full flex-col rounded-lg border bg-white px-6 py-4 shadow",
        onClick && "cursor-pointer hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="truncate text-base font-semibold text-gray-600">
          <Link href={`/projects/${encodeURIComponent(project.id)}`}>
            {project.name}
          </Link>
        </h3>
      </div>

      <ul className="mb-2.5 flex list-none items-center text-sm text-gray-500">
        <li>
          <div className="flex shrink-0 items-center">
            <img
              alt="Country"
              width={16}
              height={11}
              src={project.country.flag}
              title={project.country.name}
              className="mr-1.5 h-3"
            />
            <span className="shrink-0">{project.country.name}</span>
          </div>
        </li>
        <li className="mx-2 text-gray-300">•</li>
        {owner?.team && <li>{owner.team.name}</li>}
        {owner?.user && (
          <li>
            {[owner.user.firstName, owner.user.lastName]
              .filter(Boolean)
              .join(" ")}
          </li>
        )}
      </ul>

      {project.description && (
        <div className="flex-1 text-sm text-gray-600 line-clamp-3">
          {project.description}
        </div>
      )}

      <div className="mt-4 ">
        <span className="flex items-center text-xs text-gray-500">
          <ClockIcon className="mr-1 h-3" />
          {t("Updated on {{time}}", {
            time: DateTime.fromISO(project.updatedAt).toLocaleString(
              DateTime.DATETIME_SHORT
            ),
          })}
        </span>
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
      description
      updatedAt
      permissions {
        user {
          firstName
          lastName
          avatar {
            initials
            color
          }
        }
        team {
          name
        }
        mode
      }
      country {
        name
        flag
        code
      }
    }
  `,
};

export default ProjectCard;
