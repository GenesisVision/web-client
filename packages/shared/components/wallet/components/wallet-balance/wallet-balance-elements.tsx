import "./wallet-balance.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVColors from "shared/components/gv-styles/gv-colors";
import { CurrencyEnum } from "shared/utils/types";

import WalletBalanceElement from "./wallet-balance-element";

export const $piePendingColor = "#f7931a";
export const $pieAvailableColor = "#5758a5";

const _WalletBalanceElements: React.FC<Props> = ({
  t,
  pending,
  total,
  currency,
  available,
  invested
}) => (
  <div className="wallet-balance__wrapper">
    <WalletBalanceElement
      value={total}
      title={t("wallet-page.total-balance")}
      currency={currency}
      pieContainer={false}
      className="wallet-balance__statistic-item--total"
    />
    <div className="wallet-balance__elements">
      <WalletBalanceElement
        value={available}
        totalValue={total}
        title={t("wallet-page.available")}
        currency={currency}
        color={$pieAvailableColor}
      />
      <WalletBalanceElement
        value={invested}
        totalValue={total}
        title={t("wallet-page.invested-value")}
        currency={currency}
        color={GVColors.$primaryColor}
      />
      <WalletBalanceElement
        value={pending}
        totalValue={total}
        title={t("wallet-page.pending")}
        currency={currency}
        color={$piePendingColor}
      />
    </div>
  </div>
);

interface Props extends InjectedTranslateProps {
  total: number;
  available: number;
  invested: number;
  pending: number;
  currency: CurrencyEnum;
}

const WalletBalanceElements = React.memo(translate()(_WalletBalanceElements));
export default WalletBalanceElements;
