import React from "react";

type LogoType = {
  x: number;
  y: number;
  color: string;
};

export default function Logo55({ x, y, color }: LogoType) {
  return (
    <svg
      x={x}
      y={y}
      width="55"
      height="55"
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="55" height="55" rx="8" fill={color} />
      <g opacity="0.3">
        <rect
          width="5.5"
          height="12.375"
          transform="matrix(-1 0 0 1 39.875 26.125)"
          fill="#1B232B"
        />
        <rect
          width="5.5"
          height="5.5"
          transform="matrix(-1 0 0 1 20.625 33)"
          fill="#1B232B"
        />
        <rect
          width="5.5"
          height="22"
          transform="matrix(-1 0 0 1 30.25 16.5)"
          fill="#1B232B"
        />
      </g>
    </svg>
  );
}
