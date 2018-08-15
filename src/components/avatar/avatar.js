import "./avatar.scss";

import React from "react";
import GVLogo from "shared/media/investor-avatar.png";

const Avatar = ({ url }) => {
  return (
    <div className={"avatar"}>
      <img alt="user avatar" className={"avatar__image"} src={url || GVLogo} />
    </div>
  );
};

export default Avatar;
