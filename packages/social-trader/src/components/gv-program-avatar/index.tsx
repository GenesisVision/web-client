import ImageBase from "components/avatar/image-base";
import {
  $avatarSmallShift,
  $levelBorder,
  GVProgramAvatarLevel,
  GVProgramAvatarProps,
  GVProgramAvatarStyles
} from "components/gv-program-avatar/gv-program-avatar.styles";
import PieContainer from "components/pie-container/pie-container";
import React from "react";
import styled from "styled-components";
import {
  $levelColor1,
  $levelColor2,
  $levelColor3,
  $levelColor4,
  $levelColor5,
  $levelColor6,
  $levelColor7
} from "utils/style/colors";
import { adaptiveBorderRadius, adaptivePadding } from "utils/style/mixins";
import { SizesType } from "utils/types";

import GVProgramDefaultAvatar from "./gv-propgram-default-avatar";

interface IContainerProps {
  level?: number;
  size?: SizesType | "full";
}

const getLevelColor = (level?: string | number) => {
  const stringLevel = String(level);
  switch (stringLevel) {
    case "1":
      return $levelColor1;
    case "2":
      return $levelColor2;
    case "3":
      return $levelColor3;
    case "4":
      return $levelColor4;
    case "5":
      return $levelColor5;
    case "6":
      return $levelColor6;
    case "7":
      return $levelColor7;
    case undefined:
    default:
      return "";
  }
};

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
  width: ${({ fullSize }) => fullSize && "100%"};
  height: ${({ fullSize }) => fullSize && "100%"};
  object-fit: ${({ fullSize }) => fullSize && "cover"};
  ${adaptiveBorderRadius(7)};
`;

const Avatar = styled.div<{ size?: SizesType | "full" }>`
  ${GVProgramAvatarStyles}
`;

const _GVProgramAvatar: React.FC<GVProgramAvatarProps> = ({
  levelColor = "#1c2730",
  url,
  alt,
  level,
  levelProgress = 0,
  size = "small",
  color,
  fullSize,
  onMouseOverLevel,
  onMouseEnterLevel,
  onMouseLeaveLevel,
  onClickLevel
}) => {
  const haveLevel = level !== undefined && level !== 0;
  return (
    <Container level={level} size={size}>
      <Avatar size={size}>
        <StyledImageBase
          fullSize={fullSize}
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
              color={getLevelColor(level)}
              label={String(level)}
              value={levelProgress}
            />
          </GVProgramAvatarLevel>
        )}
      </Avatar>
    </Container>
  );
};

const GVProgramAvatar = React.memo(_GVProgramAvatar);
export default GVProgramAvatar;
