import classNames from "classnames";
import UserIcon from "media/user-avatar.svg";
import * as React from "react";

import ImageBase, { IImageProps } from "../image-base";
import "./profile-avatar.scss";

const _ProfileAvatar: React.FC<Props> = ({
  url,
  alt,
  className,
  big,
  middle
}) => {
  return (
    <div
      className={classNames("profile-avatar", className, {
        "profile-avatar--middle": middle,
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
  middle?: boolean;
  big?: boolean;
}

const ProfileAvatar = React.memo(_ProfileAvatar);
export default ProfileAvatar;
