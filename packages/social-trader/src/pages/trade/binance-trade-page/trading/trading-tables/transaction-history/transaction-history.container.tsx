import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { filterOrderEventsStream } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { SpotOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { TerminalMethodsContext } from "../../contexts/terminal-methods.context";
import { withTradingTable } from "../with-trading-table";
import { TransactionHistory } from "./transaction-history";

const TransactionHistoryContainer: React.FC = () => {
  // const { exchangeAccountId, $userStream } = useContext(TerminalInfoContext);

  // const [socketData, setSocketData] = useState<SpotOrder[] | undefined>();

  // useEffect(() => {
  //   if (!exchangeAccountId || !$userStream) return;
  //   const openOrdersStream = filterOrderEventsStream($userStream);
  //   openOrdersStream.subscribe(data => {
  //     setSocketData([data]);
  //   });
  // }, [exchangeAccountId, $userStream]);
  const { getTransactionHistory } = useContext(TerminalMethodsContext);

  const { exchangeAccountId } = useContext(TerminalInfoContext);
  const { sendRequest, data: items } = useApiRequest({
    request: getTransactionHistory!
  });

  useEffect(() => {
    if (exchangeAccountId) {
      sendRequest({ accountId: exchangeAccountId });
    }
  }, [exchangeAccountId]);

  const transactions = useMemo(() => {
    return items
      ? items?.sort((a, b) => +new Date(b.time) - +new Date(a.time))
      : [];
  }, [items]);

  return <TransactionHistory items={transactions} />;
};

export default withTradingTable(TransactionHistoryContainer);
