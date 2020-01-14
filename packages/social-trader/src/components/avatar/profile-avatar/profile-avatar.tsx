import "./profile-avatar.scss";

import classNames from "classnames";
import UserIcon from "media/user-avatar.svg";
import * as React from "react";

import ImageBase, { IImageProps } from "../image-base";

const _ProfileAvatar: React.FC<Props> = ({ url, alt, className, big }) => {
  return (
    <div
      className={classNames("profile-avatar", className, {
        "profile-avatar--big": big
      })}
    >
      <ImageBase
        src={url}
        alt={alt}
        defaultImage={UserIcon}
        className="profile-avatar__image"
        defaultImageClassName="profile-avatar__image--default"
      />
    </div>
  );
};

interface Props extends IImageProps {
  big?: boolean;
}

const ProfileAvatar = React.memo(_ProfileAvatar);
export default ProfileAvatar;
