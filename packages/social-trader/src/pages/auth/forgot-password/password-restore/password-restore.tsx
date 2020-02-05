import FormError from "components/form/form-error/form-error";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";
import { object, ref, string } from "yup";

enum FIELDS {
  password = "password",
  confirmPassword = "confirmPassword"
}

const _RestorePassword: React.FC<InjectedFormikProps<
  Props,
  IRestorePasswordFormValues
>> = ({ t, isSubmitting, handleSubmit, error }) => (
  <form id="passwordRestoreForm" onSubmit={handleSubmit} noValidate>
    <GVFormikField
      type="password"
      name={FIELDS.password}
      label={t("auth.password-restore.new-password.password-field-text")}
      component={GVTextField}
    />
    <GVFormikField
      type="password"
      name={FIELDS.confirmPassword}
      label={t(
        "auth.password-restore.new-password.password-confirm-field-text"
      )}
      component={GVTextField}
    />
    <FormError error={error} />
    <div className="password-restore__navigation">
      <GVButton
        type="submit"
        id="passwordRestoreSubmit"
        disabled={isSubmitting}
      >
        {t("auth.password-restore.new-password.confirm-button-text")}
      </GVButton>
    </div>
  </form>
);

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  onSubmit(
    data: IRestorePasswordFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  error: string;
}

export interface IRestorePasswordFormValues {
  password: string;
  confirmPassword: string;
}

const RestorePassword = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, IRestorePasswordFormValues>({
    displayName: "passwordRestoreForm",
    mapPropsToValues: () => ({
      [FIELDS.password]: "",
      [FIELDS.confirmPassword]: ""
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FIELDS.password]: string()
          .min(6, t("auth.password-restore.validators.password-weak"))
          .required(t("auth.password-restore.validators.password-required")),
        [FIELDS.confirmPassword]: string()
          .oneOf(
            [ref(FIELDS.password)],
            t("auth.password-restore.validators.password-dont-match")
          )
          .required(
            t("auth.password-restore.validators.confirm-password-required")
          )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_RestorePassword);
export default RestorePassword;
