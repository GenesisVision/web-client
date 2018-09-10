import "./manager-avatar.scss";

import classNames from "classnames";
import React from "react";
import UserIcon from "shared/media/user-avatar.svg";

const ManagerAvatar = ({ className, avatarUrl }) => (
  <div
    className={classNames("manager-avatar", className, {
      "manager-avatar--default": !avatarUrl
    })}
    style={{ backgroundImage: `url(${avatarUrl || UserIcon})` }}
  />
);

export default ManagerAvatar;
