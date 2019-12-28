import { TTabsItem } from "routes/ssr/landing-page/components/tab-controls/tab-controls";
import TradeTab from "routes/ssr/landing-page/images/tabs/trade-tab.png";
import { TRADE_ROUTE } from "routes/trade.routes";

type TInfoText = {
  text: string;
  bold?: boolean;
};

export type TInfoItem = {
  texts?: TInfoText[];
  image?: string;
  button?: {
    text: string;
    link?: string;
  };
};

export type TInfoList = {
  id: number;
  listItems: TInfoItem[];
};

export const infoTabs: TTabsItem[] = [
  {
    id: 0,
    text: "Trade"
  },
  {
    id: 1,
    text: "Invest"
  },
  {
    id: 2,
    text: "Partake"
  }
];

export const infoList: TInfoList[] = [
  {
    id: 0,
    listItems: [
      {
        texts: [
          {
            text: "Trade on your favorite"
          },
          {
            text: " Brokerage or Exchange",
            bold: true
          }
        ]
      },
      {
        texts: [
          {
            text: "Trade on any market"
          },
          {
            text: " Crypto, Forex or Stocks",
            bold: true
          }
        ]
      },
      {
        image: TradeTab,
        button: { link: TRADE_ROUTE, text: "Join" }
      },
      {
        texts: [
          {
            text: "Follow"
          },
          {
            text: " the most successful traders’ strategies",
            bold: true
          }
        ]
      }
    ]
  },
  {
    id: 1,
    listItems: [
      {
        texts: [
          {
            text: "Invest in"
          },
          {
            text: " the best performing managers",
            bold: true
          }
        ]
      },
      {
        texts: [
          {
            text: "Automatically copy"
          },
          {
            text: " professionals' trades",
            bold: true
          }
        ]
      },
      {
        texts: [
          {
            text:
              "Choose your perfect investment opportunity, based on risk and profitability levels analysis"
          }
        ]
      },
      {
        image: TradeTab,
        button: { link: TRADE_ROUTE, text: "Join" }
      }
    ]
  },
  {
    id: 2,
    listItems: [
      {
        texts: [
          {
            text: "Provide trading signals and build an"
          },
          {
            text: " army of followers around your strategies",
            bold: true
          }
        ]
      },
      {
        texts: [
          {
            text: "Create your own"
          },
          {
            text: " Fund",
            bold: true
          },
          {
            text: " or an"
          },
          {
            text: " Asset Management Program",
            bold: true
          }
        ]
      },
      {
        image: TradeTab,
        button: { link: TRADE_ROUTE, text: "Join" }
      },
      {
        texts: [
          {
            text: "Step in the actively growing"
          },
          {
            text: " multimarket social trading network",
            bold: true
          }
        ]
      }
    ]
  }
];
