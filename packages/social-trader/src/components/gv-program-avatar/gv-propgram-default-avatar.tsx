import clsx from "clsx";
import styles from "components/gv-program-avatar/style.module.scss";
import React from "react";

export interface GVProgramDefaultAvatarProps {
  color?: string;
  imageClassName?: string;
}

const GVProgramDefaultAvatar: React.FC<GVProgramDefaultAvatarProps> = ({
  color,
  imageClassName
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      fill="none"
      viewBox="0 0 80 80"
      className={clsx(imageClassName, styles["program-avatar__default-image"])}
    >
      <rect width="80" height="80" fill={color} rx="8" />
      <g fill="#1B232B" opacity=".3">
        <path d="M58 38h-8v18h8zM30 48h-8v8h8zM44 24h-8v32h8z" />
      </g>
    </svg>
  );
};

GVProgramDefaultAvatar.defaultProps = {
  color: "#131e26"
};

export default GVProgramDefaultAvatar;
