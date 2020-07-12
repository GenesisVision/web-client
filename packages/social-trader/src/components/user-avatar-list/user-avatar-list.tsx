import clsx from "clsx";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { ProfilePublicShort } from "gv-api-web";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";

import styles from "./user-avatar-list.module.scss";

export interface IUserAvatarListProps {
  remainderColor?: string;
  count: number;
  length?: number;
  list: ProfilePublicShort[];
}

const AVATAR_SHIFT = 20;

const _UserAvatarList: React.FC<IUserAvatarListProps> = ({
  remainderColor = "#1c2730",
  count,
  length = 3,
  list
}) => {
  const { contextTitle } = useToLink();
  const hasRemainder = count > length;
  return (
    <Center
      className={styles["user-avatar-list__container"]}
      style={{
        width:
          (44 - AVATAR_SHIFT) * (Math.min(length, count) + 1) +
          +hasRemainder * AVATAR_SHIFT
      }}
    >
      {list.slice(0, length).map(({ url, logoUrl, username }, i) => {
        const profileUrl = managerToPathCreator(url, contextTitle);
        return (
          <div
            className={styles["user-avatar-list__item"]}
            style={{
              left: -(AVATAR_SHIFT * i)
            }}
          >
            <Link title={username} to={profileUrl}>
              <ProfileAvatar url={logoUrl} alt={username} />
            </Link>
          </div>
        );
      })}
      {count > length && (
        <div
          className={clsx(
            styles["user-avatar-list__remainder"],
            styles["user-avatar-list__item"]
          )}
          style={{
            background: remainderColor,
            left: -(AVATAR_SHIFT * length)
          }}
        >
          + {count - length}
        </div>
      )}
    </Center>
  );
};

export const UserAvatarList = React.memo(_UserAvatarList);
