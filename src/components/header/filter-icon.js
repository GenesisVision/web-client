import React from "react";

export default function FilterIcon() {
  return (
    <svg
      width="35px"
      height="35px"
      viewBox="0 0 45 45"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <rect id="path-1" x="0" y="0" width="37" height="37" rx="5" />
        <filter
          x="-94.6%"
          y="-75.7%"
          width="289.2%"
          height="289.2%"
          filterUnits="objectBoundingBox"
          id="filter-2"
        >
          <feOffset
            dx="0"
            dy="7"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="10.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0.0862745098   0 0 0 0 0.717647059   0 0 0 0 0.678431373  0 0 0 0.281929348 0"
            type="matrix"
            in="shadowBlurOuter1"
          />
        </filter>
      </defs>
      <g
        id="Genesis-WebApp"
        className="filter--outer"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Traders-" transform="translate(-1432.000000, -25.000000)">
          <g id="Top-Bar" transform="translate(-1.000000, -3.000000)">
            <g id="Search" transform="translate(126.000000, 25.000000)">
              <g
                id="Filter_CTA_Normal"
                transform="translate(1311.000000, 6.000000)"
              >
                <g id="Rectangle-5">
                  <rect
                    className="filter--border"
                    stroke="#E3EBED"
                    strokeWidth="1"
                    x="0.5"
                    y="0.5"
                    width="36"
                    height="36"
                    rx="5"
                  />
                  <use
                    className="filter--shadow"
                    fill="black"
                    fillOpacity="0"
                    filter="url(#filter-2)"
                    xlinkHref="#path-1"
                  />
                </g>
                <g
                  id="preferences-circle-rotate"
                  className="filter--inner"
                  transform="translate(12.000000, 10.000000)"
                  fill="#15BBAF"
                  fillRule="nonzero"
                >
                  <path
                    d="M4,5 L4,1 C4,0.4 3.6,0 3,0 C2.4,0 2,0.4 2,1 L2,5 C2,5.6 2.4,6 3,6 C3.6,6 4,5.6 4,5 Z"
                    id="Shape"
                  />
                  <path
                    d="M0,11 C0,12.3 0.9,13.4 2,13.8 C2,13.9 2,13.9 2,14 L2,15 C2,15.6 2.4,16 3,16 C3.6,16 4,15.6 4,15 L4,14 C4,13.9 4,13.9 4,13.8 C5.2,13.4 6,12.3 6,11 C6,9.3 4.7,8 3,8 C1.3,8 0,9.3 0,11 Z"
                    id="Shape"
                  />
                  <path
                    d="M10,11 L10,15 C10,15.6 10.4,16 11,16 C11.6,16 12,15.6 12,15 L12,11 C12,10.4 11.6,10 11,10 C10.4,10 10,10.4 10,11 Z"
                    id="Shape"
                  />
                  <path
                    d="M8,5 C8,6.7 9.3,8 11,8 C12.7,8 14,6.7 14,5 C14,3.7 13.1,2.6 12,2.2 C12,2.1 12,2.1 12,2 L12,1 C12,0.4 11.6,0 11,0 C10.4,0 10,0.4 10,1 L10,2 C10,2.1 10,2.1 10,2.2 C8.9,2.6 8,3.7 8,5 Z"
                    id="Shape"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
