import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import GVColors from "components/gv-styles/gv-colors";
import PieContainer from "components/pie-container/pie-container";
import React from "react";

import GVProgramDefaultAvatar from "./gv-propgram-default-avatar";
import styles from "./style.module.scss";

const _GVProgramAvatar: React.FC<GVProgramAvatarProps> = ({
  levelColor = "#1c2730",
  url,
  alt,
  level,
  levelProgress = 0,
  size = "small",
  className,
  color,
  imageClassName,
  onMouseOverLevel,
  onMouseEnterLevel,
  onMouseLeaveLevel,
  onClickLevel
}) => {
  const haveLevel = level !== undefined && level !== 0;
  return (
    <div
      className={classNames(styles["program-avatar__container"], className, {
        [styles["program-avatar__container--with-level"]]:
          haveLevel && size === "small"
      })}
    >
      <div
        className={classNames(styles["program-avatar"], className, {
          [styles["program-avatar--small"]]: size === "small",
          [styles["program-avatar--medium"]]: size === "medium",
          [styles["program-avatar--big"]]: size === "big"
        })}
      >
        <ImageBase
          quality={size === "big" ? "Medium" : "Low"}
          DefaultImageComponent={GVProgramDefaultAvatar}
          src={url}
          color={color}
          className={classNames(
            styles["program-avatar__image"],
            imageClassName
          )}
          alt={alt}
        />
        {haveLevel && (
          <div
            style={{ background: levelColor }}
            onMouseOver={onMouseOverLevel}
            onMouseEnter={onMouseEnterLevel}
            onMouseLeave={onMouseLeaveLevel}
            onClick={onClickLevel}
            className={styles["program-avatar__level"]}
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
    </div>
  );
};

export interface GVProgramAvatarProps {
  levelColor?: string;
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
