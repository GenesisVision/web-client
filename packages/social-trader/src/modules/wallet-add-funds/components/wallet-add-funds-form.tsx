import { CurrencySourceSelectElement } from "components/currency-source-select/currency-source-select.element";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import GVqr from "components/gv-qr/gv-qr";
import { Row } from "components/row/row";
import { ISelectChangeEvent } from "components/select/select";
import StatisticItem from "components/statistic-item/statistic-item";
import withLoader from "decorators/with-loader";
import { WalletData } from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";

import styles from "./wallet-add-funds-form.module.scss";

const _WalletAddFundsForm: React.FC<Props> = ({ wallets, currentWallet }) => {
  const [t] = useTranslation();
  const [selected, setSelected] = useState<WalletData>(currentWallet);
  const { depositAddress } = selected;
  const onChangeWallet = useCallback(
    (event: ISelectChangeEvent) => {
      setSelected(
        safeGetElemFromArray(
          wallets,
          wallet => wallet.id === event.target.value
        )
      );
    },
    [wallets, setSelected]
  );
  return (
    <div>
      <DialogTop title={t("wallet-deposit.title")}>
        <Row large>
          <CurrencySourceSelectElement
            name=""
            items={wallets}
            value={selected.id}
            wide
            label={t("wallet-deposit.select-currency")}
            onChange={onChangeWallet}
          />
        </Row>
      </DialogTop>
      <DialogBottom className={styles["wallet-add-funds-popup__bottom"]}>
        <Row>
          <GVqr value={depositAddress} />
        </Row>
        <Row>
          <StatisticItem
            className={styles["wallet-add-funds-popup__address"]}
            label={t("wallet-deposit.deposit-address")}
          >
            <div className={styles["wallet-add-funds-popup__address-value"]}>
              {depositAddress}
            </div>
          </StatisticItem>
        </Row>
        <DialogButtons>
          <CopyButton wide value={depositAddress} />
        </DialogButtons>
      </DialogBottom>
    </div>
  );
};

interface Props {
  wallets: WalletData[];
  currentWallet: WalletData;
}

const WalletAddFundsForm = withLoader(React.memo(_WalletAddFundsForm));
export default WalletAddFundsForm;
