import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogInfo } from "components/dialog/dialog-info";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import { GVHookFormField } from "components/gv-hook-form-field";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { Text } from "components/text/text";
import {
  IProgramWithdrawAmountFormValues,
  programWithdrawAmountValidationSchema,
  WITHDRAW_FORM_FIELDS
} from "modules/program-withdraw/program-withdraw.helpers";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { HookForm } from "utils/hook-form.helpers";

interface Props {
  withdrawInPercent?: boolean;
  formValues: IProgramWithdrawAmountFormValues;
  onSubmit: (values: IProgramWithdrawAmountFormValues) => void;
  availableToWithdraw: number;
  programCurrency: string;
  accountCurrency: string;
  rate: number;
  isOwner: boolean;
}

const _ProgramWithdrawAmountForm: React.FC<Props> = ({
  withdrawInPercent,
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
      withdrawInPercent,
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

  const maxAmount = +formatCurrencyValue(availableToWithdraw, programCurrency);

  const setMaxAmount = useCallback(() => {
    const formMaxAmount = withdrawInPercent ? 100 : maxAmount;
    setValue(WITHDRAW_FORM_FIELDS.amount, formMaxAmount, true);
  }, [
    maxAmount,
    withdrawInPercent,
    availableToWithdraw,
    programCurrency,
    setValue
  ]);

  const convertedValue = withdrawInPercent
    ? (maxAmount / 100) * +amount
    : amount;

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      {!isOwner && (
        <Row>
          <GVHookFormField
            wide
            type="checkbox"
            color="primary"
            name={WITHDRAW_FORM_FIELDS.withdrawAll}
            label={<span>{t("withdraw-program.withdraw-all")}</span>}
            component={GVCheckbox}
          />
        </Row>
      )}
      {withdrawAll && (
        <Row>
          <Text muted>{t("withdraw-program.all-text")}</Text>
        </Row>
      )}
      <Row onlyOffset hide={withdrawAll}>
        <InputAmountField
          name={WITHDRAW_FORM_FIELDS.amount}
          label={t("withdraw-program.amount-to-withdraw")}
          currency={withdrawInPercent ? "%" : programCurrency}
          isAllowed={isAllow}
          setMax={isOwner || withdrawInPercent ? setMaxAmount : undefined}
        />
      </Row>
      {programCurrency !== accountCurrency && amount !== 0 && (
        <Row>
          <Text muted>
            <NumberFormat
              value={formatCurrencyValue(
                convertFromCurrency(convertedValue!, rate),
                accountCurrency
              )}
              prefix="≈ "
              suffix={` ${accountCurrency}`}
              displayType="text"
            />
          </Text>
        </Row>
      )}
      <DialogButtons>
        <SubmitButton
          wide
          id="programWithdrawAmountFormSubmit"
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
