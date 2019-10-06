import { FormikProps, withFormik } from "formik";
import { AttachToSignalProviderInitialDepositCurrencyEnum, WalletData } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import GVButton from "shared/components/gv-button";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import rateApi from "shared/services/api-client/rate-api";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import CreateAccountFormValidationSchema from "./follow-popup-create-account.validators";

const _FollowCreateAccount: React.FC<CreateAccountFormProps> = ({
  onClick,
  isValid,
  dirty,
  wallets,
  t,
  currency,
  values,
  setFieldTouched,
  setFieldValue
}) => {
  const { initialDepositCurrency, initialDepositAmount, rate } = values;
  const wallet = wallets.find(
    (wallet: WalletData) => wallet.currency === initialDepositCurrency
  )!;
  const disableButton =
    !dirty || !isValid || initialDepositAmount > wallet.available;
  const fetchRate = useCallback(
    (initialDepositCurrency?: CurrencyEnum) => {
      rateApi
        .v10RateByFromByToGet(
          currency,
          initialDepositCurrency ||
            values[CREATE_ACCOUNT_FORM_FIELDS.initialDepositCurrency]
        )
        .then((rate: number) => {
          if (rate !== values.rate)
            setFieldValue(CREATE_ACCOUNT_FORM_FIELDS.rate, rate);
        });
    },
    [currency, values]
  );
  useEffect(() => {
    fetchRate();
  }, []);
  const onChangeCurrencyFrom = useCallback(
    (event: ISelectChangeEvent, target: JSX.Element) => {
      const wallet = wallets.find(({ id }) => target.props.value === id)!;
      const initialDepositCurrencyNew = wallet.currency;
      setFieldValue(
        CREATE_ACCOUNT_FORM_FIELDS.initialDepositCurrency,
        initialDepositCurrencyNew
      );
      setFieldValue(
        CREATE_ACCOUNT_FORM_FIELDS.initialDepositWalletId,
        target.props.value
      );
      setFieldValue(CREATE_ACCOUNT_FORM_FIELDS.initialDepositAmount, "");
      setFieldTouched(CREATE_ACCOUNT_FORM_FIELDS.initialDepositAmount, false);
      fetchRate(initialDepositCurrencyNew);
    },
    []
  );
  const handleNext = useCallback(() => onClick(values), [values]);
  const setMaxAmount = useCallback(
    () =>
      setFieldValue(
        CREATE_ACCOUNT_FORM_FIELDS.initialDepositAmount,
        formatCurrencyValue(wallet.available, currency)
      ),
    [currency, wallet]
  );
  return (
    <form id="follow-create-account">
      <DialogBottom>
        <div className="dialog-field">
          <WalletSelect
            name={CREATE_ACCOUNT_FORM_FIELDS.initialDepositWalletId}
            label={t("follow-program.create-account.from")}
            items={wallets}
            onChange={onChangeCurrencyFrom}
          />
        </div>
        <div className="dialog-field">
          <StatisticItem label={t("follow-program.create-account.available")}>
            <NumberFormat
              value={wallet.available}
              suffix={` ${initialDepositCurrency}`}
              displayType="text"
            />
          </StatisticItem>
        </div>
        <div className="dialog-field">
          <InputAmountField
            name={CREATE_ACCOUNT_FORM_FIELDS.initialDepositAmount}
            label={t("follow-program.create-account.amount")}
            currency={initialDepositCurrency}
            setMax={setMaxAmount}
          />
          {currency !== initialDepositCurrency && (
            <div className="invest-popup__currency">
              <NumberFormat
                value={formatCurrencyValue(
                  convertToCurrency(initialDepositAmount, rate),
                  currency
                )}
                prefix="≈ "
                suffix={` ${currency}`}
                displayType="text"
              />
            </div>
          )}
        </div>
        <div className="dialog__buttons">
          <GVButton
            onClick={handleNext}
            className="invest-form__submit-button"
            disabled={disableButton}
          >
            {t("follow-program.create-account.next")}
          </GVButton>
        </div>
      </DialogBottom>
    </form>
  );
};

export enum CREATE_ACCOUNT_FORM_FIELDS {
  initialDepositWalletId = "initialDepositWalletId",
  initialDepositCurrency = "initialDepositCurrency",
  initialDepositAmount = "initialDepositAmount",
  rate = "rate"
}

interface OwnProps {
  minDeposit: number;
  wallets: WalletData[];
  currency: string;
  onClick: (values: CreateAccountFormValues) => void;
}

export interface CreateAccountFormValues {
  [CREATE_ACCOUNT_FORM_FIELDS.initialDepositWalletId]: string;
  [CREATE_ACCOUNT_FORM_FIELDS.initialDepositCurrency]: AttachToSignalProviderInitialDepositCurrencyEnum;
  [CREATE_ACCOUNT_FORM_FIELDS.initialDepositAmount]: number;
  [CREATE_ACCOUNT_FORM_FIELDS.rate]: number;
}

export interface CreateAccountFormProps
  extends OwnProps,
    WithTranslation,
    FormikProps<CreateAccountFormValues> {}

const FollowCreateAccount = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik({
    displayName: "follow-create-account",
    mapPropsToValues: ({ wallets, currency }: CreateAccountFormProps) => ({
      [CREATE_ACCOUNT_FORM_FIELDS.initialDepositWalletId]: wallets.find(
        wallet => wallet.currency === currency
      )!.id,
      [CREATE_ACCOUNT_FORM_FIELDS.initialDepositCurrency]: currency,
      [CREATE_ACCOUNT_FORM_FIELDS.initialDepositAmount]: "",
      [CREATE_ACCOUNT_FORM_FIELDS.rate]: 1
    }),
    validationSchema: CreateAccountFormValidationSchema,
    handleSubmit: () => {}
  }),
  React.memo
)(_FollowCreateAccount);
export default FollowCreateAccount;
