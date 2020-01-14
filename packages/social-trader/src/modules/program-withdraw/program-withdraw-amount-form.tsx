import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import GVFormikField from "components/gv-formik-field";
import InputAmountField from "components/input-amount-field/input-amount-field";
import { InjectedFormikProps, withFormik } from "formik";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { boolean, mixed, number, object } from "yup";

const _ProgramWithdrawAmountForm: React.FC<
  InjectedFormikProps<Props, IProgramWithdrawAmountFormValues>
> = ({
  setFieldValue,
  availableToWithdraw,
  t,
  handleSubmit,
  accountCurrency,
  programCurrency,
  rate,
  values,
  isValid,
  isOwner
}) => {
  const [emptyInit, setEmptyInit] = useState<boolean>(true);
  const isAllow = useCallback(
    (values: NumberFormatValues) => {
      const { formattedValue, value } = values;
      return (
        (formattedValue === "" || validateFraction(value, programCurrency)) &&
        values.value !== "."
      );
    },
    [programCurrency]
  );

  const setMaxAmount = useCallback(() => {
    setFieldValue(
      FIELDS.amount,
      formatCurrencyValue(availableToWithdraw, programCurrency)
    );
    setEmptyInit(false);
  }, [availableToWithdraw, programCurrency, setFieldValue]);

  return (
    <form id="withdraw-form" onSubmit={handleSubmit}>
      {!isOwner && (
        <DialogField>
          <GVFormikField
            wide
            type="checkbox"
            color="primary"
            name={FIELDS.withdrawAll}
            label={<span>{t("withdraw-program.withdraw-all")}</span>}
            component={GVCheckbox}
          />
        </DialogField>
      )}
      <InputAmountField
        wide
        emptyInit={emptyInit}
        name={FIELDS.amount}
        label={t("withdraw-program.amount-to-withdraw")}
        currency={programCurrency}
        isAllow={isAllow}
        disabled={values[FIELDS.withdrawAll]}
        setMax={isOwner ? setMaxAmount : undefined}
      />
      {programCurrency !== accountCurrency && values[FIELDS.amount] !== 0 && (
        <NumberFormat
          value={formatCurrencyValue(
            convertFromCurrency(values[FIELDS.amount]!, rate),
            accountCurrency
          )}
          prefix="≈ "
          suffix={` ${accountCurrency}`}
          displayType="text"
        />
      )}
      <DialogButtons>
        <GVButton
          wide
          type="submit"
          id="programWithdrawAmountFormSubmit"
          className="invest-form__submit-button"
          disabled={
            (!values[FIELDS.amount] || !isValid) && !values[FIELDS.withdrawAll]
          }
        >
          {t("withdraw-program.next")}
        </GVButton>
      </DialogButtons>
    </form>
  );
};

const ProgramWithdrawAmountForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, IProgramWithdrawAmountFormValues>({
    displayName: "withdraw-form",
    isInitialValid: true,
    mapPropsToValues: ({ formValues: { amount, withdrawAll } }) => ({
      [FIELDS.amount]: amount,
      [FIELDS.withdrawAll]: withdrawAll
    }),
    validationSchema: ({ t, availableToWithdraw }: Props) =>
      object().shape({
        [FIELDS.withdrawAll]: boolean(),
        [FIELDS.amount]: mixed().when(FIELDS.withdrawAll, {
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
      if (!values[FIELDS.amount] && !values[FIELDS.withdrawAll]) return;
      props.onSubmit(values);
    }
  }),
  React.memo
)(_ProgramWithdrawAmountForm);
export default ProgramWithdrawAmountForm;

enum FIELDS {
  amount = "amount",
  withdrawAll = "withdrawAll"
}

interface OwnProps {
  formValues: IProgramWithdrawAmountFormValues;
  onSubmit(values: IProgramWithdrawAmountFormValues): void;
  availableToWithdraw: number;
  programCurrency: string;
  accountCurrency: string;
  rate: number;
  isOwner: boolean;
}

interface Props extends WithTranslation, OwnProps {}

export interface IProgramWithdrawAmountFormValues {
  [FIELDS.amount]: number;
  [FIELDS.withdrawAll]: boolean;
}
