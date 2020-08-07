import clsx from "clsx";
import UserIcon from "media/user-avatar.svg";
import * as React from "react";

import ImageBase, { IImageProps } from "../image-base";
import styles from "./profile-avatar.module.scss";

interface Props extends IImageProps {
  middle?: boolean;
  big?: boolean;
}

const _ProfileAvatar: React.FC<Props> = ({
  url,
  alt,
  className,
  big,
  middle
}) => {
  return (
    <div
      className={clsx(styles["profile-avatar"], className, {
        [styles["profile-avatar--middle"]]: middle,
        [styles["profile-avatar--big"]]: big
      })}
    >
      <ImageBase
        src={url}
        alt={alt}
        defaultImage={UserIcon}
        className={styles["profile-avatar__image"]}
        defaultImageClassName={styles["profile-avatar__image--default"]}
      />
    </div>
  );
};

const ProfileAvatar = React.memo(_ProfileAvatar);
export default ProfileAvatar;
