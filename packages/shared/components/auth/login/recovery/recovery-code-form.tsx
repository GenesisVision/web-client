import { InjectedFormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import { object, string } from "yup";
import { CounterType } from "../login.service";

const _RecoveryCodeForm: React.FC<
  InjectedFormikProps<Props, IRecoveryCodeFormValues>
> = ({ t, handleSubmit, isSubmitting, error }) => {
  return (
    <form
      id="recoveryForm"
      className="recovery-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h3>{t("auth.login.recovery.title")}</h3>
      <p className="recovery-form__text">{t("auth.login.recovery.text")}</p>
      <GVFormikField
        name="recoveryCode"
        placeholder="Recovery code"
        autoFocus
        component={GVTextField}
      />
      <FormError error={error} />
      <GVButton
        id="recoverySubmit"
        disabled={isSubmitting}
        type="submit"
        className="recovery-form__submit"
      >
        {t("auth.login.recovery.continue")}
      </GVButton>
    </form>
  );
};

interface Props extends OwnProps, InjectedTranslateProps {}

interface OwnProps {
  onSubmit(data: string, setSubmitting: (isSubmitting: boolean) => void): void;
  error: string;
  counter: CounterType;
}

export interface IRecoveryCodeFormValues {
  recoveryCode: string;
}

const RecoveryCodeForm = compose<React.FC<OwnProps>>(
  React.memo,
  translate(),
  withFormik<Props, IRecoveryCodeFormValues>({
    displayName: "recoveryForm",
    mapPropsToValues: () => ({
      recoveryCode: ""
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        recoveryCode: string()
          .trim()
          .required(t("auth.login.recovery.validation.recovery-is-required"))
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values.recoveryCode, setSubmitting);
    }
  })
)(_RecoveryCodeForm);
export default RecoveryCodeForm;
