import React from "react";
import classnames from "classnames";
import avatarStub from "../../shared/media/manager-avatar.png";
import fileService from "../../shared/services/file-service";
import "./program-avatar.css";

const ProgramAvatar = ({ url, className }) => {
  const src = url ? fileService.getFileUrl(url) : avatarStub;
  return (
    <img
      className={classnames("program-avatar__image", className)}
      src={src}
      alt="Trader Avatar"
    />
  );
};

export default ProgramAvatar;
