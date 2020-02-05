import { DialogButtons } from "components/dialog/dialog-buttons";
import GVButton from "components/gv-button";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import {
  DEMO_DEPOSIT_FORM_FIELDS,
  DemoDepositResponse,
  DemoDepositValidationSchema,
  IDemoDepositFormValues
} from "modules/demo-deposit/demo-deposit.service";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _DemoDepositForm: React.FC<Props> = ({ currency, onSubmit }) => {
  const [t] = useTranslation();
  const form = useForm<IDemoDepositFormValues>({
    validationSchema: DemoDepositValidationSchema(t),
    mode: "onChange"
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormAmountField
        form={form}
        currency={currency}
        name={DEMO_DEPOSIT_FORM_FIELDS.amount}
      />
      <DialogButtons>
        <GVButton wide type="submit" disabled={isSubmitting || !isValid}>
          {t("deposit-asset.confirm")}
        </GVButton>
      </DialogButtons>
    </form>
  );
};

interface Props {
  currency: CurrencyEnum;
  onSubmit: (values: IDemoDepositFormValues) => DemoDepositResponse;
}

const DemoDepositForm = React.memo(_DemoDepositForm);
export default DemoDepositForm;
