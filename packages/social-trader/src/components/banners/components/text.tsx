import React from "react";

type TextProps = {
  x: number;
  y: number;
  fontSize: number;
  bold?: boolean;
  position?: "start" | "middle" | "end";
  color: string;
};

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
      fontFamily={"Montserrat"}
    >
      <defs>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');`
          }}
        />
      </defs>
      <tspan x={x} y={y}>
        {children}
      </tspan>
    </text>
  );
}
