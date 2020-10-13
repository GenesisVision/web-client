import * as React from "react";
import styled from "styled-components";
import {
  $levelColor1,
  $levelColor2,
  $levelColor3,
  $levelColor4,
  $levelColor5,
  $levelColor6,
  $levelColor7,
  $mainColor
} from "utils/style/colors";
import { $fontSizeSmall } from "utils/style/sizes";

interface Props {
  level: number;
  current?: boolean;
}

const LevelIconContainer = styled.div<Props>`
  color: ${$mainColor};
  font-size: ${$fontSizeSmall}px;
  font-weight: bold;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  box-sizing: border-box;
  border: 2px solid transparent;
  background: ${({ current, level }) => {
    if (current) return "transparent !important";
    switch (level) {
      case 1:
        return $levelColor1;
      case 2:
        return $levelColor2;
      case 3:
        return $levelColor3;
      case 4:
        return $levelColor4;
      case 5:
        return $levelColor5;
      case 6:
        return $levelColor6;
      case 7:
        return $levelColor7;
    }
    return "#28768d";
  }};
  border-color: ${({ level }) => {
    switch (level) {
      case 1:
        return $levelColor1;
      case 2:
        return $levelColor2;
      case 3:
        return $levelColor3;
      case 4:
        return $levelColor4;
      case 5:
        return $levelColor5;
      case 6:
        return $levelColor6;
      case 7:
        return $levelColor7;
    }
  }};
`;

const LevelIcon: React.FC<Props> = React.memo(({ level, current }) => (
  <LevelIconContainer level={level} current={current}>
    {level}
  </LevelIconContainer>
));

export default LevelIcon;
