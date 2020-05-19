import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { WalletData } from "gv-api-web";
import LineTransferButton from "pages/wallet/components/wallet-tables/buttons/line-transfer-button";
import * as React from "react";
import { useTranslation } from "react-i18next";

import LineDepositButton from "../buttons/line-deposit-button";
import LineWithdrawButton from "../buttons/line-withdraw-button";
import styles from "./wallet-list.module.scss";

const _WalletListButton: React.FC<IWalletListButton> = ({ wallet }) => {
  const {
    currency,
    isWithdrawalEnabled,
    isDepositEnabled,
    depositUrlCoindirect
  } = wallet;
  const [t] = useTranslation();
  return (
    <Row className={styles["wallet-list__buttons"]}>
      {depositUrlCoindirect && (
        <RowItem>
          <a
            title={t("wallet-page.list.buy-with-card")}
            href={depositUrlCoindirect}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            {t("wallet-page.list.buy-with-card")}
          </a>
        </RowItem>
      )}
      <LineTransferButton wallet={wallet} />
      <LineWithdrawButton currency={currency} disabled={!isWithdrawalEnabled} />
      <LineDepositButton currency={currency} disabled={!isDepositEnabled} />
    </Row>
  );
};

interface IWalletListButton {
  wallet: WalletData;
}

const WalletListButton = React.memo(_WalletListButton);
export default WalletListButton;
