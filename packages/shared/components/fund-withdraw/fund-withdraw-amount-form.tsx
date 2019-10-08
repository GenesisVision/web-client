import { InjectedFormikProps, withFormik } from "formik";
import { WalletBaseData } from "gv-api-web";
import React, { ComponentType, useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogField } from "shared/components/dialog/dialog-field";
import GVButton from "shared/components/gv-button";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "shared/components/select/select";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import { calculatePercentage } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";
import { number, object } from "yup";

import FundWithdrawResult from "./fund-withdraw-result";

const _FundWithdrawAmountForm: React.FC<
  InjectedFormikProps<Props, FundWithDrawFormValues>
> = ({
  currency,
  setCurrency,
  wallets,
  setFieldValue,
  t,
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
    []
  );

  const amountToWithdrawCcy = calculatePercentage(
    availableToWithdraw,
    values[FUND_WITHDRAW_FIELDS.percent] || 0
  );

  const changeWalletCallback = useCallback(
    (_: ISelectChangeEvent, target: JSX.Element) => {
      setFieldValue(FUND_WITHDRAW_FIELDS.walletId, target.props.value);
      setCurrency(
        wallets.find(({ id }) => id === target.props.value)!.currency
      );
    },
    [wallets]
  );

  return (
    <form id="withdraw-form" onSubmit={handleSubmit}>
      <DialogField>
        <WalletSelect
          name={FUND_WITHDRAW_FIELDS.walletId}
          label={t("withdraw-fund.wallet")}
          items={wallets}
          onChange={changeWalletCallback}
        />
      </DialogField>
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
          value={formatCurrencyValue(amountToWithdrawCcy, currency)}
          prefix="≈ "
          suffix={` ${currency}`}
          displayType="text"
        />
      </div>
      <FundWithdrawResult
        availableToWithdraw={availableToWithdraw}
        currency={currency}
        percent={values[FUND_WITHDRAW_FIELDS.percent] || 0}
        exitFee={exitFee}
      />
      <DialogButtons>
        <GVButton type="submit" id="fundWithdrawAmountFormSubmit">
          {t("buttons.next")}
        </GVButton>
      </DialogButtons>
    </form>
  );
};

const FundWithdrawAmountForm = compose<ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, FundWithDrawFormValues>({
    enableReinitialize: true,
    displayName: "withdraw-form",
    mapPropsToValues: ({ wallets }) => ({
      [FUND_WITHDRAW_FIELDS.walletId]: wallets[0].id,
      [FUND_WITHDRAW_FIELDS.percent]: 0.01
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
  currency: CurrencyEnum;
  setCurrency: (id: CurrencyEnum) => void;
  wallets: WalletBaseData[];
  onSubmit: (values: FundWithDrawFormValues) => void;
  exitFee: number;
  availableToWithdraw: number;
}

interface Props extends WithTranslation, OwnProps {}

export interface FundWithDrawFormValues {
  [FUND_WITHDRAW_FIELDS.percent]: number;
  [FUND_WITHDRAW_FIELDS.walletId]: string;
}
