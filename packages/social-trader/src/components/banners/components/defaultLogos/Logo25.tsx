import React from "react";

type LogoType = {
  x: number;
  y: number;
  color: string;
};

export default function Logo25({ x, y, color }: LogoType) {
  return (
    <svg
      x={x}
      y={y}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="25" height="25" rx="7" fill={color} />
      <g opacity="0.3">
        <rect
          width="2.5"
          height="5.625"
          rx="1.25"
          transform="matrix(-1 0 0 1 18.125 11.875)"
          fill="#1B232B"
        />
        <rect
          width="2.5"
          height="2.5"
          rx="1.25"
          transform="matrix(-1 0 0 1 9.375 15)"
          fill="#1B232B"
        />
        <rect
          width="2.5"
          height="10"
          rx="1.25"
          transform="matrix(-1 0 0 1 13.75 7.49988)"
          fill="#1B232B"
        />
      </g>
    </svg>
  );
}
