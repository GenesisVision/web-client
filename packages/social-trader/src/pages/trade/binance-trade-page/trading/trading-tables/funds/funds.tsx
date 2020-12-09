import { Text } from "components/text/text";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { AssetBalance } from "pages/trade/binance-trade-page/trading/terminal.types";
import { FundsRow } from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds-row";
import {
  FUNDS_TABLE_COLUMNS,
  FUTURES_FUNDS_TABLE_COLUMNS
} from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds.helpers";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from "./funds.module.scss";

interface Props {
  items: AssetBalance[];
}

const _Funds: React.FC<Props> = ({ items }) => {
  const currency = useAccountCurrency();
  const [t] = useTranslation();
  const { terminalType } = useContext(TerminalInfoContext);
  const columns =
    terminalType === "spot" ? FUNDS_TABLE_COLUMNS : FUTURES_FUNDS_TABLE_COLUMNS;
  return (
    <TradeTable
      className={styles["funds__table"]}
      items={items}
      columns={columns}
      renderHeaderCell={({ name }) => (
        <th>
          <Text muted>
            {name === "-value" ? `${currency}${name}` : t(name)}
          </Text>
        </th>
      )}
      renderRow={({ asset, free, locked, amountInCurrency }: AssetBalance) => (
        <FundsRow
          amountInCurrency={amountInCurrency}
          asset={asset}
          available={free}
          locked={locked}
        />
      )}
    />
  );
};

export const Funds = React.memo(_Funds);
