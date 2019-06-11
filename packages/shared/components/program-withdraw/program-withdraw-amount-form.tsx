import { InjectedFormikProps, withFormik } from "formik";
import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { boolean, mixed, number, object } from "yup";

const _ProgramWithdrawAmountForm: React.FC<
  InjectedFormikProps<Props, IProgramWithdrawAmountFormValues>
> = ({
  setFieldValue,
  availableToWithdraw,
  t,
  role,
  handleSubmit,
  accountCurrency,
  programCurrency,
  rate,
  values,
  isValid,
  dirty
}) => {
  const isAllow = useCallback((values: NumberFormatValues) => {
    const { formattedValue, value } = values;
    return (
      (formattedValue === "" || validateFraction(value, programCurrency)) &&
      values.value !== "."
    );
  }, []);

  const setMaxAmount = useCallback(
    () =>
      setFieldValue(
        "amount",
        formatCurrencyValue(availableToWithdraw, programCurrency)
      ),
    [availableToWithdraw, programCurrency]
  );

  return (
    <form id="withdraw-form" onSubmit={handleSubmit}>
      {role === ROLE.INVESTOR && (
        <GVFormikField
          type="checkbox"
          color="primary"
          name={"withdrawAll"}
          label={
            <span>
              Withdraw all
              {/*{t("manager.create-program-page.settings.fields.investment-limit")}*/}
            </span>
          }
          component={GVCheckbox}
        />
      )}
      <InputAmountField
        name="amount"
        label={t("withdraw-program.amount-to-withdraw")}
        currency={programCurrency}
        isAllow={isAllow}
        disabled={values.withdrawAll}
        setMax={role === ROLE.MANAGER ? setMaxAmount : undefined}
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
          type="submit"
          id="programWithdrawAmountFormSubmit"
          className="invest-form__submit-button"
          disabled={!values.withdrawAll && (!isValid || !dirty)}
        >
          {t("withdraw-program.next")}
        </GVButton>
      </div>
    </form>
  );
};

const ProgramWithdrawAmountForm = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  withFormik<Props, IProgramWithdrawAmountFormValues>({
    displayName: "withdraw-form",
    mapPropsToValues: ({ amount, withdrawAll }) => ({
      amount,
      withdrawAll
    }),
    validationSchema: ({ t, availableToWithdraw }: Props) =>
      object().shape({
        withdrawAll: boolean(),
        amount: mixed().when("withdrawAll", {
          is: false,
          then: number()
            .moreThan(0, t("withdraw-program.validation.amount-is-zero"))
            .max(
              availableToWithdraw,
              t("withdraw-program.validation.amount-more-than-available")
            )
        })
      }),
    handleSubmit: (values, { props }) => {
      if (!values.amount && !values.withdrawAll) return;
      props.onSubmit(values);
    }
  }),
  React.memo
)(_ProgramWithdrawAmountForm);

export default ProgramWithdrawAmountForm;

interface OwnProps {
  amount?: number;
  withdrawAll?: boolean;
  onSubmit(values: IProgramWithdrawAmountFormValues): void;
  availableToWithdraw: number;
  programCurrency: string;
  accountCurrency: string;
  rate: number;
}

interface Props extends InjectedTranslateProps, WithRoleProps, OwnProps {}

export interface IProgramWithdrawAmountFormValues {
  amount?: number;
  withdrawAll?: boolean;
}
