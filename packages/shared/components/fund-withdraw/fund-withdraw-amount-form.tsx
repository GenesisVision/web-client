import { InjectedFormikProps, withFormik } from "formik";
import { WalletBaseData } from "gv-api-web";
import { ComponentType, PureComponent } from "react";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { calculatePercentage } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { number, object } from "yup";

import FundWithdrawResult from "./fund-withdraw-result";

class FundWithdrawAmountForm extends PureComponent<
  InjectedFormikProps<Props, FormValues>
> {
  isAllow = (values: NumberFormatValues) => {
    const allow =
      !values.floatValue ||
      (values.floatValue >= 0.01 && values.floatValue <= 100);
    return allow && values.value !== ".";
  };

  setMaxAmount = () => {
    this.props.setFieldValue("percent", "100");
  };

  render() {
    const {
      t,
      wallet,
      availableToWithdraw,
      exitFee,
      handleSubmit,
      values
    } = this.props;

    const amountToWithdrawCcy = calculatePercentage(
      availableToWithdraw,
      values.percent || 0
    );
    return (
      <form id="withdraw-form" onSubmit={handleSubmit}>
        <InputAmountField
          name="percent"
          label={t("withdraw-fund.amount-to-withdraw")}
          placeholder="%"
          currency="%"
          isAllow={this.isAllow}
          setMax={this.setMaxAmount}
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
          percent={values.percent || 0}
          exitFee={exitFee}
        />
        <div className="dialog__buttons">
          <GVButton type="submit" id="fundWithdrawAmountFormSubmit">
            {t("buttons.next")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export default compose<ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, FormValues>({
    displayName: "withdraw-form",
    mapPropsToValues: ({ percent }) => ({
      percent: percent
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        percent: number()
          .required(t("withdraw-fund.validation.required"))
          .min(0.01, t("withdraw-fund.validation.min-value"))
      }),
    handleSubmit: (values, { props }) => {
      if (!values.percent) return;
      props.onSubmit(values.percent);
    }
  })
)(FundWithdrawAmountForm);

interface OwnProps {
  wallets: WalletBaseData[];
  wallet: WalletBaseData;
  percent?: number;
  onSubmit(percent: number): void;
  exitFee: number;
  availableToWithdraw: number;
}

interface Props extends InjectedTranslateProps, OwnProps {}

interface FormValues {
  percent?: number;
}
