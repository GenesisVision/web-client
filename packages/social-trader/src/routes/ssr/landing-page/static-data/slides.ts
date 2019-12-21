import ImgCreditCard from "routes/ssr/landing-page/images/slider/credit-card.svg";
import ImgPeople from "routes/ssr/landing-page/images/slider/people.svg";

export type TSlides = {
  id: number;
  title: string;
  text: string;
  url: string;
};

export const slides: TSlides[] = [
  {
    id: 0,
    title: "Pay with card",
    text:
      "Receive a 100% bonus on any deposit made on Genesis Markets. The bonus is unlocked as soon as you start trading!",
    url: ImgCreditCard
  },
  {
    id: 1,
    title: "Enticing invitations",
    text:
      "Use the Genesis Vision two-level Affiliate Network to receive a percentage of the commission paid by the people you invite, and also the people who were invited by them!",
    url: ImgPeople
  }
];
