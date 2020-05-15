import classNames from "classnames";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { ProfilePublicShort } from "gv-api-web";
import React from "react";

import styles from "./user-avatar-list.module.scss";

interface Props {
  length?: number;
  list: ProfilePublicShort[];
}

const _UserAvatarList: React.FC<Props> = ({ length = 3, list }) => {
  return (
    <Center
      className={styles["user-avatar-list__container"]}
      style={{
        width: (44 - 20) * (Math.min(length, list.length) + 1)
      }}
    >
      {list.slice(0, length).map(({ logoUrl, username }, i) => (
        <div
          className={styles["user-avatar-list__item"]}
          style={{
            left: -(20 * i)
          }}
        >
          <ProfileAvatar url={logoUrl} alt={username} />
        </div>
      ))}
      {list.length > length && (
        <div
          className={classNames(
            styles["user-avatar-list__remainder"],
            styles["user-avatar-list__item"]
          )}
          style={{
            left: -(20 * length)
          }}
        >
          + {list.length - length}
        </div>
      )}
    </Center>
  );
};

export const UserAvatarList = React.memo(_UserAvatarList);
