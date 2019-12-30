import WalletImage from "components/avatar/wallet-image/wallet-image";
import Page from "components/page/page";
import { withBlurLoader } from "decorators/with-blur-loader";
import { WalletData } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import WalletBalanceButtons from "./wallet-balance/wallet-balance-buttons";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletTables from "./wallet-tables/wallet-tables";

const _WalletCurrency: React.FC<Props> = ({ data: info }) => {
  const [t] = useTranslation();
  return (
    <Page title={info.title}>
      <div className="wallet-balance">
        <div className="wallet-balance__wrapper">
          <div className="wallet-balance__title">
            <h1>
              {info.title}
              <span>&nbsp;{t("wallet-page.wallet")}</span>
            </h1>
            <WalletImage
              url={info.logo}
              imageClassName="wallet-balance__title-icon"
              alt={info.currency}
            />
          </div>
          <WalletBalanceButtons currentItem={info} />
        </div>
        <WalletBalanceElements
          available={info.available}
          pending={info.trading}
          total={info.total}
          invested={info.invested}
          currency={info.currency}
        />
      </div>
      <WalletTables currency={info.currency} />
    </Page>
  );
};

interface Props {
  data: WalletData;
}

const WalletCurrency = withBlurLoader(React.memo(_WalletCurrency));
export default WalletCurrency;
