import copy from "copy-to-clipboard";
import { InjectedFormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogField } from "shared/components/dialog/dialog-field";
import { DialogTop } from "shared/components/dialog/dialog-top";
import GVButton from "shared/components/gv-button";
import GVqr from "shared/components/gv-qr/gv-qr";
import CopyIcon from "shared/components/icon/copy-icon";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

const _WalletAddFundsForm: React.FC<InjectedFormikProps<Props, FormValues>> = ({
  t,
  wallets,
  notifySuccess,
  notifyError,
  currentWallet,
  setFieldValue
}) => {
  const [selected, setSelected] = useState<WalletData>(currentWallet);
  const { depositAddress } = selected;
  const onChangeWallet = useCallback(
    (event: ISelectChangeEvent) => {
      setSelected(wallets.find(wallet => wallet.id === event.target.value)!);
      setFieldValue(FIELDS.id, event.target.value);
    },
    [wallets, setSelected]
  );
  const onCopy = useCallback(() => {
    try {
      copy(depositAddress);
      notifySuccess(t("wallet-deposit.copy-to-clipboard-success"));
    } catch (error) {
      notifyError(t("wallet-deposit.copy-to-clipboard-error"));
    }
  }, [depositAddress]);
  return (
    <div className="wallet-add-funds-popup">
      <DialogTop title={t("wallet-deposit.title")}>
        <form id="wallet-deposit" noValidate>
          <WalletSelect
            name={FIELDS.id}
            label={t("wallet-deposit.select-currency")}
            items={wallets}
            onChange={onChangeWallet}
          />
        </form>
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
            {depositAddress}
          </StatisticItem>
        </DialogField>
        <DialogButtons>
          <GVButton
            color="secondary"
            onClick={onCopy}
            disabled={!depositAddress}
          >
            <>
              <CopyIcon />
              &nbsp;
              {t("buttons.copy")}
            </>
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </div>
  );
};

const WalletAddFundsForm = compose<React.FC<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  withFormik<Props, FormValues>({
    displayName: "wallet-deposit",
    mapPropsToValues: ({ currentWallet: { id } }) => ({
      [FIELDS.id]: id
    }),
    handleSubmit: () => {}
  }),
  React.memo
)(_WalletAddFundsForm);
export default WalletAddFundsForm;

enum FIELDS {
  id = "id"
}

interface FormValues {
  [FIELDS.id]: string;
}

interface OwnProps {
  wallets: WalletData[];
  currentWallet: WalletData;
  notifySuccess(text: string): void;
  notifyError(text: string): void;
}

interface Props extends WithTranslation, OwnProps {}
