import { AndroidIcon } from "pages/landing-page/components/app-icons/android-icon";
import { AppleIcon } from "pages/landing-page/components/app-icons/apple-icon";
import React from "react";

export type TIconLinks = {
  name: string;
  href?: string;
  icon: React.ReactNode;
};

export const appLinks: TIconLinks[] = [
  {
    name: "landing-page:download.links.apple-store",
    href: "https://itunes.apple.com/app/genesis-vision-investor/id1369865290",
    icon: AppleIcon
  },
  {
    name: "landing-page:download.links.google-play",
    href:
      "https://play.google.com/store/apps/details?id=vision.genesis.clientapp.investor",
    icon: AndroidIcon
  }
];
