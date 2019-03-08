import "./profile-avatar.scss";

import classNames from "classnames";
import * as React from "react";
import UserIcon from "shared/media/user-avatar.svg";

import ImageBase from "../image-base";

interface IProfileAvatarProps {
  url: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
}

const ProfileAvatar: React.FC<IProfileAvatarProps> = ({
  url,
  alt,
  className = "",
  imageClassName = ""
}) => {
  className = classNames("profile-avatar", className);
  imageClassName = classNames("profile-avatar__image", imageClassName, {
    "profile-avatar__image--default": !url
  });
  return (
    <ImageBase
      url={url}
      alt={alt}
      defaultImage={UserIcon}
      className={className}
      imageClassName={imageClassName}
    />
  );
};

export default ProfileAvatar;
