import { CopyTradingAccountInfo, WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import Page from "shared/components/page/page";
import { ROLE } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import { WalletRouteProps } from "../wallet.routes";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletSettingsContainer from "./wallet-settings/wallet-settings-container";
import WalletTablesTotal from "./wallet-tables/wallet-tables-total";

const _WalletTotal: React.FC<Props & WalletRouteProps> = ({
  t,
  role,
  wallet,
  copyTradingAccounts,
  copyTradingAccountsPending
}) => (
  <Page title={t("wallet-page.title")}>
    <div className="wallet-balance">
      <div className="wallet-balance__wrapper">
        <h1 className="wallet-balance__title">{t("wallet-page.title")}</h1>
        <WalletSettingsContainer isPayFeesWithGvt={wallet.payFeesWithGvt} />
      </div>
      <WalletBalanceElements
        available={wallet.grandTotal.availableCcy}
        pending={wallet.grandTotal.pendingCcy}
        total={wallet.grandTotal.totalCcy}
        invested={wallet.grandTotal.investedCcy}
        currency={wallet.grandTotal.currencyCcy}
      />
      <WalletTablesTotal
        copyTradingAccounts={copyTradingAccounts}
        copyTradingAccountsPending={copyTradingAccountsPending}
        wallets={wallet.wallets}
        copytrading={role === ROLE.INVESTOR}
      />
    </div>
  </Page>
);

interface Props extends WithRoleProps, OwnProps, WithTranslation {}

interface OwnProps {
  wallet: WalletMultiSummary;
  copyTradingAccounts: CopyTradingAccountInfo[];
  copyTradingAccountsPending: boolean;
}

const WalletTotal = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  withRole,
  translate(),
  React.memo
)(_WalletTotal);
export default WalletTotal;
