import Avatar from "components/Avatar";

import clsx from "clsx";
import { gql } from "@apollo/client";
import { User_UserFragment } from "libs/graphql";
import { useMemo } from "react";

type Props = {
  user: User_UserFragment;
  small?: boolean;
  className?: string;
  textColor?: string;
  subTextColor?: string;
};

const User = ({
  user,
  small,
  textColor = "text-gray-700",
  subTextColor = "text-gray-500",
  className,
}: Props) => {
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
          size={small ? "xs" : "sm"}
          initials={user.avatar.initials}
          color={user.avatar.color}
        />
      </div>
      <div className="ml-2">
        <p className={clsx("text-sm font-medium", textColor)}>{name}</p>
        {!small && (
          <p className={clsx("text-xs font-medium", subTextColor)}>
            {user.email}
          </p>
        )}
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
