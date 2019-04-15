import "./profile-avatar.scss";

import classNames from "classnames";
import * as React from "react";
import UserIcon from "shared/media/user-avatar.svg";

import ImageBase, { IImageProps } from "../image-base";

const ProfileAvatar: React.FC<IImageProps> = ({ url, alt, className }) => {
  return (
    <div className={classNames("profile-avatar", className)}>
      <ImageBase
        url={url}
        alt={alt}
        defaultImage={UserIcon}
        imageClassName="profile-avatar__image"
        defaultImageClassName="profile-avatar__image--default"
      />
    </div>
  );
};

export default ProfileAvatar;
