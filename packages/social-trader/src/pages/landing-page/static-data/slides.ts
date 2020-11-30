import ImgFirstBanner from "pages/landing-page/images/slider/banner.webp";
import ImgCreditCard from "pages/landing-page/images/slider/credit-card-1.svg";
import ImgCreditCardBg from "pages/landing-page/images/slider/credit-card-bg.svg";
import ImgCreditCardOptimization from "pages/landing-page/images/slider/credit-card.svg";
import ImgPeople1 from "pages/landing-page/images/slider/people-1.svg";
import ImgPeople2 from "pages/landing-page/images/slider/people-2.svg";
import ImgPeople3 from "pages/landing-page/images/slider/people-3.svg";
import ImgPeopleBg from "pages/landing-page/images/slider/people-bg.svg";
import ImgPeopleOptimization from "pages/landing-page/images/slider/people.svg";
import { REFERRAL_PROGRAM_ROUTE } from "pages/landing-page/static-data/nav-links";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.paths";

export type TSlide = {
  id: number;
  title: string;
  text: string;
  imageBg?: string;
  imageOptimization?: string;
  images: Array<string>;
  link?: string;
};

export const slides: TSlide[] = [
  {
    id: 0,
    title: "landing-page:slider.slide-0-title",
    text: "landing-page:slider.slide-0-text",
    images: [ImgFirstBanner],
    imageOptimization: ImgFirstBanner
  },
  {
    id: 1,
    title: "landing-page:slider.slide-2-title",
    text: "landing-page:slider.slide-2-text",
    imageBg: ImgCreditCardBg,
    images: [ImgCreditCard],
    imageOptimization: ImgCreditCardOptimization,
    link: WALLET_TOTAL_PAGE_ROUTE
  },
  {
    id: 2,
    title: "landing-page:slider.slide-3-title",
    text: "landing-page:slider.slide-3-text",
    imageBg: ImgPeopleBg,
    images: [ImgPeople1, ImgPeople2, ImgPeople3],
    imageOptimization: ImgPeopleOptimization,
    link: REFERRAL_PROGRAM_ROUTE
  }
];
