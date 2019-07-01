import "./style.scss";

import classnames from "classnames";
import React from "react";
import GVColors from "shared/components/gv-styles/gv-colors";
import PieContainer from "shared/components/pie-container/pie-container";

import GVProgramDefaultAvatar from "./gv-propgram-default-avatar";

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

interface GVProgramAvatarState {
  errored: boolean;
}

class GVProgramAvatar extends React.PureComponent<
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

  componentDidUpdate(prevProps: GVProgramAvatarProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ errored: false });
    }
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
        className={classnames(imageClassName, "program-avatar__image")}
        src={url}
        alt={alt}
        onError={this.handleError}
      />
    );
  };

  renderLevel = () => {
    const {
      level,
      levelProgress = 0,
      onMouseOverLevel,
      onMouseEnterLevel,
      onMouseLeaveLevel,
      onClickLevel
    } = this.props;
    if (level === undefined) return null;
    return (
      <div
        onMouseOver={onMouseOverLevel}
        onMouseEnter={onMouseEnterLevel}
        onMouseLeave={onMouseLeaveLevel}
        onClick={onClickLevel}
        className={"program-avatar__level"}
      >
        <PieContainer
          color={(GVColors as any)[`$levelColor${level}`]}
          label={String(level)}
          value={levelProgress}
        />
      </div>
    );
  };

  render() {
    const { size, className } = this.props;
    return (
      <div
        className={classnames("program-avatar", className, {
          "program-avatar--small": size === "small",
          "program-avatar--medium": size === "medium",
          "program-avatar--big": size === "big"
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
