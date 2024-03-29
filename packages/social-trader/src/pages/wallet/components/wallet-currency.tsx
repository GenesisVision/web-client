import WalletImage from "components/avatar/wallet-image/wallet-image";
import Page from "components/page/page";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import { WalletData } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import WalletBalanceButtons from "./wallet-balance/wallet-balance-buttons";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletTables from "./wallet-tables/wallet-tables";
import styles from "./wallet-title-block.module.scss";

const _WalletCurrency: React.FC<Props> = ({ data: info }) => {
  const [t] = useTranslation();
  return (
    <Page title={info.title}>
      <div className={styles["wallet-title-block"]}>
        <Row wrap>
          <RowItem>
            <Row>
              <RowItem>
                <h1>
                  {info.title}
                  <span className={styles["wallet-title-block__title-wallet"]}>
                    &nbsp;{t("wallet-page:wallet")}
                  </span>
                </h1>
              </RowItem>
              <WalletImage
                url={info.logoUrl}
                imageClassName={styles["wallet-title-block__title-icon"]}
                alt={info.currency}
              />
            </Row>
          </RowItem>
          <RowItem size={"large"}>
            <WalletBalanceButtons currentItem={info} />
          </RowItem>
        </Row>
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
