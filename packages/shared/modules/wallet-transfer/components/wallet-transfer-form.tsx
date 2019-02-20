import "./wallet-transfer-form.scss";

import { FormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import filesService from "shared/services/file-service";
import { validateFraction } from "shared/utils/formatter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { DeepReadonly } from "utility-types";

const getWalletsTo = (
  wallets: WalletData[],
  sourceId: string
): WalletData[] => {
  return wallets.filter(wallet => wallet.id !== sourceId);
};

export interface ITransferFormValues {
  sourceId: string;
  destinationId: string;
  amount: number;
}

type IWalletTransferForm = InjectedTranslateProps &
  FormikProps<ITransferFormValues> &
  DeepReadonly<{
    wallets: Array<WalletData>;
    currencyWallet: WalletData;
  }> & {
    onSubmit(values: ITransferFormValues): void;
    disabled: boolean;
    errorMessage?: string;
  };

class WalletTransferForm extends React.Component<IWalletTransferForm> {
  onChangeSourceId = (name, target) => {
    const { setFieldValue, values } = this.props;
    const currencyFromNew = target.props.value;
    if (currencyFromNew === values.destinationId) {
      setFieldValue("destinationId", values.sourceId);
    }
    setFieldValue("sourceId", currencyFromNew);
  };

  onChangeDestinationId = (name, target) => {
    const { setFieldValue } = this.props;
    setFieldValue("destinationId", target.props.value);
  };

  render() {
    const {
      t,
      handleSubmit,
      wallets,
      values,
      disabled,
      isValid,
      dirty,
      errorMessage,
      setFieldValue
    } = this.props;

    const { sourceId, destinationId } = values;

    const walletsTo = getWalletsTo(wallets, sourceId);
    const selectedFromWallet =
      wallets.find(wallet => wallet.id === sourceId) || ({} as WalletData);

    const selectedToWallet =
      walletsTo.find(wallet => wallet.id === destinationId) ||
      ({} as WalletData);

    const availableToWithdrawalFrom = selectedFromWallet.available;
    const availableToWithdrawalTo = selectedToWallet.available;

    const isAllow = (values: any) => {
      const { floatValue, formattedValue, value, sourceId } = values;
      return (
        formattedValue === "" ||
        (validateFraction(value, sourceId) &&
          floatValue <= parseFloat(availableToWithdrawalFrom.toString()))
      );
    };

    const setMaxAmount = () => {
      setFieldValue(
        "amount",
        formatCurrencyValue(
          availableToWithdrawalFrom,
          selectedFromWallet.currency
        )
      );
    };

    return (
      <form
        id="wallet-transfer"
        className="wallet-transfer-popup"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("wallet-transfer.title")}</h2>
          </div>
          <GVFormikField
            name="sourceId"
            component={GVTextField}
            label={t("wallet-transfer.from")}
            InputComponent={Select}
            onChange={this.onChangeSourceId}
          >
            {wallets.map(wallet => {
              return (
                <option value={wallet.id} key={`from-${wallet.id}`}>
                  <img
                    src={filesService.getFileUrl(wallet.logo)}
                    className="wallet-transfer-popup__icon"
                    alt={wallet.currency}
                  />
                  {`${wallet.title} | ${wallet.currency}`}
                </option>
              );
            })}
          </GVFormikField>
          <StatisticItem label={t("wallet-transfer.availableFrom")}>
            {`${formatCurrencyValue(
              availableToWithdrawalFrom,
              selectedFromWallet.currency
            )} ${selectedFromWallet.currency}`}
          </StatisticItem>
        </div>
        <div className="dialog__bottom">
          <GVFormikField
            name="destinationId"
            component={GVTextField}
            label={t("wallet-transfer.to")}
            InputComponent={Select}
            onChange={this.onChangeDestinationId}
          >
            {walletsTo.map(wallet => {
              return (
                <option value={wallet.id} key={`to-${wallet.id}`}>
                  <img
                    src={filesService.getFileUrl(wallet.logo)}
                    className="wallet-transfer-popup__icon"
                    alt={wallet.currency}
                  />
                  {`${wallet.title} | ${wallet.currency}`}
                </option>
              );
            })}
          </GVFormikField>
          <StatisticItem label={t("wallet-transfer.availableTo")}>
            {`${formatCurrencyValue(
              availableToWithdrawalTo,
              selectedToWallet.currency
            )} ${selectedToWallet.currency}`}
          </StatisticItem>
          <div className="dialog-field">
            <InputAmountField
              name="amount"
              label={t("wallet-transfer.amount")}
              currency={selectedFromWallet.currency}
              isAllow={isAllow}
              setMax={setMaxAmount}
            />
          </div>
          <div className="form-error">{errorMessage}</div>
          <div className="dialog__buttons">
            <GVButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={disabled || !isValid || !dirty}
            >
              {t("buttons.confirm")}
            </GVButton>
          </div>
          <div className="dialog__info">{t("wallet-transfer.info")}</div>
        </div>
      </form>
    );
  }
}

export default compose<React.FunctionComponent<IWalletTransferForm>>(
  translate(),
  withFormik<IWalletTransferForm, ITransferFormValues>({
    displayName: "wallet-transfer",
    mapPropsToValues: props => {
      const { currencyWallet, wallets } = props;
      let sourceId = currencyWallet ? currencyWallet.id : wallets[0].id;
      const walletTo = getWalletsTo(wallets, sourceId);
      const destinationId = walletTo[0].id;
      return { sourceId, amount: null, destinationId };
    },
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletTransferForm);
