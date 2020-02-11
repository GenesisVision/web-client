import { BlurContainer } from "components/blur-container/blur-container";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import InputAmountField from "components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "components/select/select";
import WalletSelect from "components/wallet-select/wallet-select";
import { InjectedFormikProps, withFormik } from "formik";
import { WalletBaseData } from "gv-api-web";
import {
  FUND_WITHDRAW_FIELDS,
  FundWithDrawFormValues
} from "modules/fund-withdraw/fund-withdraw.types";
import React, { ComponentType, useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { calculatePercentage } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";
import { number, object } from "yup";

import { FundWithdrawResult } from "./fund-withdraw-result";

const _FundWithdrawAmountForm: React.FC<InjectedFormikProps<
  Props,
  FundWithDrawFormValues
>> = ({
  isPending,
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
    [setFieldValue]
  );

  const amountToWithdrawCcy = calculatePercentage(
    availableToWithdraw,
    values[FUND_WITHDRAW_FIELDS.percent] || 0
  );

  const changeWalletCallback = useCallback(
    (_: ISelectChangeEvent, target: JSX.Element) => {
      setFieldValue(FUND_WITHDRAW_FIELDS.walletId, target.props.value);
      setCurrency(
        safeGetElemFromArray(wallets, ({ id }) => id === target.props.value)
          .currency
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
        wide
        name={FUND_WITHDRAW_FIELDS.percent}
        label={t("withdraw-fund.amount-to-withdraw")}
        placeholder="%"
        currency="%"
        isAllow={isAllow}
        setMax={setMaxAmount}
      />
      <BlurContainer blur={isPending}>
        <NumberFormat
          value={formatCurrencyValue(amountToWithdrawCcy, currency)}
          prefix="≈ "
          suffix={` ${currency}`}
          displayType="text"
        />
      </BlurContainer>
      <FundWithdrawResult
        isPending={isPending}
        availableToWithdraw={availableToWithdraw}
        currency={currency}
        percent={values[FUND_WITHDRAW_FIELDS.percent] || 0}
        exitFee={exitFee}
      />
      <DialogButtons>
        <GVButton wide type="submit" id="fundWithdrawAmountFormSubmit">
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

interface OwnProps {
  isPending: boolean;
  currency: CurrencyEnum;
  setCurrency: (id: CurrencyEnum) => void;
  wallets: WalletBaseData[];
  onSubmit: (values: FundWithDrawFormValues) => void;
  exitFee: number;
  availableToWithdraw: number;
}

interface Props extends WithTranslation, OwnProps {}
