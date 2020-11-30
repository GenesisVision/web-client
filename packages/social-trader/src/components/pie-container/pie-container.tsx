import * as React from "react";
import styled from "styled-components";
import { $textLightColor } from "utils/style/colors";
import { fontSize, height, width } from "utils/style/mixins";
import { $fontSizeSmall } from "utils/style/sizes";

import Pie, { PIE_DIRECTION } from "./pie";

export interface IPieContainer {
  small?: boolean;
  color: string;
  label: string;
  value: Date | number;
  pieDirection?: PIE_DIRECTION;
  className?: string;
}

const Container = styled.div<{
  small?: boolean;
}>`
  position: relative;
  flex-shrink: 0;
  ${({ small }) =>
    small ? `${width(24.5)};${height(24.5)};` : `${width(43)};${height(43)};`}
`;

const Value = styled.div`
  ${fontSize($fontSizeSmall)};
  color: ${$textLightColor};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const _PieContainer: React.FC<IPieContainer> = ({
  small,
  label,
  color,
  value,
  pieDirection
}) => (
  <Container small={small}>
    <Pie
      start={0}
      end={100}
      value={value}
      color={color}
      pieDirection={pieDirection}
    />
    <Value>{label}</Value>
  </Container>
);

const PieContainer = React.memo(_PieContainer);
export default PieContainer;
