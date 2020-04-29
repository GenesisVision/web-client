import ImgAccess from "pages/landing-page/images/advantages/access.svg";
import ImgChoose from "pages/landing-page/images/advantages/choose.svg";
import ImgControl from "pages/landing-page/images/advantages/control.svg";

export type TAdvantages = {
  title: string;
  text: string;
  image?: string;
};

export const advantagesItems: TAdvantages[] = [
  {
    title: "landing-page:advantages.title-1",
    text: "landing-page:advantages.text-1",
    image: ImgAccess
  },
  {
    title: "landing-page:advantages.title-2",
    text: "landing-page:advantages.text-2",
    image: ImgChoose
  },
  {
    title: "landing-page:advantages.title-3",
    text: "landing-page:advantages.text-3",
    image: ImgControl
  }
];
