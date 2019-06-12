import { CopyTradingAccountInfo, WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import { compose } from "redux";
import Page from "shared/components/page/page";
import { ROLE } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import { WalletRouteProps } from "../wallet.routes";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletContainerTotal from "./wallet-container/wallet-container-total";
import WalletSettingsContainer from "./wallet-settings/wallet-settings-container";

const _WalletTotal: React.FC<Props & WalletRouteProps> = ({
  t,
  role,
  wallet,
  copyTradingAccounts
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
      <WalletContainerTotal
        copyTradingAccounts={copyTradingAccounts}
        wallets={wallet.wallets}
        copytrading={role === ROLE.INVESTOR}
      />
    </div>
  </Page>
);

interface Props extends WithRoleProps, OwnProps, InjectedTranslateProps {}

interface OwnProps {
  wallet: WalletMultiSummary;
  copyTradingAccounts: CopyTradingAccountInfo[];
}

const WalletTotal = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  withRole,
  translate(),
  React.memo
)(_WalletTotal);
export default WalletTotal;
