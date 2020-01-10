import {
  GV_FOLLOW_ROUTE,
  GV_FUNDS_ROUTE,
  GV_PROGRAMS_ROUTE,
  INVEST_ROUTE
} from "routes/invest.routes";
import { TRADE_ROUTE } from "routes/trade.routes";

export type TNavFooter = {
  state?: string;
  name: string;
  href?: string;
};

export type TSubNav = TNavFooter & {
  hideMobile?: boolean;
};

export type TNavHeader = TNavFooter & {
  icon?: JSX.Element;
  subNav?: TSubNav[];
  hideMobile?: boolean;
};

export const FEES_ROUTE = "/fees";
export const REFERRAL_PROGRAM_ROUTE = "/referral-program";
export const FAQ_ROUTE = "/faq";

export const navHeader: TNavHeader[] = [
  {
    name: "Invest",
    href: INVEST_ROUTE,
    subNav: [
      {
        name: "Follow",
        href: GV_FOLLOW_ROUTE
      },
      {
        name: "Programs",
        href: GV_PROGRAMS_ROUTE
      },
      {
        name: "Funds",
        href: GV_FUNDS_ROUTE
      }
    ]
  },
  {
    name: "Trade",
    href: TRADE_ROUTE
  },
  {
    name: "Info",
    href: "#info",
    subNav: [
      {
        name: "Blog",
        hideMobile: true,
        href: "https://blog.genesis.vision"
      },
      {
        name: "Fees",
        hideMobile: true,
        href: FEES_ROUTE
      },
      {
        name: "Referral program",
        hideMobile: true,
        href: REFERRAL_PROGRAM_ROUTE
      },
      {
        name: "FAQ",
        hideMobile: true,
        href: FAQ_ROUTE
      },
      {
        name: "Feedback",
        hideMobile: true,
        href: "https://feedback.genesis.vision/"
      }
    ]
  }
];

export const navFooter: TNavHeader[] = [
  {
    name: "Referral program",
    href: REFERRAL_PROGRAM_ROUTE
  },
  {
    name: "Fees",
    href: FEES_ROUTE
  },
  {
    name: "FAQ",
    href: FAQ_ROUTE
  },
  {
    name: "Blog",
    href: "https://blog.genesis.vision/"
  },
  {
    name: "Feedback",
    href: "https://feedback.genesis.vision/"
  },
  {
    name: "Knowledge base",
    href: "https://feedback.genesis.vision/knowledge-bases/2-knowledge-base"
  },
  {
    name: "Glossary",
    href: "/glossary"
  },
  {
    name: "AML Manual",
    href: "/aml-manual"
  },
  {
    name: "White paper",
    href: "https://genesis.vision/white-paper-eng.pdf"
  },
  {
    name: "Privacy policy",
    href: "/privacy-policy"
  },
  {
    name: "Terms and conditions",
    href: "/terms"
  },
  {
    name: "Download terminal",
    href: "/downloads"
  }
];

export const EMAIL_ROUTE = "mailto:support@genesis.vision";
