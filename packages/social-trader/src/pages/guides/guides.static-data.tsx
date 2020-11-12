import React from "react";

export type TGuide = {
  id: string;
  canonicalName: string;
  name: string;
  content: JSX.Element;
  button?: JSX.Element;
};

export type TNavGuide = {
  id: string;
  name: string;
  guides: TGuide[];
};

export const navGuides: TNavGuide[] = [
  {
    id: "guides-1",
    name: "Deposit & Withdrawal",
    guides: [
      {
        id: "general-1",
        canonicalName: "general-1",
        name: "What is Genesis Vision?",
        content: (
          <>
            <p>
              Genesis Vision is a multimarket social trading platform that
              provides a wide variety of opportunities for both traders and
              investors, including:
            </p>
            <ul>
              <li>
                Trade Cryptocurrencies, Forex, Metals, Stocks, Indices and
                Commodities on any brokerage/exchange within the Genesis Vision
                partnership network
              </li>
              <li>Create and manage asset management Programs or Funds</li>
              <li>Provide copy trading signals with GV Follow</li>
              <li>Invest in Programs or Funds</li>
              <li>Copy successful trading strategies with GV Follow</li>
            </ul>
          </>
        )
      },
      {
        id: "general-2",
        canonicalName: "general-2",
        name: "What is this platform for?",
        content: (
          <>
            <p>
              Genesis Vision helps traders monetize their skills while providing
              a wide variety of investment opportunities. Our clients can be
              both traders and/or investors on our platform.
            </p>
            <p>
              If you are already familiar with trading, you can create your own
              asset management Program or Fund and attract investors to join.
              You can also create a signal trading account so other users can
              subscribe and copy your trades.
            </p>
            <p>
              If you are an inexperienced trader, you can practice trading on
              your personal trading account and/or copy trading strategies of
              Follow Leaders, or you can choose any Program or Fund to invest
              in.
            </p>
          </>
        )
      }
    ]
  },
  {
    id: "guides-2",
    name: "Investing",
    guides: [
      {
        id: "general-3",
        canonicalName: "general-3",
        name: "What is this platform for?",
        content: (
          <>
            <p>
              Genesis Vision helps traders monetize their skills while providing
              a wide variety of investment opportunities. Our clients can be
              both traders and/or investors on our platform.
            </p>
            <p>
              If you are already familiar with trading, you can create your own
              asset management Program or Fund and attract investors to join.
              You can also create a signal trading account so other users can
              subscribe and copy your trades.
            </p>
            <p>
              If you are an inexperienced trader, you can practice trading on
              your personal trading account and/or copy trading strategies of
              Follow Leaders, or you can choose any Program or Fund to invest
              in.
            </p>
          </>
        )
      }
    ]
  }
];
