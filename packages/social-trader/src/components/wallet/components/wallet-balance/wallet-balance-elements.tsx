import "./wallet-balance.scss";

import GVColors from "components/gv-styles/gv-colors";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { CurrencyEnum } from "utils/types";

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
      value={total!}
      condition={total !== undefined}
      title={t("wallet-page.total-balance")}
      currency={currency}
      pieContainer={false}
      className="wallet-balance__statistic-item--total"
      tooltipContentLabel={t("wallet-page.tooltip.total-balance")}
    />
    <div className="wallet-balance__elements">
      <WalletBalanceElement
        value={available!}
        condition={available !== undefined}
        totalValue={total}
        title={t("wallet-page.available")}
        currency={currency}
        color={$pieAvailableColor}
        tooltipContentLabel={t("wallet-page.tooltip.available")}
      />
      <WalletBalanceElement
        value={invested!}
        condition={invested !== undefined}
        totalValue={total}
        title={t("wallet-page.invested")}
        currency={currency}
        color={GVColors.$primaryColor}
        tooltipContentLabel={t("wallet-page.tooltip.invested")}
      />
      <WalletBalanceElement
        value={pending!}
        condition={pending !== undefined}
        totalValue={total}
        title={t("wallet-page.trading")}
        currency={currency}
        color={$piePendingColor}
        tooltipContentLabel={t("wallet-page.tooltip.pending")}
      />
    </div>
  </div>
);

interface Props extends WithTranslation {
  total?: number;
  available?: number;
  invested?: number;
  pending?: number;
  currency: CurrencyEnum;
}

const WalletBalanceElements = translate()(React.memo(_WalletBalanceElements));
export default WalletBalanceElements;
