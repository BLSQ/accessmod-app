import { gql } from "@apollo/client";
import { UserGroupIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { Team_TeamFragment } from "libs/graphql";

type TeamProps = {
  team: Team_TeamFragment;
  className?: string;
  iconClassName?: string;
};

const Team = (props: TeamProps) => {
  const { team, className, iconClassName = "h-6 w-6 mr-2" } = props;
  return (
    <div className={clsx("flex items-center", className)}>
      <UserGroupIcon className={clsx("opacity-80", iconClassName)} />
      <span>{team.name}</span>
    </div>
  );
};

Team.fragments = {
  team: gql`
    fragment Team_team on Team {
      id
      name
    }
  `,
};

export default Team;
