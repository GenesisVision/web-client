import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import InputAmountField from "components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "components/select/select";
import StatisticItem from "components/statistic-item/statistic-item";
import WalletSelect from "components/wallet-select/wallet-select";
import { FormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { fetchRate as fetchRateMethod } from "services/rate-service";
import {
  convertToCurrency,
  CURRENCY_FRACTIONS
} from "shared/utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { allowPositiveValuesNumberFormat } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

import CreateAccountFormValidationSchema from "./follow-popup-create-account.validators";

const _FollowCreateAccount: React.FC<CreateAccountFormProps> = ({
  onClick,
  isValid,
  dirty,
  wallets,
  t,
  followCurrency,
  values,
  setFieldTouched,
  setFieldValue
}) => {
  const { currency, depositAmount, rate } = values;
  const wallet = wallets.find(
    (wallet: WalletData) => wallet.currency === currency
  )!;
  const disableButton = !dirty || !isValid || depositAmount > wallet.available;

  useEffect(() => {
    fetchRateMethod(followCurrency as CurrencyEnum, currency).then(
      (rate: number) => {
        setFieldValue(CREATE_ACCOUNT_FORM_FIELDS.rate, rate);
      }
    );
  }, [followCurrency, currency]);

  const onChangeCurrencyFrom = useCallback(
    (event: ISelectChangeEvent, target: JSX.Element) => {
      const wallet = wallets.find(({ id }) => target.props.value === id)!;
      const depositCurrencyNew = wallet.currency;
      setFieldValue(CREATE_ACCOUNT_FORM_FIELDS.currency, depositCurrencyNew);
      setFieldValue(
        CREATE_ACCOUNT_FORM_FIELDS.depositWalletId,
        target.props.value
      );
      setFieldValue(CREATE_ACCOUNT_FORM_FIELDS.depositAmount, "");
      setFieldTouched(CREATE_ACCOUNT_FORM_FIELDS.depositAmount, false);
    },
    [setFieldTouched, setFieldValue, wallets]
  );
  const handleNext = useCallback(() => onClick(values), [onClick, values]);
  const setMaxAmount = useCallback(
    () =>
      setFieldValue(
        CREATE_ACCOUNT_FORM_FIELDS.depositAmount,
        formatCurrencyValue(wallet.available, followCurrency)
      ),
    [followCurrency, setFieldValue, wallet.available]
  );
  return (
    <form id="follow-create-account">
      <DialogBottom>
        <DialogField>
          <WalletSelect
            name={CREATE_ACCOUNT_FORM_FIELDS.depositWalletId}
            label={t("follow-program.create-account.from")}
            items={wallets}
            onChange={onChangeCurrencyFrom}
          />
        </DialogField>
        <DialogField>
          <StatisticItem label={t("follow-program.create-account.available")}>
            <NumberFormat
              value={wallet.available}
              suffix={` ${currency}`}
              displayType="text"
            />
          </StatisticItem>
        </DialogField>
        <DialogField>
          <InputAmountField
            isAllow={allowPositiveValuesNumberFormat(
              CURRENCY_FRACTIONS(currency)
            )}
            name={CREATE_ACCOUNT_FORM_FIELDS.depositAmount}
            label={t("follow-program.create-account.amount")}
            currency={currency}
            setMax={setMaxAmount}
          />
          {followCurrency !== currency && (
            <NumberFormat
              value={formatCurrencyValue(
                convertToCurrency(depositAmount, rate),
                followCurrency
              )}
              prefix="≈ "
              suffix={` ${followCurrency}`}
              displayType="text"
            />
          )}
        </DialogField>
        <DialogButtons>
          <GVButton
            onClick={handleNext}
            className="invest-form__submit-button"
            disabled={disableButton}
          >
            {t("follow-program.create-account.next")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

export enum CREATE_ACCOUNT_FORM_FIELDS {
  depositWalletId = "depositWalletId",
  currency = "currency",
  depositAmount = "depositAmount",
  rate = "rate"
}

interface OwnProps {
  minDeposit: number;
  wallets: WalletData[];
  followCurrency: string;
  onClick: (values: CreateAccountFormValues) => void;
}

export interface CreateAccountFormValues {
  [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: string;
  [CREATE_ACCOUNT_FORM_FIELDS.currency]: any;
  [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: number;
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
    mapPropsToValues: ({
      wallets,
      followCurrency
    }: CreateAccountFormProps) => ({
      [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: wallets.find(
        wallet => wallet.currency === followCurrency
      )!.id,
      [CREATE_ACCOUNT_FORM_FIELDS.currency]: followCurrency,
      [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: "",
      [CREATE_ACCOUNT_FORM_FIELDS.rate]: 1
    }),
    validationSchema: CreateAccountFormValidationSchema,
    handleSubmit: () => {}
  }),
  React.memo
)(_FollowCreateAccount);
export default FollowCreateAccount;
