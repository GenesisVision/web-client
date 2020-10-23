import * as React from "react";
import styled from "styled-components";
import { getHEXA } from "utils/style/generators";
import {
  adaptiveBorderRadius,
  fontSize,
  height,
  horizontalPaddings,
  lineHeight
} from "utils/style/mixins";
import { $fontSizeXsmall, $paddingXxsmall } from "utils/style/sizes";

interface Props {
  clickable?: boolean;
  color: string;
  content: JSX.Element | string;
}

const _TagBubble = styled.div<Props>`
  display: inline-block;
  position: relative;
  cursor: default;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  ${fontSize($fontSizeXsmall)};
  ${adaptiveBorderRadius(19.5)};
  ${height(18)};
  ${lineHeight(18)};
  ${horizontalPaddings($paddingXxsmall)};
  ${({ clickable }) => clickable && "cursor:pointer;"}
  ${({ color }) => `
    color: ${color};
    background-color: ${getHEXA(color, 0.1)};
  `}
`;

const TagBubble = React.memo(_TagBubble);
export default TagBubble;
