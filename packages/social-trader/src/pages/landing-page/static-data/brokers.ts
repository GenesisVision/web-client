import { TTabsItem } from "pages/landing-page/components/tab-controls/tab-controls";
import BinanceLogo from "pages/landing-page/images/brokers/binance.png";
import ExanteLogo from "pages/landing-page/images/brokers/exante.png";
import HuobiLogo from "pages/landing-page/images/brokers/huobi.png";
import RoboforexLogo from "pages/landing-page/images/brokers/roboforex.svg";

enum BROKERS {
  GM = "Genesis Markets",
  BINANCE = "Binance",
  ROBOFOREX = "Roboforex",
  EXANTE = "Exante",
  HUOBI = "Huobi"
}

export type TBrokerInfo = {
  type?: "Attach" | "Create";
  id: number;
  title: string;
  description?: string;
  listItems: TBrokerItem[];
};

export type TBrokerItem = {
  text: string;
  number?: string;
  imageBg?: string;
};

export const brokersTabs: TTabsItem[] = [
  {
    id: 0,
    image: {
      link: BinanceLogo,
      title: BROKERS.BINANCE
    }
  },
  {
    id: 1,
    image: {
      link: RoboforexLogo,
      title: BROKERS.ROBOFOREX
    }
  },
  {
    id: 2,
    image: {
      link: ExanteLogo,
      title: BROKERS.EXANTE
    }
  },
  {
    id: 3,
    image: {
      link: HuobiLogo,
      title: BROKERS.HUOBI
    }
  }
];

export const brokersInfo: TBrokerInfo[] = [
  {
    type: "Attach",
    id: 0,
    title: BROKERS.BINANCE,
    description: "landing-page:brokers.description-binance",
    listItems: [
      {
        number: "landing-page:brokers.number-binance",
        text: "landing-page:brokers.text-binance-1"
      },
      {
        text: "landing-page:brokers.text-binance-2"
      },
      {
        text: "landing-page:brokers.text-binance-3"
      },
      {
        text: "landing-page:brokers.text-binance-4"
      }
    ]
  },
  {
    id: 1,
    title: BROKERS.ROBOFOREX,
    description: "landing-page:brokers.description-rf",
    listItems: [
      {
        number: "landing-page:brokers.number-rf",
        text: "landing-page:brokers.text-rf-1"
      },
      {
        text: "landing-page:brokers.text-rf-2"
      },
      {
        text: "landing-page:brokers.text-rf-3"
      },
      {
        text: "landing-page:brokers.text-rf-4"
      },
      {
        text: "landing-page:brokers.text-rf-5"
      }
    ]
  },
  {
    id: 2,
    title: BROKERS.EXANTE,
    description: "landing-page:brokers.description-exante",
    listItems: [
      {
        number: "landing-page:brokers.number-exante",
        text: "landing-page:brokers.text-exante-1"
      },
      {
        text: "landing-page:brokers.text-exante-2"
      },
      {
        text: "landing-page:brokers.text-exante-3"
      },
      {
        text: "landing-page:brokers.text-exante-4"
      }
    ]
  },
  {
    id: 3,
    title: BROKERS.HUOBI,
    description: "landing-page:brokers.description-huobi",
    listItems: [
      {
        number: "landing-page:brokers.number-huobi",
        text: "landing-page:brokers.text-huobi-1"
      },
      {
        text: "landing-page:brokers.text-huobi-2"
      },
      {
        text: "landing-page:brokers.text-huobi-3"
      }
    ]
  }
];
