import { DialogButtons } from "components/dialog/dialog-buttons";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { useGetRate } from "hooks/get-rate.hook";
import {
  DEMO_DEPOSIT_FORM_FIELDS,
  DemoDepositResponse,
  IDemoDepositFormValues
} from "modules/demo-deposit/demo-deposit.service";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { minDemoDepositAmountSelector } from "reducers/platform-reducer";
import { convertToCurrency } from "utils/currency-converter";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

const _DemoDepositForm: React.FC<Props> = ({
  currentDeposit,
  errorMessage,
  currency,
  onSubmit
}) => {
  const { rate, getRate } = useGetRate();
  useEffect(() => {
    getRate({ from: currency, to: "USDT" });
  }, [currency]);
  const maxAmount =
    convertToCurrency(useSelector(minDemoDepositAmountSelector), rate) -
    currentDeposit;
  const [t] = useTranslation();
  const form = useForm<IDemoDepositFormValues>({
    mode: "onChange"
  });
  const { setValue } = form;

  const setMax = useCallback(() => {
    setValue(DEMO_DEPOSIT_FORM_FIELDS.amount, String(maxAmount), true);
  }, [maxAmount]);

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <HookFormAmountField
        setMax={setMax}
        currency={currency}
        name={DEMO_DEPOSIT_FORM_FIELDS.amount}
        rules={{
          required: t("validations.required"),
          max: {
            value: maxAmount,
            message: t("validations.max-amount", { maxAmount })
          }
        }}
      />
      <DialogButtons>
        <SubmitButton isSuccessful={!errorMessage} wide>
          {t("deposit-asset.confirm")}
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

interface Props {
  currentDeposit: number;
  errorMessage?: string;
  currency: CurrencyEnum;
  onSubmit: (values: IDemoDepositFormValues) => DemoDepositResponse;
}

const DemoDepositForm = React.memo(_DemoDepositForm);
export default DemoDepositForm;
