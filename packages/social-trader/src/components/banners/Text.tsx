import React from "react";

export default function Text({
  children,
  x,
  y,
  fontSize,
  bold = false,
  color,
  position
}: React.PropsWithChildren<TextProps>) {
  return (
    <text
      fontSize={fontSize}
      fill={color}
      textAnchor={position}
      fontWeight={bold ? "bold" : undefined}
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={x} y={y}>
        {children}
      </tspan>
    </text>
  );
}

type TextProps = {
  x: number;
  y: number;
  fontSize: number;
  bold?: boolean;
  position?: "start" | "middle" | "end";
  color: string;
};
