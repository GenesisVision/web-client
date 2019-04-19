import "./wallet-transfer-form.scss";

import { FormikProps, withFormik } from "formik";
import {
  CopyTradingAccountInfo,
  InternalTransferRequestDestinationTypeEnum,
  InternalTransferRequestSourceTypeEnum,
  WalletData
} from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TransferRate from "shared/modules/wallet-transfer/components/transfer-rate";
import filesService from "shared/services/file-service";
import { formatCurrencyValue } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";
import { Schema, lazy, number, object } from "yup";

import { TRANSFER_DIRECTION } from "../wallet-transfer-popup";
import * as walletService from "./wallet-transfer.service";

class WalletTransferForm extends React.PureComponent<Props> {
  onChangeSourceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldValue, values } = this.props;
    const currencyFromNew = event.target.value;
    if (currencyFromNew === values.destinationId) {
      setFieldValue("destinationId", values.sourceId);
    }
    setFieldValue("sourceId", currencyFromNew);
  };

  onChangeDestinationId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldValue } = this.props;
    setFieldValue("destinationId", event.target.value);
  };

  isAllow = (values: NumberFormatValues) => values.value !== ".";

  render() {
    const {
      copytradingAccounts,
      sourceType = TRANSFER_DIRECTION.WALLET,
      destinationType = TRANSFER_DIRECTION.WALLET,
      t,
      handleSubmit,
      wallets,
      values,
      isValid,
      dirty,
      errorMessage,
      setFieldValue,
      isSubmitting
    } = this.props;
    const { sourceId, destinationId } = values;
    const fromDirection: Array<CopyTradingAccountInfo | WalletData> =
      sourceType === TRANSFER_DIRECTION.WALLET ? wallets : copytradingAccounts;
    const toDirection =
      destinationType === TRANSFER_DIRECTION.WALLET
        ? wallets
        : copytradingAccounts;
    const destinationWallets = walletService.getDestinationWallets(
      toDirection,
      sourceId
    );
    const selectedSourceWallet = walletService.getSelectedWallet(
      fromDirection,
      sourceId
    );
    const formattedAvailableSourceWallet = formatCurrencyValue(
      selectedSourceWallet.available,
      selectedSourceWallet.currency
    );
    const selectedDestinationWallet = walletService.getSelectedWallet(
      destinationWallets,
      destinationId
    );
    const formattedAvailableToWallet = formatCurrencyValue(
      selectedDestinationWallet.available,
      selectedDestinationWallet.currency
    );

    const setMaxAmount = () => {
      setFieldValue("amount", formattedAvailableSourceWallet);
    };

    const disableButton = isSubmitting || !values.amount || !isValid || !dirty;

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
            {fromDirection.map(wallet => (
              <option value={wallet.id} key={`from-${wallet.id}`}>
                <img
                  src={filesService.getFileUrl(wallet.logo)}
                  className="wallet-transfer-popup__icon"
                  alt={wallet.currency}
                />
                {/*
                  //@ts-ignore*/}
                {`${wallet.title} | ${wallet.currency}`}
              </option>
            ))}
          </GVFormikField>
          <StatisticItem label={t("wallet-transfer.availableFrom")}>
            {`${formattedAvailableSourceWallet} ${
              selectedSourceWallet.currency
            }`}
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
            {destinationWallets.map(wallet => (
              <option value={wallet.id} key={`to-${wallet.id}`}>
                <img
                  src={filesService.getFileUrl(wallet.logo)}
                  className="wallet-transfer-popup__icon"
                  alt={wallet.currency}
                />
                {/*
                  //@ts-ignore*/}
                {`${wallet.title} | ${wallet.currency}`}
              </option>
            ))}
          </GVFormikField>
          <StatisticItem label={t("wallet-transfer.availableTo")}>
            {`${formattedAvailableToWallet} ${
              selectedDestinationWallet.currency
            }`}
          </StatisticItem>
          <div className="dialog-field">
            <InputAmountField
              name="amount"
              label={t("wallet-transfer.amount")}
              currency={selectedSourceWallet.currency}
              setMax={setMaxAmount}
              isAllow={this.isAllow}
            />
          </div>
          <TransferRate
            destinationCurrency={selectedDestinationWallet.currency}
            sourceCurrency={selectedSourceWallet.currency}
          >
            {props => {
              if (values.amount) {
                const value = formatCurrencyValue(
                  props.rate * Number(values.amount),
                  selectedDestinationWallet.currency
                );
                return (
                  <span>{`≈ ${value} ${
                    selectedDestinationWallet.currency
                  }`}</span>
                );
              }
              return null;
            }}
          </TransferRate>
          <div className="form-error">{errorMessage}</div>
          <div className="dialog__buttons">
            <GVButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={disableButton}
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

export default compose<React.FunctionComponent<OwnProps>>(
  translate(),
  withFormik<OwnProps, FormValues>({
    displayName: "wallet-transfer",
    mapPropsToValues: props => {
      const {
        currentWallet,
        wallets,
        copytradingAccounts,
        sourceType = TRANSFER_DIRECTION.WALLET,
        destinationType = TRANSFER_DIRECTION.WALLET
      } = props;
      let sourceId, destinationId;
      const toDirection =
        destinationType === TRANSFER_DIRECTION.WALLET
          ? wallets
          : copytradingAccounts;
      const fromDirection =
        sourceType === TRANSFER_DIRECTION.WALLET
          ? wallets
          : copytradingAccounts;
      if (destinationType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT) {
        sourceId = fromDirection[0].id;
        destinationId = currentWallet.id;
      } else {
        sourceId = currentWallet.id;
        const destinationWallets = walletService.getDestinationWallets(
          toDirection,
          sourceId
        );
        destinationId = destinationWallets[0].id;
      }
      return { sourceId, amount: "", destinationId };
    },
    validationSchema: (props: Props) => {
      const {
        sourceType = TRANSFER_DIRECTION.WALLET,
        wallets,
        copytradingAccounts,
        t
      } = props;
      return lazy(
        (values: FormValues): Schema<any> => {
          const fromDirection =
            sourceType === TRANSFER_DIRECTION.WALLET
              ? wallets
              : copytradingAccounts;
          const selectedSourceWallet = walletService.getSelectedWallet(
            fromDirection,
            values.sourceId
          );
          return object().shape({
            amount: number()
              .moreThan(0, t("wallet-transfer.validation.amount-is-zero"))
              .max(
                +formatCurrencyValue(
                  selectedSourceWallet.available,
                  selectedSourceWallet.currency
                ),
                t("wallet-transfer.validation.amount-more-than-available")
              )
          });
        }
      );
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      const transferAll = getTransferAll(values, props);
      props.onSubmit({ ...values, transferAll }, setSubmitting);
    }
  })
)(WalletTransferForm);

const getTransferAll = (values: FormValues, props: OwnProps) => {
  const { amount, sourceId } = values;
  const {
    sourceType = TRANSFER_DIRECTION.WALLET,
    wallets,
    copytradingAccounts
  } = props;
  const fromDirection =
    sourceType === TRANSFER_DIRECTION.WALLET ? wallets : copytradingAccounts;
  const selectedSourceWallet = walletService.getSelectedWallet(
    fromDirection,
    sourceId
  );
  const formattedAvailableSourceWallet = formatCurrencyValue(
    selectedSourceWallet.available,
    selectedSourceWallet.currency
  );
  return amount === formattedAvailableSourceWallet;
};

interface OwnProps {
  onSubmit(
    values: TransferFormValuesType,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage?: string;
  wallets: WalletData[];
  copytradingAccounts: CopyTradingAccountInfo[];
  currentWallet: WalletData;
  sourceType?: TRANSFER_DIRECTION;
  destinationType?: TRANSFER_DIRECTION;
}

interface FormValues {
  sourceId: string;
  destinationId: string;
  amount: string;
}

type Props = InjectedTranslateProps & FormikProps<FormValues> & OwnProps;

export type TransferFormValuesType = FormValues & {
  transferAll: boolean;
  sourceType?: InternalTransferRequestSourceTypeEnum;
  destinationType?: InternalTransferRequestDestinationTypeEnum;
};
