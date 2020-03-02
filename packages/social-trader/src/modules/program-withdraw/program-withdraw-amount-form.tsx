import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import { GVHookFormField } from "components/gv-hook-form-field";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  IProgramWithdrawAmountFormValues,
  programWithdrawAmountValidationSchema,
  WITHDRAW_FORM_FIELDS
} from "modules/program-withdraw/program-withdraw.helpers";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { HookForm } from "utils/hook-form.helpers";

const _ProgramWithdrawAmountForm: React.FC<Props> = ({
  onSubmit,
  formValues,
  availableToWithdraw,
  accountCurrency,
  programCurrency,
  rate,
  isOwner
}) => {
  const [t] = useTranslation();
  const form = useForm<IProgramWithdrawAmountFormValues>({
    defaultValues: {
      [WITHDRAW_FORM_FIELDS.amount]: formValues.amount,
      [WITHDRAW_FORM_FIELDS.withdrawAll]: formValues.withdrawAll
    },
    validationSchema: programWithdrawAmountValidationSchema({
      availableToWithdraw,
      t
    }),
    mode: "onChange"
  });
  const { watch, setValue } = form;

  const { amount, withdrawAll } = watch();

  const isAllow = useCallback(
    ({ formattedValue, value }: NumberFormatValues) => {
      return (
        (formattedValue === "" || validateFraction(value, programCurrency)) &&
        value !== "."
      );
    },
    [programCurrency]
  );

  const setMaxAmount = useCallback(() => {
    setValue(
      WITHDRAW_FORM_FIELDS.amount,
      +formatCurrencyValue(availableToWithdraw, programCurrency),
      true
    );
  }, [availableToWithdraw, programCurrency, setValue]);

  useEffect(() => {
    if (withdrawAll) setMaxAmount();
  }, [withdrawAll]);

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      {!isOwner && (
        <DialogField>
          <GVHookFormField
            wide
            type="checkbox"
            color="primary"
            name={WITHDRAW_FORM_FIELDS.withdrawAll}
            label={<span>{t("withdraw-program.withdraw-all")}</span>}
            component={GVCheckbox}
          />
        </DialogField>
      )}
      <InputAmountField
        name={WITHDRAW_FORM_FIELDS.amount}
        label={t("withdraw-program.amount-to-withdraw")}
        currency={programCurrency}
        isAllowed={isAllow}
        disabled={withdrawAll}
        setMax={isOwner ? setMaxAmount : undefined}
      />
      {programCurrency !== accountCurrency && amount !== 0 && (
        <NumberFormat
          value={formatCurrencyValue(
            convertFromCurrency(amount!, rate),
            accountCurrency
          )}
          prefix="≈ "
          suffix={` ${accountCurrency}`}
          displayType="text"
        />
      )}
      <DialogButtons>
        <SubmitButton
          wide
          id="programWithdrawAmountFormSubmit"
          className="invest-form__submit-button"
          disabled={!amount && !withdrawAll}
        >
          {t("withdraw-program.next")}
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

const ProgramWithdrawAmountForm = React.memo(_ProgramWithdrawAmountForm);
export default ProgramWithdrawAmountForm;

interface Props {
  formValues: IProgramWithdrawAmountFormValues;
  onSubmit(values: IProgramWithdrawAmountFormValues): void;
  availableToWithdraw: number;
  programCurrency: string;
  accountCurrency: string;
  rate: number;
  isOwner: boolean;
}
