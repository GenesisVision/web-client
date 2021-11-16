import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import React, { useContext, useMemo } from "react";

import { TerminalMethodsContext } from "../../contexts/terminal-methods.context";
import { withTradingTable } from "../with-trading-table";
import { TransactionHistory } from "./transaction-history";

const TransactionHistoryContainer: React.FC = () => {
  const { getTransactionHistory } = useContext(TerminalMethodsContext);
  const { exchangeAccountId } = useContext(TerminalInfoContext);

  const { data: items } = useApiRequest({
    request: getTransactionHistory!,
    fetchOnMount: true,
    fetchOnMountData: { accountId: exchangeAccountId }
  });

  const transactions = useMemo(() => {
    return items?.sort((a, b) => +new Date(b.time) - +new Date(a.time));
  }, [items]);

  return <TransactionHistory items={transactions} />;
};

export default withTradingTable(TransactionHistoryContainer);
