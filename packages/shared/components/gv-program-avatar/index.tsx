import classnames from "classnames";
import React from "react";

import GVProgramDefaultAvatar from "./gv-propgram-default-avatar";

export interface GVProgramAvatarProps {
  url?: string;
  alt: string;
  level?: number;
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

interface GVProgramAvatarState {
  errored: boolean;
}

class GVProgramAvatar extends React.Component<
  GVProgramAvatarProps,
  GVProgramAvatarState
> {
  static defaultProps: Partial<GVProgramAvatarProps> = {
    size: "small"
  };

  constructor(props: GVProgramAvatarProps) {
    super(props);

    this.state = {
      errored: false
    };
  }
  handleError = (e: any) => {
    e.target.onerror = null;
    this.setState({ errored: true });
  };

  renderImage = () => {
    const { url, alt, color, imageClassName } = this.props;
    if (this.state.errored || url === undefined || url === null)
      return (
        <GVProgramDefaultAvatar color={color} imageClassName={imageClassName} />
      );
    return (
      <img
        className={classnames(imageClassName, "program-avatar-image")}
        src={url}
        alt={alt}
        onError={this.handleError}
      />
    );
  };

  renderLevel = () => {
    const {
      level,
      levelClassName,
      onMouseOverLevel,
      onMouseEnterLevel,
      onMouseLeaveLevel,
      onClickLevel
    } = this.props;
    if (level === undefined) return null;
    return (
      <span
        onMouseOver={onMouseOverLevel}
        onMouseEnter={onMouseEnterLevel}
        onMouseLeave={onMouseLeaveLevel}
        onClick={onClickLevel}
        className={classnames("program-avatar-level", levelClassName, {
          "program-avatar-level1]": level === 1,
          "program-avatar-level2]": level === 2,
          "program-avatar-level3]": level === 3,
          "program-avatar-level4]": level === 4,
          "program-avatar-level5]": level === 5,
          "program-avatar-level6]": level === 6,
          "program-avatar-level7]": level === 7
        })}
      >
        {level}
      </span>
    );
  };

  render() {
    const { size, className } = this.props;

    return (
      <div
        className={classnames("program-avatar", className, {
          "program-avatar-small": size === "small",
          "program-avatar-medium": size === "medium",
          "program-avatar-big": size === "big"
        })}
      >
        {this.renderImage()}
        {this.renderLevel()}
      </div>
    );
  }
}

export { GVProgramDefaultAvatar };
export default GVProgramAvatar;
