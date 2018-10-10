import "./profile-avatar.scss";

import React from "react";
import withUrl from "shared/decorators/with-url";
import UserIcon from "shared/media/user-avatar.svg";

let ProfileAvatar = ({ url, alt }) => {
  return (
    <div className="profile-avatar">
      <img alt={alt} className="profile-avatar__image" src={url || UserIcon} />
    </div>
  );
};

ProfileAvatar = withUrl("url")(ProfileAvatar);
export default ProfileAvatar;
