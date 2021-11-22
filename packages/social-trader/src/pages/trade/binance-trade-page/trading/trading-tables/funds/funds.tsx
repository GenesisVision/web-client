import { Text } from "components/text/text";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { AssetBalance } from "pages/trade/binance-trade-page/trading/terminal.types";
import { FUNDS_TABLE_COLUMNS } from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds.helpers";
import { FundsRow } from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds-row";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./funds.module.scss";

interface Props {
  items: AssetBalance[];
}

const _Funds: React.FC<Props> = ({ items }) => {
  const currency = useAccountCurrency();
  const [t] = useTranslation();

  return (
    <TradeTable
      className={styles["funds__table"]}
      items={items}
      columns={FUNDS_TABLE_COLUMNS}
      renderHeaderCell={({ name }) => (
        <th key={name}>
          <Text muted>
            {name === "-value" ? `${currency}${name}` : t(name)}
          </Text>
        </th>
      )}
      renderRow={({ asset, free, locked, amountInCurrency }: AssetBalance) => (
        <FundsRow
          key={asset}
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
