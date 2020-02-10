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
    title: "Access all financial markets",
    text:
      "Open multi broker trading platform. Wide range of instruments and asset classes including Forex, Crypto and Stock markets.",
    image: ImgAccess
  },
  {
    title: "Control your exposure",
    text:
      "Wide range of investment opportunities broken by risk tolerance and profitability. Access to risk analysis and management tools. The products offered include Asset Management, Funds and Copytrading.",
    image: ImgChoose
  },
  {
    title: "Choose the best tool to make money",
    text:
      "Choose your role or combine them - Trade, Invest, Manage, Follow or Lead",
    image: ImgControl
  }
];
