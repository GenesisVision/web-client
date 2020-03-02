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
    title: "landing-page.referral-program.title-1",
    text: "landing-page.referral-program.text-1",
    image: ImgAccess
  },
  {
    title: "landing-page.referral-program.title-2",
    text: "landing-page.referral-program.text-2",
    image: ImgChoose
  },
  {
    title: "landing-page.referral-program.title-3",
    text: "landing-page.referral-program.text-3",
    image: ImgControl
  }
];
