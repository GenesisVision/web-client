import ImgAccess from "routes/ssr/landing-page/images/advantages/access.svg";
import ImgChoose from "routes/ssr/landing-page/images/advantages/choose.svg";
import ImgControl from "routes/ssr/landing-page/images/advantages/control.svg";
import { JOIN_ROUTE } from "routes/ssr/landing-page/static-data/nav-links";

export type TNews = {
  title: string;
  text: string;
  tag?: string;
  url?: string;
};

export const newsItems: TNews[] = [
  {
    title: "Genesis Vision 2.0",
    text: "Long awaited update released",
    tag: "Hot",
    url: ""
  },
  {
    title: "Genesis Vision",
    text: "Behind the scenes at GenesisVision",
    url: "https://twitter.com/genesis_vision/status/1205432776973004800"
  },
  {
    title: "Genesis Markets",
    text: "Genesis Markets updates symbols",
    url: "https://blog.genesis.vision/genesis-markets-update-677bd6dbc5f6"
  },
  {
    title: "Genesis Vision",
    text: "B2Broker partnership details",
    url: "https://blog.genesis.vision/b2broker-partnership-c9442a59486f"
  }
];
