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
    name: "Referral program",
    href: "/referral-program/"
  },
  {
    name: "Fees",
    href: "/fees/"
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
    href: "/glossary.html"
  },
  {
    name: "AML Manual",
    href: "/aml-manual.html"
  },
  {
    name: "White paper",
    href: "https://genesis.vision/white-paper-eng.pdf"
  },
  {
    name: "Privacy policy",
    href: "/privacy-policy.html"
  },
  {
    name: "Terms and conditions",
    href: "/terms.html"
  },
  {
    name: "Download terminal",
    href: "/downloads.html"
  }
];

export const START_ROUTE = "/investor/programs/";
export const EMAIL_ROUTE = "mailto:support@genesis.vision";
