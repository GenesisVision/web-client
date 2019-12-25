import ImgAccess from "routes/ssr/landing-page/images/advantages/access.svg";
import ImgChoose from "routes/ssr/landing-page/images/advantages/choose.svg";
import ImgControl from "routes/ssr/landing-page/images/advantages/control.svg";
import { JOIN_ROUTE } from "routes/ssr/landing-page/static-data/nav-links";

export type TAdvantages = {
  title: string;
  text: string;
  image?: string;
};

export const advantagesItems: TAdvantages[] = [
  {
    title: "Access all financial markets",
    text:
      "Open multi broker trading platform. Access to Forex, Crypto and Stocks markets. Wide range of instruments and asset classes",
    image: ImgAccess
  },
  {
    title: "Choose the best tool to make money",
    text: "Trade, Invest, Manage, Follow or become the followed one",
    image: ImgChoose
  },
  {
    title: "Control your exposure",
    text:
      "Wide range of investment opportunities in different risk/profitability level categories - Asset Management, Funds, Copytrading. Risk analysis and management",
    image: ImgControl
  }
];
