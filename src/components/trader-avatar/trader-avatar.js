import React from "react";

import "./trader-avatar.css";
import avatarStub from "../../shared/media/avatar.png";

const TraderAvatar = ({ imgUrl, level }) => {
  return (
    <div className="trader-avatar">
      <img
        className="trader-avatar__image"
        src={imgUrl || avatarStub}
        alt="Trader Avatar"
      />
      <span className="trader-avatar__level">{level}</span>
    </div>
  );
};

export default TraderAvatar;
