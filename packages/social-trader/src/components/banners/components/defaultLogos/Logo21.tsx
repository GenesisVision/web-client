import React from "react";

type Props = {
  color: string;
  x: number;
  y: number;
};

export default function Logo21({ color, x, y }: Props) {
  return (
    <svg
      x={x}
      y={y}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="21" height="21" rx="7" fill={color} />
      <g opacity="0.3">
        <rect
          width="2.1"
          height="4.725"
          rx="1.05"
          transform="matrix(-1 0 0 1 15.2246 9.97498)"
          fill="#1B232B"
        />
        <rect
          width="2.1"
          height="2.1"
          rx="1.05"
          transform="matrix(-1 0 0 1 7.875 12.6)"
          fill="#1B232B"
        />
        <rect
          width="2.1"
          height="8.4"
          rx="1.05"
          transform="matrix(-1 0 0 1 11.5508 6.29993)"
          fill="#1B232B"
        />
      </g>
    </svg>
  );
}
