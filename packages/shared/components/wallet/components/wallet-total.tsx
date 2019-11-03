import { WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import Page from "shared/components/page/page";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";

import { WalletRouteProps } from "../wallet.routes";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletSettingsContainer from "./wallet-settings/wallet-settings-container";
import WalletTablesTotal from "./wallet-tables/wallet-tables-total";

const _WalletTotal: React.FC<Props & WalletRouteProps> = ({ data: wallet }) => {
  const [t] = useTranslation();
  return (
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
        <WalletTablesTotal wallets={wallet.wallets} />
      </div>
    </Page>
  );
};

interface Props {
  data: WalletMultiSummary;
}

const WalletTotal = compose<
  React.ComponentType<Props & WithBlurLoaderProps<WalletMultiSummary>>
>(
  withBlurLoader,
  React.memo
)(_WalletTotal);
export default WalletTotal;
