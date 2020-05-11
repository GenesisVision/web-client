import classNames from "classnames";
import { LikeIcon } from "components/conversation/icons/like.icon";
import React from "react";

import styles from "./like-button-icon.module.scss";

interface Props {
  disabled?: boolean;
  liked: boolean;
}

export const LikeButtonIcon: React.FC<Props> = ({ liked, disabled }) => {
  return (
    <div
      className={classNames(styles["like-button-icon"], {
        [styles["like-button-icon--liked"]]: liked,
        [styles["like-button-icon--disabled"]]: disabled
      })}
    >
      <LikeIcon />
    </div>
  );
};
