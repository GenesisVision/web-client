import classNames from "classnames";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { FormikProps, withFormik } from "formik";
import { ChangePasswordViewModel } from "gv-api-web";
import React, { ComponentType } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";

import { passwordChangeValidationSchema } from "./password-change.validators";

interface IPasswordChangeFormOwnProps {
  errorMessage?: string | null;
  onSubmit(
    values: ChangePasswordViewModel,
    setSubmitting: SetSubmittingType
  ): void;
}

type PasswordChangeFormProps = WithTranslation &
  IPasswordChangeFormOwnProps &
  FormikProps<ChangePasswordViewModel>;
const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  t,
  touched,
  values,
  errorMessage,
  errors,
  handleSubmit,
  isValid,
  dirty,
  isSubmitting
}) => {
  const className = classNames({
    "change-password__equal":
      !errors[PASSWORD_CHANGE_FORM_FIELDS.password] &&
      !errors[PASSWORD_CHANGE_FORM_FIELDS.confirmPassword] &&
      touched[PASSWORD_CHANGE_FORM_FIELDS.confirmPassword] &&
      values[PASSWORD_CHANGE_FORM_FIELDS.password] ===
        values[PASSWORD_CHANGE_FORM_FIELDS.confirmPassword]
  });
  return (
    <form
      id="change-password"
      className="change-password"
      onSubmit={handleSubmit}
      noValidate
    >
      <GVFormikField
        component={GVTextField}
        label={t("auth.password-change.current-password")}
        name={PASSWORD_CHANGE_FORM_FIELDS.oldPassword}
        type="password"
        autoComplete="new-password"
        autoFocus
      />
      <div className="change-password__new">
        <GVFormikField
          className={className}
          component={GVTextField}
          label={t("auth.password-change.password")}
          type="password"
          name={PASSWORD_CHANGE_FORM_FIELDS.password}
          autoComplete="new-password"
        />
        <GVFormikField
          className={className}
          component={GVTextField}
          label={t("auth.password-change.confirm-password")}
          type="password"
          name={PASSWORD_CHANGE_FORM_FIELDS.confirmPassword}
          autoComplete="new-password"
        />
        <div className="form-error">{errorMessage}</div>
      </div>
      <GVButton type="submit" disabled={isSubmitting || !isValid || !dirty}>
        {t("buttons.confirm")}
      </GVButton>
    </form>
  );
};

export enum PASSWORD_CHANGE_FORM_FIELDS {
  oldPassword = "oldPassword",
  password = "password",
  confirmPassword = "confirmPassword"
}

export default compose<ComponentType<IPasswordChangeFormOwnProps>>(
  translate(),
  withFormik<IPasswordChangeFormOwnProps, ChangePasswordViewModel>({
    displayName: "change-password",
    mapPropsToValues: () => ({
      [PASSWORD_CHANGE_FORM_FIELDS.oldPassword]: "",
      [PASSWORD_CHANGE_FORM_FIELDS.password]: "",
      [PASSWORD_CHANGE_FORM_FIELDS.confirmPassword]: ""
    }),
    validationSchema: passwordChangeValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) =>
      props.onSubmit(values, setSubmitting)
  }),
  React.memo
)(PasswordChangeForm);
