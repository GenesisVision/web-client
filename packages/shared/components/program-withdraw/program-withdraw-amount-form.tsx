import { InjectedFormikProps, withFormik } from "formik";
import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { number, object } from "yup";

import InputAmountField from "../input-amount-field/input-amount-field";

class _ProgramWithdrawAmountForm extends React.PureComponent<
  InjectedFormikProps<Props, FormValues>
> {
  isAllow = (values: NumberFormatValues) => {
    const { formattedValue, value } = values;
    return (
      (formattedValue === "" ||
        validateFraction(value, this.props.programCurrency)) &&
      values.value !== "."
    );
  };

  setMaxAmount = () => {
    const { setFieldValue, availableToWithdraw, programCurrency } = this.props;
    setFieldValue(
      "amount",
      formatCurrencyValue(availableToWithdraw, programCurrency)
    );
  };

  render() {
    const {
      t,
      handleSubmit,
      accountCurrency,
      programCurrency,
      rate,
      values,
      isValid,
      dirty
    } = this.props;

    return (
      <form id="withdraw-form" onSubmit={handleSubmit}>
        <InputAmountField
          name="amount"
          label={t("withdraw-program.amount-to-withdraw")}
          currency={programCurrency}
          isAllow={this.isAllow}
          setMax={this.setMaxAmount}
        />

        {programCurrency !== accountCurrency && values.amount && (
          <div className="">
            <NumberFormat
              value={formatCurrencyValue(
                convertFromCurrency(values.amount, rate),
                accountCurrency
              )}
              prefix="≈ "
              suffix={` ${accountCurrency}`}
              displayType="text"
            />
          </div>
        )}
        <div className="dialog__buttons">
          <GVButton
            id="programWithdrawAmountFormSubmit"
            className="invest-form__submit-button"
            disabled={!values.amount || !isValid || !dirty}
          >
            {t("withdraw-program.next")}
          </GVButton>
        </div>
      </form>
    );
  }
}

const ProgramWithdrawAmountForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, FormValues>({
    displayName: "withdraw-form",
    mapPropsToValues: ({ amount }) => ({
      amount
    }),
    validationSchema: ({ t, availableToWithdraw }: Props) =>
      object().shape({
        amount: number()
          .moreThan(0, t("withdraw-program.validation.amount-is-zero"))
          .max(
            availableToWithdraw,
            t("withdraw-program.validation.amount-more-than-available")
          )
      }),
    handleSubmit: (values, { props }) => {
      if (!values.amount) return;
      props.onSubmit(values.amount);
    }
  })
)(_ProgramWithdrawAmountForm);

export default ProgramWithdrawAmountForm;

interface OwnProps {
  amount?: number;
  onSubmit(amount: number): void;
  availableToWithdraw: number;
  programCurrency: string;
  accountCurrency: string;
  rate: number;
}

interface Props extends InjectedTranslateProps, OwnProps {}

interface FormValues {
  amount?: number;
}
