import ImgCreditCard from "routes/ssr/landing-page/images/slider/credit-card.svg";
import ImgPeople from "routes/ssr/landing-page/images/slider/people.svg";

export type TAdvantages = {
  title: string;
  text: string;
  image: string;
};

export const advantagesItems: TAdvantages[] = [
  {
    title: "Pay with card",
    text:
      "Receive a 100% bonus on any deposit made on Genesis Markets. The bonus is unlocked as soon as you start trading!",
    image: ImgCreditCard
  },
  {
    title: "Enticing invitations",
    text:
      "Use the Genesis Vision two-level Affiliate Network to receive a percentage of the commission paid by the people you invite, and also the people who were invited by them!",
    image: ImgPeople
  },
  {
    title: "Enticing invitations",
    text:
      "Use the Genesis Vision two-level Affiliate Network to receive a percentage of the commission paid by the people you invite, and also the people who were invited by them!",
    image: ImgPeople
  }
];
