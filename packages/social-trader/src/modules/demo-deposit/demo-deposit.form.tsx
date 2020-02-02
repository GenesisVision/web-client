import { DialogButtons } from "components/dialog/dialog-buttons";
import GVButton from "components/gv-button";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import { DemoDepositResponse } from "modules/demo-deposit/demo-deposit.service";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

const _DemoDepositForm: React.FC<Props> = ({ currency }) => {
  const {
    errors,
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting, touched }
  } = useForm<IDemoDepositFormValues>({
    validateCriteriaMode: "firstError",
    mode: "onChange"
  });
  const [t] = useTranslation();
  return (
    <form>
      <SimpleNumberField
        touched={!!touched.amount}
        error={errors.amount && errors.amount.message}
        setFieldValue={setValue}
        suffix={` ${currency}`}
        wide
        label={t("transfer.amount")}
        refProp={register(
          { name: FORM_FIELDS.amount, type: "custom" },
          { required: "Amount is required" }
        )}
        name={FORM_FIELDS.amount}
      />
      <DialogButtons>
        <GVButton wide type="submit" disabled={isSubmitting}>
          {t("deposit-asset.confirm")}
        </GVButton>
      </DialogButtons>
    </form>
  );
};

export enum FORM_FIELDS {
  amount = "amount"
}

interface Props {
  currency: CurrencyEnum;
  onSubmit: (
    values: IDemoDepositFormValues,
    setSubmitting: SetSubmittingType
  ) => DemoDepositResponse;
}

export interface IDemoDepositFormValues {
  amount: string;
}

export interface IDemoDepositFormProps {
  currency: CurrencyEnum;
  onSubmit: (
    values: IDemoDepositFormValues,
    setSubmitting: SetSubmittingType
  ) => DemoDepositResponse;
}

const DemoDepositForm = React.memo(_DemoDepositForm);
export default DemoDepositForm;
