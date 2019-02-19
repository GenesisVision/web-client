import "./profile-avatar.scss";

import classnames from "classnames";
import React from "react";
import UserIcon from "shared/media/user-avatar.svg";

import ImageBase from "../image-base";

const ProfileAvatar = ({ url, alt, className = "", imageClassName = "" }) => {
  className = classnames("profile-avatar", className);
  imageClassName = classnames("profile-avatar__image", imageClassName, {
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
