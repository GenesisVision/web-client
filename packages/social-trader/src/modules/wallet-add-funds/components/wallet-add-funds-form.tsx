import { CurrencySourceSelectElement } from "components/currency-source-select/currency-source-select.element";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import { DialogTop } from "components/dialog/dialog-top";
import GVqr from "components/gv-qr/gv-qr";
import { ISelectChangeEvent } from "components/select/select";
import StatisticItem from "components/statistic-item/statistic-item";
import withLoader from "decorators/with-loader";
import { WalletData } from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";

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
    <div className="wallet-add-funds-popup">
      <DialogTop title={t("wallet-deposit.title")}>
        <DialogField>
          <CurrencySourceSelectElement
            name=""
            items={wallets}
            value={selected.id}
            wide
            label={t("wallet-deposit.select-currency")}
            onChange={onChangeWallet}
          />
        </DialogField>
      </DialogTop>
      <DialogBottom className="wallet-add-funds-popup__bottom">
        <DialogField>
          <GVqr className="wallet-add-funds-popup__qr" value={depositAddress} />
        </DialogField>
        <DialogField>
          <StatisticItem
            className="wallet-add-funds-popup__address"
            label={t("wallet-deposit.deposit-address")}
          >
            <div className="wallet-add-funds-popup__address-value">
              {depositAddress}
            </div>
          </StatisticItem>
        </DialogField>
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
