import { WALLET_TOTAL_PAGE_ROUTE } from "components/wallet/wallet.routes";
import ImgCreditCard from "routes/ssr/landing-page/images/slider/credit-card.svg";
import ImgPeople from "routes/ssr/landing-page/images/slider/people.svg";

export type TSlides = {
  id: number;
  title: string;
  text: string;
  image: string;
  link: string;
};

export const slides: TSlides[] = [
  {
    id: 0,
    title: "Pay with card",
    text:
      "Forget about the burden of having to use an exchange to buy crypto and use your credit card to purchase all sorts of coins necessary to get started with the platform.",
    image: ImgCreditCard,
    link: WALLET_TOTAL_PAGE_ROUTE
  },
  {
    id: 1,
    title: "Enticing invitations",
    text:
      "Use the Genesis Vision two-level Affiliate Network to receive a percentage of the commission paid by the people you invite, and also the people who were invited by them!",
    image: ImgPeople,
    link: "/referral-program"
  }
];
