import { PIE_DIRECTION } from "components/pie-container/pie";
import * as React from "react";
import styled from "styled-components";
import { transition } from "utils/style/mixins";

const StyledCircle = styled.circle`
  ${transition("stroke-width")};
  cursor: pointer;
`;

export const PieCircle: React.FC<IPieCircleProps> = React.memo(
  ({
    selected,
    onMouseLeave,
    onMouseOver,
    circleCenter,
    color,
    strokeDasharray,
    begin,
    pieDirection,
    circleSize
  }) => {
    return (
      <StyledCircle
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseOver}
        cx={circleCenter}
        cy={circleCenter}
        r="15.91549430918954"
        fill={"none"}
        stroke={color}
        strokeWidth={selected ? 4 : 2}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={25}
        transform={`rotate(${begin},${circleCenter},${circleCenter})${
          pieDirection === PIE_DIRECTION.COUNTERCLOCKWISE
            ? ` scale(-1, 1)  translate(-${circleSize}, 0)`
            : ""
        }`}
      />
    );
  }
);

interface IPieCircleProps {
  selected?: boolean;
  onMouseLeave?: VoidFunction;
  onMouseOver?: VoidFunction;
  circleCenter: number;
  color: string;
  strokeDasharray: string;
  begin?: number;
  pieDirection?: PIE_DIRECTION;
  circleSize: number;
}
