import { TTabsItem } from "routes/ssr/landing-page/components/tab-controls/tab-controls";
import BinanceLogo from "routes/ssr/landing-page/images/brokers/binance.png";
import ExanteLogo from "routes/ssr/landing-page/images/brokers/exante.png";
import GMLogo from "routes/ssr/landing-page/images/brokers/gm.svg";
import HuobiLogo from "routes/ssr/landing-page/images/brokers/huobi.png";
import Just2tradeLogo from "routes/ssr/landing-page/images/brokers/just2trade.png";
import RoboforexLogo from "routes/ssr/landing-page/images/brokers/roboforex.svg";

enum BROKERS {
  GM = "Genesis Markets",
  BINANCE = "Binance",
  ROBOFOREX = "Roboforex",
  EXANTE = "Exante",
  HUOBI = "Huobi",
  JUST2TRADE = "Just2Trade"
}

export type TBrokerInfo = {
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
      link: GMLogo,
      title: BROKERS.GM
    }
  },
  {
    id: 1,
    image: {
      link: BinanceLogo,
      title: BROKERS.BINANCE
    }
  },
  {
    id: 2,
    image: {
      link: RoboforexLogo,
      title: BROKERS.ROBOFOREX
    }
  },
  {
    id: 3,
    image: {
      link: ExanteLogo,
      title: BROKERS.EXANTE
    }
  },
  {
    id: 4,
    image: {
      link: HuobiLogo,
      title: BROKERS.HUOBI
    }
  },
  {
    id: 5,
    image: {
      link: Just2tradeLogo,
      title: BROKERS.JUST2TRADE
    }
  }
];

export const brokersInfo: TBrokerInfo[] = [
  {
    id: 0,
    title: BROKERS.GM,
    description:
      "Genesis Markets is a Forex and Crypto broker that offers trading on the most popular trading terminal in the world — MetaTrader. Genesis Markets allows you to access the best liquidity on traditional markets and multiple crypto exchanges within a single account.\n",
    listItems: [
      {
        text: "Forex, Metals, Commodities, Indices, Shares, Crypto"
      },
      {
        text: "MetaTrader 5"
      },
      {
        text: "BTC, USD Accounts",
        imageBg: ""
      },
      {
        text: "Crypto Margin Trading"
      },
      {
        number: "500+",
        text: "Altcoins"
      },
      {
        number: "74",
        text: "Forex Instruments"
      }
    ]
  },
  {
    id: 1,
    title: BROKERS.BINANCE,
    description:
      "Binance is one of the largest global cryptocurrency exchanges that provides an ecosystem for trading a wide range of different crypto assets.\n",
    listItems: [
      {
        text: "Forex, Metals, Commodities, Indices, Shares, Crypto"
      },
      {
        text: "MetaTrader 5"
      },
      {
        text: "BTC, USD Accounts",
        imageBg: ""
      },
      {
        text: "Crypto Margin Trading"
      },
      {
        number: "500+",
        text: "Altcoins"
      },
      {
        number: "74",
        text: "Forex Instruments"
      }
    ]
  },
  {
    id: 2,
    title: BROKERS.ROBOFOREX,
    description:
      "RoboForex Ltd is an international IFSC Belize regulated broker which is a member of the RoboForex group. RoboForex provides an access to a wide range of financial instruments and account types.",
    listItems: [
      {
        text: "Forex, Metals, Commodities, Indices, Shares, Crypto"
      },
      {
        text: "MetaTrader 5"
      },
      {
        text: "BTC, USD Accounts",
        imageBg: ""
      },
      {
        text: "Crypto Margin Trading"
      },
      {
        number: "500+",
        text: "Altcoins"
      },
      {
        number: "74",
        text: "Forex Instruments"
      }
    ]
  },
  {
    id: 3,
    title: BROKERS.EXANTE,
    description:
      "EXANTE is a European investment services company established in 2011 that offers global multi-asset financial services, including direct access to a wide range of financial markets in the US, European Union and Asia-Pacific",
    listItems: [
      {
        text: "Forex, Metals, Commodities, Indices, Shares, Crypto"
      },
      {
        text: "MetaTrader 5"
      },
      {
        text: "BTC, USD Accounts",
        imageBg: ""
      },
      {
        text: "Crypto Margin Trading"
      },
      {
        number: "500+",
        text: "Altcoins"
      },
      {
        number: "74",
        text: "Forex Instruments"
      }
    ]
  },
  {
    id: 4,
    title: BROKERS.HUOBI,
    description:
      "Huobi is one of the largest Singapore-based cryptocurrency exchanges,  judging by 24-hour period volume. Founded in China, the company now has offices in Hong Kong, Korea, Japan and the United States.",
    listItems: [
      {
        text: "Forex, Metals, Commodities, Indices, Shares, Crypto"
      },
      {
        text: "MetaTrader 5"
      },
      {
        text: "BTC, USD Accounts",
        imageBg: ""
      },
      {
        text: "Crypto Margin Trading"
      },
      {
        number: "500+",
        text: "Altcoins"
      },
      {
        number: "74",
        text: "Forex Instruments"
      }
    ]
  },
  {
    id: 5,
    title: BROKERS.JUST2TRADE,
    description:
      "Just2Trade Inc. is a US-based financial services company with offices in New York and Cyprus and a subsidiary of Russian broker Finam Holdings. Just2Trade is a member of FINRA & SIPC, NFA regulatory organizations",
    listItems: [
      {
        text: "Forex, Metals, Commodities, Indices, Shares, Crypto"
      },
      {
        text: "MetaTrader 5"
      },
      {
        text: "BTC, USD Accounts",
        imageBg: ""
      },
      {
        text: "Crypto Margin Trading"
      },
      {
        number: "500+",
        text: "Altcoins"
      },
      {
        number: "74",
        text: "Forex Instruments"
      }
    ]
  }
];
