import Avatar from "components/Avatar";

import clsx from "clsx";
import { gql } from "@apollo/client";
import { User_UserFragment } from "libs/graphql";
import { useMemo } from "react";

type Props = {
  user: User_UserFragment;
  className?: string;
};

const User = ({ user, className }: Props) => {
  const name = useMemo(() => {
    if (!user.firstName && !user.lastName) {
      return "";
    }
    return [user.firstName, user.lastName].filter(Boolean).join(" ");
  }, [user.firstName, user.lastName]);
  return (
    <div className={clsx("flex items-center group flex-shrink-0", className)}>
      <div>
        <Avatar
          size="sm"
          initials={user.avatar.initials}
          color={user.avatar.color}
        />
      </div>
      <div className="ml-2">
        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {name}
        </p>
        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-600">
          {user.email}
        </p>
      </div>
    </div>
  );
};

User.fragments = {
  user: gql`
    fragment User_user on User {
      firstName
      lastName
      email
      id
      avatar {
        initials
        color
      }
    }
  `,
};

export default User;
