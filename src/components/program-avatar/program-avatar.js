import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import avatarStub from "../../shared/media/manager-avatar.png";
import fileService from "../../shared/services/file-service";
import "./program-avatar.css";

const ProgramAvatar = ({ url, level, isTournament, className }) => {
  const src = url ? fileService.getFileUrl(url) : avatarStub;
  return (
    <div className={classnames("program-avatar", className)}>
      {isTournament && (
        <span className="program-avatar__label program-avatar__label--tournament">
          <i className="fas fa-trophy" />
        </span>
      )}
      <img className="program-avatar__image" src={src} alt="Trader Avatar" />
      <span className="program-avatar__label program-avatar__label--level">
        {level}
      </span>
    </div>
  );
};

ProgramAvatar.protoTypes = {
  url: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  isTournament: PropTypes.bool,
  className: PropTypes.string
};

export default ProgramAvatar;
