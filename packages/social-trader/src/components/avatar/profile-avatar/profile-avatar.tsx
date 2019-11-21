import "./profile-avatar.scss";

import classNames from "classnames";
import UserIcon from "media/user-avatar.svg";
import * as React from "react";

import ImageBase, { IImageProps } from "../image-base";

const _ProfileAvatar: React.FC<IImageProps> = ({ url, alt, className }) => {
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

const ProfileAvatar = React.memo(_ProfileAvatar);
export default ProfileAvatar;
