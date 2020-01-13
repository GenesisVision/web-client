import * as React from "react";

export const PieCircleContainer: React.FC<IPieCircleContainerProps> = ({
  children,
  withSubstrate,
  color,
  circleSize
}) => {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${circleSize} ${circleSize}`}>
      {withSubstrate && (
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r="15.91549430918954"
          fill="transparent"
          stroke={color}
          strokeOpacity={0.2}
          strokeWidth="2"
        />
      )}
      {children}
    </svg>
  );
};

interface IPieCircleContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  withSubstrate?: boolean;
  color?: string;
  circleSize: number;
}
