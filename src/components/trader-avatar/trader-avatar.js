import React from "react";

import "./trader-avatar.css";
import managerAvatar from "../../shared/media/manager-avatar.png";

const TraderAvatar = ({ imgUrl, level }) => {
  return (
    <div className="trader-avatar">
      <img
        className="trader-avatar__image"
        src={imgUrl || managerAvatar}
        alt="Trader Avatar"
      />
      <span className="trader-avatar__level">{level}</span>
    </div>
  );
};

export default TraderAvatar;
