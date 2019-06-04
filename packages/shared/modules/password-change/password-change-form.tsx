import classnames from "classnames";
import { FormikProps, withFormik } from "formik";
import { ChangePasswordViewModel } from "gv-api-web";
import React, { ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";

import { passwordChangeValidationSchema } from "./password-change.validators";

interface IPasswordChangeFormOwnProps {
  errorMessage?: string | null;
  onSubmit(
    values: ChangePasswordViewModel,
    setSubmitting: SetSubmittingType
  ): void;
}

type PasswordChangeFormProps = InjectedTranslateProps &
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
  const className = classnames({
    "change-password__equal":
      !errors.password &&
      !errors.confirmPassword &&
      touched.confirmPassword &&
      values.password === values.confirmPassword
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
        name="oldPassword"
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
          name="password"
          autoComplete="new-password"
        />
        <GVFormikField
          className={className}
          component={GVTextField}
          label={t("auth.password-change.confirm-password")}
          type="password"
          name="confirmPassword"
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

export default compose<ComponentType<IPasswordChangeFormOwnProps>>(
  React.memo,
  translate(),
  withFormik<IPasswordChangeFormOwnProps, ChangePasswordViewModel>({
    displayName: "change-password",
    mapPropsToValues: () => ({
      oldPassword: "",
      password: "",
      confirmPassword: ""
    }),
    validationSchema: passwordChangeValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) =>
      props.onSubmit(values, setSubmitting)
  })
)(PasswordChangeForm);
