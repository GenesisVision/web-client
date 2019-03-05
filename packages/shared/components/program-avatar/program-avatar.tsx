import "./program-avatar.css";

import classNames from "classnames";
import * as React from "react";

import avatarStub from "shared/media/manager-avatar.png";

interface IProgramAvatarProps {
  url: string;
  level: number;
  isTournament?: boolean;
  className?: string;
}

const ProgramAvatar: React.FC<IProgramAvatarProps> = ({
  url,
  level,
  isTournament,
  className
}) => {
  return (
    <div className={classNames("program-avatar", className)}>
      {isTournament && (
        <span className="program-avatar__label program-avatar__label--tournament">
          <i className="fas fa-trophy" />
        </span>
      )}
      <img
        className="program-avatar__image"
        src={url || avatarStub}
        alt="Trader Avatar"
      />
      <span className="program-avatar__label program-avatar__label--level">
        {level}
      </span>
    </div>
  );
};

export default ProgramAvatar;
