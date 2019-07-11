import { InjectedFormikProps, withFormik } from "formik";
import { WalletBaseData } from "gv-api-web";
import React, { ComponentType, useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { calculatePercentage } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { number, object } from "yup";

import FundWithdrawResult from "./fund-withdraw-result";

const _FundWithdrawAmountForm: React.FC<
  InjectedFormikProps<Props, FormValues>
> = ({
  setFieldValue,
  t,
  wallet,
  availableToWithdraw,
  exitFee,
  handleSubmit,
  values
}) => {
  const isAllow = useCallback(
    (values: NumberFormatValues) =>
      !values.floatValue ||
      (values.floatValue >= 0.01 &&
        values.floatValue <= 100 &&
        values.value !== "."),
    []
  );

  const setMaxAmount = useCallback(
    () => setFieldValue(FIELDS.percent, "100"),
    []
  );

  const amountToWithdrawCcy = calculatePercentage(
    availableToWithdraw,
    values[FIELDS.percent] || 0
  );
  return (
    <form id="withdraw-form" onSubmit={handleSubmit}>
      <InputAmountField
        name={FIELDS.percent}
        label={t("withdraw-fund.amount-to-withdraw")}
        placeholder="%"
        currency="%"
        isAllow={isAllow}
        setMax={setMaxAmount}
      />
      <div className="invest-popup__currency">
        <NumberFormat
          value={formatCurrencyValue(amountToWithdrawCcy, wallet.currency)}
          prefix="≈ "
          suffix={` ${wallet.currency}`}
          displayType="text"
        />
      </div>
      <FundWithdrawResult
        availableToWithdraw={availableToWithdraw}
        currency={wallet.currency}
        percent={values[FIELDS.percent] || 0}
        exitFee={exitFee}
      />
      <div className="dialog__buttons">
        <GVButton type="submit" id="fundWithdrawAmountFormSubmit">
          {t("buttons.next")}
        </GVButton>
      </div>
    </form>
  );
};

const FundWithdrawAmountForm = compose<ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, FormValues>({
    displayName: "withdraw-form",
    mapPropsToValues: ({ percent }) => ({
      [FIELDS.percent]: percent || 0.01
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FIELDS.percent]: number()
          .required(t("withdraw-fund.validation.required"))
          .min(0.01, t("withdraw-fund.validation.min-value"))
      }),
    handleSubmit: (values, { props }) => {
      if (!values[FIELDS.percent]) return;
      props.onSubmit(values[FIELDS.percent]);
    }
  }),
  React.memo
)(_FundWithdrawAmountForm);
export default FundWithdrawAmountForm;

enum FIELDS {
  percent = "percent"
}

interface OwnProps {
  wallets: WalletBaseData[];
  wallet: WalletBaseData;
  percent?: number;
  onSubmit(percent: number): void;
  exitFee: number;
  availableToWithdraw: number;
}

interface Props extends WithTranslation, OwnProps {}

interface FormValues {
  [FIELDS.percent]: number;
}
