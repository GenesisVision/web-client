import "./wallet-withdraw-form.scss";

import { InjectedFormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import * as React from "react";
import {
  InjectedTranslateProps,
  TranslationFunction,
  translate
} from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import filesService from "shared/services/file-service";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import {
  btcUsdtWalletValidator,
  ethGvtWalletValidator
} from "shared/utils/validators/validators";
import { Schema, StringSchema, lazy, object, string } from "yup";

import { CurrencyEnum, SetSubmittingType } from "../../../utils/types";

const WalletWithdrawForm: React.FC<
  InjectedFormikProps<Props, IWalletWithdrawFormValues>
> = ({
  t,
  twoFactorEnabled,
  handleSubmit,
  wallets,
  values,
  isValid,
  dirty,
  errorMessage,
  setFieldValue,
  isSubmitting
}) => {
  const onChangeCurrency = (name: string, target: any) => {
    setFieldValue("currency", target.props.value);
    setFieldValue("amount", "");
  };
  const { currency, amount } = values;
  const selected = wallets.find(wallet => wallet.currency === currency);
  const { withdrawalCommission, available } = selected!;
  const willGet = Math.max(parseFloat(amount) - withdrawalCommission, 0);
  const isAllow = (inputValues: NumberFormatValues) => {
    const { floatValue, formattedValue, value } = inputValues;
    const { currency } = values;
    return (
      formattedValue === "" ||
      (validateFraction(value, currency) && floatValue <= available)
    );
  };
  const setMaxAmount = () => {
    setFieldValue("amount", formatCurrencyValue(available, currency));
  };

  return (
    <form
      id="wallet-withdraw"
      className="wallet-withdraw-popup"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("wallet-withdraw.title")}</h2>
        </div>
        <div className="dialog-field">
          <div className="gv-text-field__wrapper">
            <StatisticItem label={t("wallet-withdraw.available")} big>
              {`${formatCurrencyValue(available, currency)} ${currency}`}
            </StatisticItem>
          </div>
        </div>
        <GVFormikField
          name="currency"
          component={GVTextField}
          label={t("wallet-withdraw.select-currency")}
          InputComponent={Select}
          onChange={onChangeCurrency}
        >
          {wallets.map(wallet => {
            return (
              <option value={wallet.currency} key={wallet.currency}>
                <img
                  src={filesService.getFileUrl(wallet.logo)}
                  className="wallet-withdraw-popup__icon"
                  alt={wallet.currency}
                />
                {`${wallet.title} | ${wallet.currency}`}
              </option>
            );
          })}
        </GVFormikField>
      </div>
      <div className="dialog__bottom">
        <InputAmountField
          name="amount"
          label={t("wallet-withdraw.amount")}
          currency={currency}
          isAllow={isAllow}
          setMax={setMaxAmount}
        />
        <GVFormikField
          name="address"
          label={t("wallet-withdraw.address")}
          component={GVTextField}
          autoComplete="off"
        />
        {twoFactorEnabled && (
          <GVFormikField
            type="text"
            name="twoFactorCode"
            label={t("wallet-withdraw.two-factor-code-label")}
            autoComplete="off"
            component={GVTextField}
          />
        )}
        <ul className="dialog-list">
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("wallet-withdraw.will-get")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatCurrencyValue(willGet, currency)}
                suffix={` ${currency}`}
                displayType="text"
              />
            </span>
          </li>
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("wallet-withdraw.fee")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatCurrencyValue(withdrawalCommission, currency)}
                suffix={` ${currency}`}
                displayType="text"
              />
            </span>
          </li>
        </ul>
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || !isValid || !dirty}
          >
            {t("buttons.confirm")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

const twoFactorvalidator = (
  t: TranslationFunction,
  twoFactorEnabled: boolean
): StringSchema => {
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"))
        .required(t("wallet-withdraw.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));
};

export interface IWalletWithdrawFormValues {
  currency: CurrencyEnum;
  amount: string;
  address: string;
  twoFactorCode: string;
}

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  twoFactorEnabled: boolean;
  wallets: WalletData[];
  currentWallet: any;
  onSubmit(
    data: IWalletWithdrawFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage?: string;
}

export default compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, IWalletWithdrawFormValues>({
    displayName: "wallet-withdraw",
    mapPropsToValues: props => {
      let currency = props.currentWallet ? props.currentWallet.currency : "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return { currency, amount: "", address: "", twoFactorCode: "" };
    },
    validationSchema: (props: Props) => {
      const { t, twoFactorEnabled } = props;
      return lazy(
        (values: IWalletWithdrawFormValues): Schema<any> => {
          switch (values.currency) {
            case "GVT":
            case "ETH":
              return object().shape({
                address: ethGvtWalletValidator.required(
                  t("wallet-withdraw.validation.address-is-required")
                ),
                twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
              });
            default:
              return object().shape({
                address: btcUsdtWalletValidator.required(
                  t("wallet-withdraw.validation.address-is-required")
                ),
                twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
              });
          }
        }
      );
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(WalletWithdrawForm);
