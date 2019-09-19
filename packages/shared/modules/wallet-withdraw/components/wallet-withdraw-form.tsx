import "./wallet-withdraw-form.scss";

import { InjectedFormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import i18next from "i18next";
import * as React from "react";
import { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";
import {
  btcWalletValidator,
  ethGvtWalletValidator
} from "shared/utils/validators/validators";
import { Schema, StringSchema, lazy, object, string } from "yup";

const _WalletWithdrawForm: React.FC<
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
  const { currency, amount } = values;
  const [selected, setSelected] = useState<WalletData>(
    wallets.find(wallet => wallet.currency === currency)!
  );
  const onChangeCurrency = useCallback(
    (event: ISelectChangeEvent, target: JSX.Element) => {
      const wallet = wallets.find(wallet => wallet.id === target.props.value)!;
      setSelected(wallet);
      setFieldValue(FIELDS.currency, wallet.currency);
      setFieldValue(FIELDS.id, wallet.id);
      setFieldValue(FIELDS.amount, "");
    },
    [setFieldValue, selected, setSelected, wallets]
  );
  const { withdrawalCommission, available } = selected;
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
    setFieldValue(FIELDS.amount, formatCurrencyValue(available, currency));
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
        <WalletSelect
          name={FIELDS.id}
          label={t("wallet-withdraw.select-currency")}
          items={wallets}
          onChange={onChangeCurrency}
        />
      </div>
      <div className="dialog__bottom">
        <InputAmountField
          name={FIELDS.amount}
          label={t("wallet-withdraw.amount")}
          currency={currency}
          isAllow={isAllow}
          setMax={setMaxAmount}
        />
        <GVFormikField
          name={FIELDS.address}
          label={t("wallet-withdraw.address")}
          component={GVTextField}
          autoComplete="off"
        />
        {twoFactorEnabled && (
          <GVFormikField
            type="text"
            name={FIELDS.twoFactorCode}
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

const twoFactorValidator = (
  t: i18next.TFunction,
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

enum FIELDS {
  id = "id",
  currency = "currency",
  amount = "amount",
  address = "address",
  twoFactorCode = "twoFactorCode"
}

export interface IWalletWithdrawFormValues {
  [FIELDS.currency]: CurrencyEnum;
  [FIELDS.id]: string;
  [FIELDS.amount]: string;
  [FIELDS.address]: string;
  [FIELDS.twoFactorCode]: string;
}

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  twoFactorEnabled: boolean;
  wallets: WalletData[];
  currentWallet: WalletData;
  onSubmit(
    data: IWalletWithdrawFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage?: string;
}

const WalletWithdrawForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, IWalletWithdrawFormValues>({
    displayName: "wallet-withdraw",
    mapPropsToValues: ({ currentWallet: { id, currency } }) => ({
      [FIELDS.id]: id,
      [FIELDS.currency]: currency,
      [FIELDS.amount]: "",
      [FIELDS.address]: "",
      [FIELDS.twoFactorCode]: ""
    }),
    validationSchema: ({ t, twoFactorEnabled }: Props) =>
      lazy(
        (values: IWalletWithdrawFormValues): Schema<any> => {
          switch (values[FIELDS.currency]) {
            case "GVT":
            case "ETH":
            case "USDT":
              return object().shape({
                [FIELDS.address]: ethGvtWalletValidator.required(
                  t("wallet-withdraw.validation.address-is-required")
                ),
                [FIELDS.twoFactorCode]: twoFactorValidator(t, twoFactorEnabled)
              });
            default:
              return object().shape({
                [FIELDS.address]: btcWalletValidator.required(
                  t("wallet-withdraw.validation.address-is-required")
                ),
                [FIELDS.twoFactorCode]: twoFactorValidator(t, twoFactorEnabled)
              });
          }
        }
      ),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_WalletWithdrawForm);
export default WalletWithdrawForm;
