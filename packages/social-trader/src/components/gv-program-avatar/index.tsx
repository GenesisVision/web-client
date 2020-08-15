import ImageBase from "components/avatar/image-base";
import {
  $avatarSmallShift,
  $levelBorder,
  GVProgramAvatarLevel,
  GVProgramAvatarProps,
  GVProgramAvatarStyles
} from "components/gv-program-avatar/gv-program-avatar.styles";
import GVColors from "components/gv-styles/gv-colors";
import PieContainer from "components/pie-container/pie-container";
import { withStyles } from "decorators/withStyles";
import React from "react";
import styled from "styled-components";
import {
  adaptiveBorderRadius,
  adaptivePadding
} from "utils/style/style-mixins";
import { SizesType } from "utils/types";

import GVProgramDefaultAvatar from "./gv-propgram-default-avatar";

interface IContainerProps {
  level?: number;
  size?: SizesType | "full";
}

const Container = styled.div<IContainerProps>`
  ${({ level, size = "small" }: IContainerProps) =>
    level !== undefined &&
    level !== 0 &&
    size === "small" &&
    adaptivePadding("right", $avatarSmallShift - $levelBorder)}
`;

const StyledImageBase = styled(ImageBase)`
  max-width: 100%;
  max-height: 100%;
  ${adaptiveBorderRadius(7)};
`;

const _GVProgramAvatar: React.FC<GVProgramAvatarProps> = ({
  className,
  levelColor = "#1c2730",
  url,
  alt,
  level,
  levelProgress = 0,
  size = "small",
  color,
  onMouseOverLevel,
  onMouseEnterLevel,
  onMouseLeaveLevel,
  onClickLevel
}) => {
  const haveLevel = level !== undefined && level !== 0;
  return (
    <Container level={level} size={size}>
      <div className={className}>
        <StyledImageBase
          quality={size === "large" ? "Medium" : "Low"}
          DefaultImageComponent={GVProgramDefaultAvatar}
          src={url}
          color={color}
          alt={alt}
        />
        {haveLevel && (
          <GVProgramAvatarLevel
            size={size}
            style={{ background: levelColor }}
            onMouseOver={onMouseOverLevel}
            onMouseEnter={onMouseEnterLevel}
            onMouseLeave={onMouseLeaveLevel}
            onClick={onClickLevel}
          >
            <PieContainer
              small
              color={(GVColors as any)[`$levelColor${level}`]}
              label={String(level)}
              value={levelProgress}
            />
          </GVProgramAvatarLevel>
        )}
      </div>
    </Container>
  );
};

const GVProgramAvatar = withStyles<GVProgramAvatarProps>({
  dynamicStyles: GVProgramAvatarStyles
})(React.memo(_GVProgramAvatar));
export default GVProgramAvatar;
