import React from "react";

import "./program-avatar.css";
import avatarStub from "../../shared/media/manager-avatar.png";

const ProgramAvatar = ({ imgUrl, level, isTournament }) => {
  return (
    <div className="program-avatar">
      {isTournament && (
        <span className="program-avatar__tournament">
          <i className="fas fa-trophy" />
        </span>
      )}
      <img
        className="program-avatar__image"
        src={imgUrl || avatarStub}
        alt="Trader Avatar"
      />
      <span className="program-avatar__level">{level}</span>
    </div>
  );
};

export default ProgramAvatar;
