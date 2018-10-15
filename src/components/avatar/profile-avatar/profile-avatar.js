import "./profile-avatar.scss";

import classnames from "classnames";
import React from "react";
import withUrl from "shared/decorators/with-url";
import UserIcon from "shared/media/user-avatar.svg";

let ProfileAvatar = ({ url, alt, className }) => {
  return (
    <div className={classnames("profile-avatar", className)}>
      <img
        alt={alt}
        className={classnames("profile-avatar__image", {
          "profile-avatar__image--default": !url
        })}
        src={url || UserIcon}
      />
    </div>
  );
};

ProfileAvatar = withUrl("url")(ProfileAvatar);
export default ProfileAvatar;
