import { DialogButtons } from "components/dialog/dialog-buttons";
import GVButton from "components/gv-button";
import InputAmountField from "components/input-amount-field/input-amount-field";
import { FormikProps, withFormik } from "formik";
import { DemoDepositResponse } from "modules/demo-deposit/demo-deposit.service";
import React from "react";
import {
  useTranslation,
  WithTranslation,
  withTranslation as translate
} from "react-i18next";
import { compose } from "redux";
import { CurrencyEnum, SetSubmittingType } from "utils/types";
import { number, object } from "yup";

export enum FORM_FIELDS {
  amount = "amount"
}

const _DemoDepositForm: React.FC<Props> = ({
  isValid,
  isSubmitting,
  handleSubmit,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <form onSubmit={handleSubmit}>
      <InputAmountField
        wide
        name={FORM_FIELDS.amount}
        label={t("transfer.amount")}
        currency={currency}
      />
      <DialogButtons>
        <GVButton wide type="submit" disabled={isSubmitting || !isValid}>
          {t("deposit-asset.confirm")}
        </GVButton>
      </DialogButtons>
    </form>
  );
};

interface Props
  extends IDemoDepositFormProps,
    WithTranslation,
    FormikProps<IDemoDepositFormValues> {}

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

const DemoDepositForm = compose<React.ComponentType<IDemoDepositFormProps>>(
  translate(),
  withFormik<Props, IDemoDepositFormValues>({
    enableReinitialize: true,
    displayName: "demo-deposit-form",
    mapPropsToValues: () => ({
      [FORM_FIELDS.amount]: ""
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FORM_FIELDS.amount]: number().required(
          t("withdraw-fund.validation.required")
        )
      }),
    handleSubmit: (values, { props: { onSubmit }, setSubmitting }) => {
      onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_DemoDepositForm);
export default DemoDepositForm;
