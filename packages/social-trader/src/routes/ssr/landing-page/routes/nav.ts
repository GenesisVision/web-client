import * as React from "react";

export type TNavHeader = {
  state?: string;
  name: string;
  href?: string;
  icon?: JSX.Element;
};

export const navHeader: TNavHeader[] = [
  {
    name: "For investor",
    href: "/investor/programs/"
  },
  {
    name: "For manager",
    href: "/manager/programs/"
  },
  {
    name: "FAQ",
    href: "/faq/"
  },
  {
    name: "Contacts",
    href: "#contacts"
  }
];

export const START_ROUTE = "/investor/programs/";
