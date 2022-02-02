import { GUIDES_TOTAL_PAGE_ROUTE } from "pages/guides/guides.paths";
import {
  GV_ASSETS_ROUTE,
  GV_FOLLOW_ROUTE,
  GV_FUNDS_ROUTE,
  GV_PROGRAMS_ROUTE,
  INVEST_ROUTE
} from "routes/invest.routes";
import { MEDIA_ROUTE, SOCIAL_ROUTE, USERS_ROUTE } from "routes/social.routes";
import {
  TERMINAL_FUTURES_ROUTE,
  TERMINAL_SPOT_ROUTE,
  TRADE_ROUTE
} from "routes/trade.routes";

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
export const GLOSSARY_ROUTE = "/glossary";
export const AML_MANUAL_ROUTE = "/aml-manual";
export const WHITE_PAPER_ROUTE = "/white-paper-eng.pdf";
export const PRIVACY_POLICY_ROUTE = "/privacy-policy";
export const TERMS_ROUTE = "/terms";

export const navHeader: TNavHeader[] = [
  {
    name: "navigation.social",
    href: SOCIAL_ROUTE,
    subNav: [
      {
        name: "navigation.users",
        href: USERS_ROUTE
      },
      {
        name: "navigation.media",
        href: MEDIA_ROUTE
      }
    ]
  },
  {
    name: "navigation.invest",
    href: INVEST_ROUTE,
    subNav: [
      {
        name: "navigation.gv-assets",
        href: GV_ASSETS_ROUTE
      },
      {
        name: "navigation.gv-funds",
        href: GV_FUNDS_ROUTE
      },
      {
        name: "navigation.gv-programs",
        href: GV_PROGRAMS_ROUTE
      },
      {
        name: "navigation.gv-follow",
        href: GV_FOLLOW_ROUTE
      }
    ]
  },
  {
    name: "navigation.trade",
    href: TRADE_ROUTE,
    subNav: [
      {
        name: "navigation.terminal.spot",
        href: TERMINAL_SPOT_ROUTE
      },
      {
        href: TERMINAL_FUTURES_ROUTE,
        name: "navigation.terminal.futures"
      }
    ]
  },
  {
    name: "navigation.info",
    href: "#info",
    subNav: [
      {
        name: "navigation.blog",
        hideMobile: true,
        href: "https://blog.genesis.vision"
      },
      {
        name: "navigation.fees",
        hideMobile: true,
        href: FEES_ROUTE
      },
      {
        name: "navigation.referral-program",
        hideMobile: true,
        href: REFERRAL_PROGRAM_ROUTE
      },
      {
        name: "navigation.faq",
        hideMobile: true,
        href: FAQ_ROUTE
      },
      {
        name: "navigation.guides",
        hideMobile: true,
        href: GUIDES_TOTAL_PAGE_ROUTE
      },
      {
        name: "navigation.feedback",
        hideMobile: true,
        href: "https://feedback.genesis.vision/"
      }
    ]
  }
];

export const navFooter: TNavHeader[] = [
  {
    name: "navigation.referral-program",
    href: REFERRAL_PROGRAM_ROUTE
  },
  {
    name: "navigation.fees",
    href: FEES_ROUTE
  },
  {
    name: "navigation.faq",
    href: FAQ_ROUTE
  },
  {
    name: "navigation.guides",
    href: GUIDES_TOTAL_PAGE_ROUTE
  },
  {
    name: "navigation.blog",
    href: "https://blog.genesis.vision/"
  },
  {
    name: "navigation.feedback",
    href: "https://feedback.genesis.vision/"
  },
  {
    name: "landing-page:links.knowledge-base",
    href: "https://genesisvision.freshdesk.com/support/solutions"
  },
  {
    name: "landing-page:links.glossary",
    href: GLOSSARY_ROUTE
  },
  {
    name: "landing-page:links.aml-manual",
    href: AML_MANUAL_ROUTE
  },
  {
    name: "landing-page:links.white-paper",
    href: WHITE_PAPER_ROUTE
  },
  {
    name: "landing-page:links.privacy-policy",
    href: PRIVACY_POLICY_ROUTE
  },
  {
    name: "landing-page:links.terms",
    href: TERMS_ROUTE
  }
];

export const EMAIL_ROUTE = "mailto:support@genesis.vision";
