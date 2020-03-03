import ImgAccess from "pages/landing-page/images/referral/ref-1.svg";
import ImgChoose from "pages/landing-page/images/referral/ref-2.svg";
import ImgControl from "pages/landing-page/images/referral/ref-3.svg";

export type TAdvantages = {
  title: string;
  text: string;
  image?: string;
};

export const refProgItems: TAdvantages[] = [
  {
    title: "referral-program.title-1",
    text: "referral-program.text-1",
    image: ImgAccess
  },
  {
    title: "referral-program.title-2",
    text: "referral-program.text-2",
    image: ImgChoose
  },
  {
    title: "referral-program.title-3",
    text: "referral-program.text-3",
    image: ImgControl
  }
];
