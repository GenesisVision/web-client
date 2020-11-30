import { calcPercent } from "components/pie-container/pie.helpers";
import React from "react";
import styled from "styled-components";
import { $primaryColor } from "utils/style/colors";

interface GVProgramPeriodProps {
  className?: string;
  bgColor?: string;
  start: Date | number;
  end: Date | number;
  value: Date | number;
  variant?: "pie" | "line";
}

const calcDash = (percent: number) => `${percent} ${100 - percent}`;

interface IValueProps {
  valuePercent: number;
}
const Value = styled.div<IValueProps>`
  width: ${({ valuePercent }: IValueProps) => valuePercent}%;
  position: absolute;
  top: -1px;
  height: 4px;
  background-color: ${$primaryColor};
  border-radius: 0.25rem;
`;

interface ILineProps {
  bgColor?: string;
}
const Line = styled.div<ILineProps>`
  display: block;
  height: 2px;
  background-color: ${({ bgColor }: ILineProps) => bgColor || "#2a353f"};
  border-radius: 0.25rem;
  width: 100%;
  position: relative;
`;

const StyledSvg = styled.svg`
  display: block;
  width: 20px;
  height: 20px;
`;

const GVProgramPeriod: React.FC<GVProgramPeriodProps> = ({
  className,
  bgColor,
  start,
  end,
  value,
  variant = "pie"
}) => {
  const valuePercent = calcPercent(value, start, end);
  if (variant === "pie")
    return (
      <StyledSvg
        width="100%"
        height="100%"
        viewBox="0 0 42 42"
        className={className}
      >
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#2a353f"
          strokeWidth="3"
        />

        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#03bdaf"
          strokeWidth="6"
          strokeDasharray={calcDash(valuePercent)}
          strokeDashoffset={25}
        />
      </StyledSvg>
    );
  else
    return (
      <Line bgColor={bgColor}>
        <Value valuePercent={valuePercent} />
      </Line>
    );
};

export default GVProgramPeriod;
