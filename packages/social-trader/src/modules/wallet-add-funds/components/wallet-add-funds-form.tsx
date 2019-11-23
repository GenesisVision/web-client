import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import GVqr from "components/gv-qr/gv-qr";
import CopyIcon from "components/icon/copy-icon";
import { ISelectChangeEvent } from "components/select/select";
import StatisticItem from "components/statistic-item/statistic-item";
import WalletSelect from "components/wallet-select/wallet-select";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { InjectedFormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import useCopy from "hooks/copy.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

const _WalletAddFundsForm: React.FC<InjectedFormikProps<Props, FormValues>> = ({
  wallets,
  currentWallet,
  setFieldValue
}) => {
  const [t] = useTranslation();
  const copy = useCopy("wallet-deposit.copy-to-clipboard-success");
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
    copy(depositAddress);
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
}

interface Props extends OwnProps {}
