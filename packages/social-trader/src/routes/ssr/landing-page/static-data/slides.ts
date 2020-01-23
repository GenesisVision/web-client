import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.routes";
import ImgBoxing1 from "routes/ssr/landing-page/images/slider/boxing-1.svg";
import ImgBoxing2 from "routes/ssr/landing-page/images/slider/boxing-2.svg";
import ImgBoxing3 from "routes/ssr/landing-page/images/slider/boxing-3.svg";
import ImgBoxingBg from "routes/ssr/landing-page/images/slider/boxing-bg.svg";
import ImgCreditCard from "routes/ssr/landing-page/images/slider/credit-card-1.svg";
import ImgCreditCardBg from "routes/ssr/landing-page/images/slider/credit-card-bg.svg";
import ImgPeople1 from "routes/ssr/landing-page/images/slider/people-1.svg";
import ImgPeople2 from "routes/ssr/landing-page/images/slider/people-2.svg";
import ImgPeople3 from "routes/ssr/landing-page/images/slider/people-3.svg";
import ImgPeopleBg from "routes/ssr/landing-page/images/slider/people-bg.svg";
import { REFERRAL_PROGRAM_ROUTE } from "routes/ssr/landing-page/static-data/nav-links";

const CREATE_ACCOUNT_BROKER_ROUTE =
  "create-account?broker=Genesis%20Markets%20Demo";

export type TSlides = {
  id: number;
  title: string;
  text: string;
  imageBg?: string;
  images: Array<string>;
  link: string;
};

export const slides: TSlides[] = [
  {
    id: 0,
    title: "Trade on Demo",
    text:
      "Learn to trade or test your strategies without any financial risks and limitations",
    imageBg: ImgBoxingBg,
    images: [ImgBoxing1, ImgBoxing2, ImgBoxing3],
    link: CREATE_ACCOUNT_BROKER_ROUTE
  },
  {
    id: 1,
    title: "Pay with card",
    text:
      "Use your credit or debit card to buy crypto - get started right away as a trader, an investor or a manager on the Genesis Vision platform.",
    imageBg: ImgCreditCardBg,
    images: [ImgCreditCard],
    link: WALLET_TOTAL_PAGE_ROUTE
  },
  {
    id: 2,
    title: "Enticing invitations",
    text:
      "Use the Genesis Vision two-level Affiliate Network to receive a percentage of the commission paid by your referrals… and your referrals’ referrals!",
    imageBg: ImgPeopleBg,
    images: [ImgPeople1, ImgPeople2, ImgPeople3],
    link: REFERRAL_PROGRAM_ROUTE
  }
];
