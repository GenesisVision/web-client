import { InjectedFormikProps, withFormik } from "formik";
import { WalletBaseData } from "gv-api-web";
import React, { ComponentType, useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "shared/components/select/select";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import { calculatePercentage } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { number, object } from "yup";

import FundWithdrawResult from "./fund-withdraw-result";

const _FundWithdrawAmountForm: React.FC<
  InjectedFormikProps<Props, FundWithDrawFormValues>
> = ({
  changeWalletHandle,
  wallets,
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
    () => setFieldValue(FUND_WITHDRAW_FIELDS.percent, "100"),
    [setFieldValue]
  );

  const amountToWithdrawCcy = calculatePercentage(
    availableToWithdraw,
    values[FUND_WITHDRAW_FIELDS.percent] || 0
  );

  return (
    <form id="withdraw-form" onSubmit={handleSubmit}>
      <WalletSelect
        name={FUND_WITHDRAW_FIELDS.walletId}
        label={t("withdraw-fund.wallet")}
        items={wallets}
        onChange={changeWalletHandle(setFieldValue)}
      />
      <InputAmountField
        name={FUND_WITHDRAW_FIELDS.percent}
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
        percent={values[FUND_WITHDRAW_FIELDS.percent] || 0}
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
  withFormik<Props, FundWithDrawFormValues>({
    displayName: "withdraw-form",
    mapPropsToValues: ({ percent, wallet }) => ({
      [FUND_WITHDRAW_FIELDS.walletId]: wallet.id,
      [FUND_WITHDRAW_FIELDS.percent]: percent || 0.01
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FUND_WITHDRAW_FIELDS.percent]: number()
          .required(t("withdraw-fund.validation.required"))
          .min(0.01, t("withdraw-fund.validation.min-value"))
      }),
    handleSubmit: (values, { props }) => {
      if (!values[FUND_WITHDRAW_FIELDS.percent]) return;
      props.onSubmit(values);
    }
  }),
  React.memo
)(_FundWithdrawAmountForm);
export default FundWithdrawAmountForm;

export enum FUND_WITHDRAW_FIELDS {
  walletId = "walletId",
  percent = "percent"
}

interface OwnProps {
  changeWalletHandle: (
    setFieldValue: Function
  ) => (event: ISelectChangeEvent, child: JSX.Element) => void;
  wallets: WalletBaseData[];
  wallet: WalletBaseData;
  percent?: number;
  onSubmit(values: FundWithDrawFormValues): void;
  exitFee: number;
  availableToWithdraw: number;
}

interface Props extends WithTranslation, OwnProps {}

export interface FundWithDrawFormValues {
  [FUND_WITHDRAW_FIELDS.percent]: number;
  [FUND_WITHDRAW_FIELDS.walletId]: string;
}
