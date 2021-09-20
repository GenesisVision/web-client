import { Button } from "components/button/button";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import { OPEN_ORDERS_TABLE_COLUMNS } from "./open-orders.helpers";
import styles from "./open-orders.module.scss";
import { OpenOrdersRow } from "./open-orders-row";

interface Props {
  items?: UnitedOrder[];
}

export const OpenOrders: React.FC<Props> = ({ items }) => {
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
      className={styles["open-orders__table"]}
      columns={OPEN_ORDERS_TABLE_COLUMNS}
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
                {t("Cancel all")}
              </Button>
            ) : (
              ""
            )
          ) : (
            <Text muted>{t(`${name}`)}</Text>
          )}
        </th>
      )}
      renderRow={({
        quantityFilled,
        quantity,
        id,
        time,
        symbol,
        type,
        side,
        stopPrice,
        price
      }: UnitedOrder) => {
        return (
          <OpenOrdersRow
            key={id}
            orderId={id}
            time={time}
            symbol={symbol}
            type={type}
            side={side}
            stopPrice={String(stopPrice)}
            price={String(price)}
            origQty={String(quantity)}
            filled={
              quantity && quantityFilled ? (quantityFilled / quantity) * 100 : 0
            }
            total={+quantity * +price}
          />
        );
      }}
    />
  );
};
