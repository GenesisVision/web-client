import classnames from "classnames";
import { FormikProps, withFormik } from "formik";
import { ChangePasswordViewModel } from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React, { ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";

import { passwordChangeValidationSchema } from "./password-change.validators";

interface IPasswordChangeFormOwnProps {
  errorMessage?: string | null;
  isPending: boolean;
  onSubmit(values: ChangePasswordViewModel): void;
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
  isPending,
  handleSubmit,
  isValid,
  dirty
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
      <GVButton type="submit" disabled={isPending || !isValid || !dirty}>
        {t("buttons.confirm")}
      </GVButton>
    </form>
  );
};

export default compose<ComponentType<IPasswordChangeFormOwnProps>>(
  translate(),
  withFormik<IPasswordChangeFormOwnProps, ChangePasswordViewModel>({
    displayName: "change-password",
    mapPropsToValues: () => ({
      oldPassword: "",
      password: "",
      confirmPassword: ""
    }),
    validationSchema: passwordChangeValidationSchema,
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(PasswordChangeForm);
