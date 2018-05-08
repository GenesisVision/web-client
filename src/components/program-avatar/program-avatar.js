import React from "react";
import classnames from "classnames";
import avatarStub from "../../shared/media/manager-avatar.png";
import fileService from "../../shared/services/file-service";
import "./program-avatar.css";

const ProgramAvatar = ({ url, className }) => {
  const src = url ? fileService.getFileUrl(url) : avatarStub;
  return (
    <div className={classnames("program-avatar", className)}>
      <img className="program-avatar__image" src={src} alt="Trader Avatar" />
    </div>
  );
};

export default ProgramAvatar;
