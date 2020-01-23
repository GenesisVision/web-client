import "./style.scss";

import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import GVColors from "components/gv-styles/gv-colors";
import PieContainer from "components/pie-container/pie-container";
import React from "react";

import GVProgramDefaultAvatar from "./gv-propgram-default-avatar";

const _GVProgramAvatar: React.FC<GVProgramAvatarProps> = ({
  url,
  alt,
  level,
  levelProgress = 0,
  size = "small",
  className,
  color,
  imageClassName,
  levelClassName,
  onMouseOverLevel,
  onMouseEnterLevel,
  onMouseLeaveLevel,
  onClickLevel
}) => {
  const haveLevel = level !== undefined && level !== 0;
  return (
    <div
      className={classNames("program-avatar", className, {
        "program-avatar--with-level": haveLevel,
        "program-avatar--small": size === "small",
        "program-avatar--medium": size === "medium",
        "program-avatar--big": size === "big"
      })}
    >
      <ImageBase
        quality={size === "big" ? "Medium" : "Low"}
        DefaultImageComponent={GVProgramDefaultAvatar}
        src={url}
        color={color}
        className={classNames("program-avatar__image", imageClassName)}
        alt={alt}
      />
      {haveLevel && (
        <div
          onMouseOver={onMouseOverLevel}
          onMouseEnter={onMouseEnterLevel}
          onMouseLeave={onMouseLeaveLevel}
          onClick={onClickLevel}
          className={"program-avatar__level"}
        >
          <PieContainer
            small
            color={(GVColors as any)[`$levelColor${level}`]}
            label={String(level)}
            value={levelProgress}
          />
        </div>
      )}
    </div>
  );
};

export interface GVProgramAvatarProps {
  url?: string;
  alt: string;
  level?: number;
  levelProgress?: number;
  size?: "small" | "medium" | "big";
  className?: string;
  color?: string;
  imageClassName?: string;
  levelClassName?: string;
  onMouseOverLevel?: (e: any) => void;
  onMouseEnterLevel?: (e: any) => void;
  onMouseLeaveLevel?: (e: any) => void;
  onClickLevel?: (e: any) => void;
}

const GVProgramAvatar = React.memo(_GVProgramAvatar);
export default GVProgramAvatar;
