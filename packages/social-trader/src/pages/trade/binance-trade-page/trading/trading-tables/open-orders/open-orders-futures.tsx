import clsx from "clsx";
import { Button } from "components/button/button";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { FuturesOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import { OPEN_ORDERS_FUTURES_TABLE_COLUMNS } from "./open-orders.helpers";
import styles from "./open-orders.module.scss";
import { OpenOrdersFuturesRow } from "./open-orders-futures-row";

interface Props {
  items?: FuturesOrder[];
}

export const OpenOrdersFutures: React.FC<Props> = ({ items }) => {
  const { cancelAllOrders } = useContext(TerminalMethodsContext);
  const [t] = useTranslation();
  const { exchangeAccountId, symbol } = useContext(TerminalInfoContext);
  const { sendRequest, isPending } = useApiRequest({
    request: ({
      options,
      exchangeAccountId
    }: {
      options: { symbol?: string; useServerTime?: boolean };
      exchangeAccountId: string;
    }) => cancelAllOrders(options, exchangeAccountId)
  });
  const handleCancel = useCallback(() => {
    return sendRequest({
      options: {},
      exchangeAccountId
    });
  }, [symbol, exchangeAccountId]);
  return (
    <TradeTable
      className={clsx(
        styles["open-orders__table"],
        styles["open-orders__table--futures"]
      )}
      columns={OPEN_ORDERS_FUTURES_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={({ name }) => (
        <th>
          {name === "cancel-all" ? (
            items?.length ? (
              <Button
                noPadding
                variant={"text"}
                disabled={isPending}
                isPending={isPending}
                size={"small"}
                color={"danger"}
                onClick={handleCancel}
              >
                {t("trade:open-orders.table.cancel-all")}
              </Button>
            ) : (
              ""
            )
          ) : (
            <Text muted>{t(`trade:open-orders.table.${name}`)}</Text>
          )}
        </th>
      )}
      renderRow={(order: FuturesOrder) => {
        return <OpenOrdersFuturesRow key={order.id} {...order} />;
      }}
    />
  );
};
