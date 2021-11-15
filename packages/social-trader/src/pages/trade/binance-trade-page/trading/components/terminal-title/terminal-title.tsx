import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { TerminalInfoContext } from "../../contexts/terminal-info.context";
import { SymbolState } from "../../terminal.types";
import { terminalMoneyFormat } from "../terminal-money-format/terminal-money-format";

const useTerminalTitle = ({
  amount,
  symbol,
  tickSize,
  trigger
}: {
  symbol: SymbolState;
  amount: number;
  tickSize: string;
  trigger?: number;
}): string => {
  const [t] = useTranslation();

  const appTitle = t("app.title");
  const defaultTitle = t("Trading terminal") + " | " + appTitle;
  const [title, setTitle] = useState(defaultTitle);

  useEffect(() => {
    if (trigger && amount > 0) {
      setTitle(
        `${terminalMoneyFormat({
          amount,
          tickSize
        })} | ${symbol.baseAsset}${symbol.quoteAsset} | ${appTitle}`
      );
    }
  }, [symbol, trigger, amount]);

  return title;
};

interface Props {
  amount: number;
  trigger: number;
}

const TerminalTitle: React.FC<Props> = ({ amount, trigger, children }) => {
  const { tickSize, symbol } = useContext(TerminalInfoContext);

  const title = useTerminalTitle({
    symbol,
    amount,
    tickSize,
    trigger
  });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};

export default TerminalTitle;
