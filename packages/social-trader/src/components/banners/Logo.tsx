import Logo21 from "components/banners/defaultLogos/Logo21";
import Logo25 from "components/banners/defaultLogos/Logo25";
import { LogoOptions } from "components/banners/utils";
import React from "react";
import filesService from "services/file-service";

const BANNER_LOGO_RADIUS = 7;

export default function Logo({
  href,
  size,
  color = "white",
  position: { x, y }
}: LogoProps) {
  if (!href) {
    switch (size) {
      case 21:
        return <Logo21 color={color} x={x} y={y} />;
      case 25:
        return <Logo25 color={color} x={x} y={y} />;
    }
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <rect
          id="rect"
          x={x}
          y={y}
          width={size}
          height={size}
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
        width={size}
        height={size}
        clipPath="url(#clip)"
      />
    </svg>
  );
}

type LogoProps = LogoOptions & {
  href?: string;
  color: string;
};
