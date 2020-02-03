import { DialogButtons } from "components/dialog/dialog-buttons";
import GVButton from "components/gv-button";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
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
  const {
    triggerValidation,
    watch,
    errors,
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting, touched, isValid }
  } = useForm<IDemoDepositFormValues>({
    validationSchema: DemoDepositValidationSchema(t),
    validateCriteriaMode: "firstError",
    mode: "onChange"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleNumberField
        autoFocus
        triggerValidation={triggerValidation}
        value={watch()[DEMO_DEPOSIT_FORM_FIELDS.amount]}
        touched={!!touched[DEMO_DEPOSIT_FORM_FIELDS.amount]}
        error={
          errors[DEMO_DEPOSIT_FORM_FIELDS.amount] &&
          errors[DEMO_DEPOSIT_FORM_FIELDS.amount]!.message
        }
        setFieldValue={setValue}
        suffix={` ${currency}`}
        wide
        label={t("transfer.amount")}
        refProp={register({
          name: DEMO_DEPOSIT_FORM_FIELDS.amount,
          type: "custom"
        })}
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
