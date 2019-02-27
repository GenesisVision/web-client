import classnames from "classnames";
import { FormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React, { ComponentType, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";

import { passwordChangeValidationSchema } from "./password-change.validators";

interface IPasswordChangeFormOwnProps {
  programName: string;
  errorMessage: string;
  isPending: boolean;
  onSubmit(values: IPasswordChangeFormValues): void;
}

export interface IPasswordChangeFormValues {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

type PasswordChangeFormProps = InjectedTranslateProps &
  IPasswordChangeFormOwnProps &
  FormikProps<IPasswordChangeFormValues>;
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
  withFormik<IPasswordChangeFormOwnProps, IPasswordChangeFormValues>({
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
