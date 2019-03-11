import { InjectedFormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import { GVButton } from "gv-react-components";
import { ComponentType, PureComponent } from "react";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { calculatePercentage } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { number, object } from "yup";

import FundWithdrawResult from "./fund-withdraw-result";

interface IFundWithdrawAmountFormOwnProps {
  wallets: WalletData[];
  wallet: WalletData;
  percent?: number;
  onSubmit(percent: number): void;
  exitFee: number;
  availableToWithdraw: number;
}

interface IFundWithdrawAmountFormProps
  extends WithTranslation,
    IFundWithdrawAmountFormOwnProps {}

interface FundWithdrawAmountFormValues {
  percent?: number;
}

class FundWithdrawAmountForm extends PureComponent<
  InjectedFormikProps<
    IFundWithdrawAmountFormProps,
    FundWithdrawAmountFormValues
  >
> {
  isAllow = (values: NumberFormatValues) =>
    !values.floatValue ||
    (values.floatValue >= 0.01 && values.floatValue <= 100);

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

    const availableToWithdrawCcy = convertFromCurrency(
      availableToWithdraw,
      wallet.rateToGVT
    );
    const amountToWithdrawCcy = calculatePercentage(
      availableToWithdrawCcy,
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
            prefix="&asymp; "
            suffix={` ${wallet.currency}`}
            displayType="text"
          />
        </div>
        {exitFee !== 0 && (
          <FundWithdrawResult
            availableToWithdraw={availableToWithdrawCcy}
            currency={wallet.currency}
            percent={values.percent || 0}
            exitFee={exitFee}
          />
        )}
        <div className="dialog__buttons">
          <GVButton type="submit" id="fundWithdrawAmountFormSubmit">
            {t("buttons.next")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export default compose<ComponentType<IFundWithdrawAmountFormOwnProps>>(
  withTranslation(),
  withFormik<IFundWithdrawAmountFormProps, FundWithdrawAmountFormValues>({
    displayName: "withdraw-form",
    mapPropsToValues: ({ percent }) => ({
      percent: percent
    }),
    validationSchema: ({ t }: IFundWithdrawAmountFormProps) =>
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
