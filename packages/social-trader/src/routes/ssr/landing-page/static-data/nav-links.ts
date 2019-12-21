export type TNavFooter = {
  state?: string;
  name: string;
  href?: string;
};

export type TNavHeader = TNavFooter & {
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

export const navFooter: TNavHeader[] = [
  {
    name: "Buy GVT",
    href: "/#buy"
  },
  {
    name: "Investors",
    href: "/#investor"
  },
  {
    name: "Managers",
    href: "/#manager"
  },
  {
    name: "Exchange",
    href: "/#buy"
  },
  {
    name: "Blog",
    href: "https://blog.genesis.vision/"
  },
  {
    name: "Careers",
    href: "/careers.html"
  },
  {
    name: "Fees",
    href: "/fees/"
  },
  {
    name: "About",
    href: "/about/"
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
    href: "/glossary/"
  },
  {
    name: "AML Manual",
    href: "/aml-manual/"
  },
  {
    name: "White paper",
    href: "https://genesis.vision/white-paper-eng.pdf"
  },
  {
    name: "Privacy policy",
    href: "/privacy-policy/"
  },
  {
    name: "Terms and conditions",
    href: "/terms/"
  },
  {
    name: "Download terminal",
    href: "/downloads/"
  }
];

export const START_ROUTE = "/investor/programs/";
export const EMAIL_ROUTE = "mailto:support@genesis.vision";
