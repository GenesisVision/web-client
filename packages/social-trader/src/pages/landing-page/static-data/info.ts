import { TTabsItem } from "pages/landing-page/components/tab-controls/tab-controls";
import TradeTab from "pages/landing-page/images/tabs/trade-tab.png";
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
    text: "landing-page:info.tab-trade"
  },
  {
    id: 1,
    text: "landing-page:info.tab-invest"
  },
  {
    id: 2,
    text: "landing-page:info.tab-partake"
  }
];

export const infoList: TInfoList[] = [
  {
    id: 0,
    listItems: [
      {
        texts: [
          {
            text: "landing-page:info.text-trade-1"
          },
          {
            text: "landing-page:info.text-trade-2",
            bold: true
          }
        ]
      },
      {
        texts: [
          {
            text: "landing-page:info.text-trade-3"
          },
          {
            text: "landing-page:info.text-trade-4",
            bold: true
          }
        ]
      },
      {
        image: TradeTab,
        button: { link: TRADE_ROUTE, text: "landing-page:buttons.join" }
      },
      {
        texts: [
          {
            text: "landing-page:info.text-trade-5"
          },
          {
            text: "landing-page:info.text-trade-6",
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
            text: "landing-page:info.text-invest-1"
          },
          {
            text: "landing-page:info.text-invest-2",
            bold: true
          }
        ]
      },
      {
        texts: [
          {
            text: "landing-page:info.text-invest-3"
          },
          {
            text: "landing-page:info.text-invest-4",
            bold: true
          }
        ]
      },
      {
        texts: [
          {
            text: "landing-page:info.text-invest-5"
          }
        ]
      },
      {
        image: TradeTab,
        button: { link: TRADE_ROUTE, text: "landing-page:buttons.join" }
      }
    ]
  },
  {
    id: 2,
    listItems: [
      {
        texts: [
          {
            text: "landing-page:info.text-partake-1"
          },
          {
            text: "landing-page:info.text-partake-2",
            bold: true
          }
        ]
      },
      {
        texts: [
          {
            text: "landing-page:info.text-partake-3"
          },
          {
            text: "landing-page:info.text-partake-4",
            bold: true
          },
          {
            text: "landing-page:info.text-partake-5"
          },
          {
            text: "landing-page:info.text-partake-6",
            bold: true
          }
        ]
      },
      {
        image: TradeTab,
        button: { link: TRADE_ROUTE, text: "landing-page:buttons.join" }
      },
      {
        texts: [
          {
            text: "landing-page:info.text-partake-7"
          },
          {
            text: "landing-page:info.text-partake-8",
            bold: true
          }
        ]
      }
    ]
  }
];
