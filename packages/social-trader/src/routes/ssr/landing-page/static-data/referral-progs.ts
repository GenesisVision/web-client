import ImgAccess from "routes/ssr/landing-page/images/referral/ref-1.svg";
import ImgChoose from "routes/ssr/landing-page/images/referral/ref-2.svg";
import ImgControl from "routes/ssr/landing-page/images/referral/ref-3.svg";

export type TAdvantages = {
  title: string;
  text: string;
  image?: string;
};

export const refProgItems: TAdvantages[] = [
  {
    title: "Get Link",
    text: "Go to “Profile” and get your personal link",
    image: ImgAccess
  },
  {
    title: "Invite Friends",
    text:
      "Invite your friends to sign in via referral link to get the agent’s commission",
    image: ImgChoose
  },
  {
    title: "Get Rewards",
    text: "Get up to 30% of the agent’s commission",
    image: ImgControl
  }
];
