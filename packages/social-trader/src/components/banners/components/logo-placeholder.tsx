import React from "react";
import filesService from "services/file-service";

import { LogoOptions } from "../utils";
import Logo21 from "./defaultLogos/Logo21";
import Logo25 from "./defaultLogos/Logo25";
import Logo55 from "./defaultLogos/Logo55";

type LogoProps = LogoOptions & {
  href?: string;
  color: string;
};

const BANNER_LOGO_RADIUS = 7;

export default function LogoPlaceholder({
  href,
  size,
  color = "white",
  position
}: LogoProps) {
  const x = position?.x ? position.x : 0;
  const y = position?.y ? position.y : 0;
  if (!href) {
    switch (size.width) {
      case 21:
        return <Logo21 color={color} x={x} y={y} />;
      case 25:
        return <Logo25 color={color} x={x} y={y} />;
      case 55:
        return <Logo55 color={color} x={x} y={y} />;
    }
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <rect
          id="rect"
          x={x}
          y={y}
          width={size.width}
          height={size.height}
          rx={BANNER_LOGO_RADIUS}
        />
        <clipPath id="clip">
          <use xlinkHref="#rect" />
        </clipPath>
      </defs>

      <use xlinkHref="#rect" strokeWidth="0" stroke="black" />
      <image
        x={x}
        y={y}
        href={filesService.getFileUrl(href)}
        width={size.width}
        height={size.height}
        clipPath="url(#clip)"
      />
    </svg>
  );
}
