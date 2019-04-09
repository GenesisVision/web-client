import { InjectedFormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import { SetSubmittingType } from "shared/utils/types";
import validationSchema from "./login-form.validators";
import { FORGOT_PASSWORD_ROUTE } from "../login.routes";

const _LoginForm: React.FC<
  InjectedFormikProps<Props, ILoginFormFormValues>
> = ({ t, isSubmitting, handleSubmit, error, isValid }) => {
  return (
    <form
      id="loginForm"
      className="login-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <GVFormikField
        type="email"
        name="email"
        label={t("auth.login.placeholder.email")}
        autoComplete="email"
        component={GVTextField}
      />
      <GVFormikField
        type="password"
        name="password"
        label={t("auth.login.placeholder.password")}
        autoComplete="current-password"
        component={GVTextField}
      />

      <div className="login-form__forgot">
        <Link to={FORGOT_PASSWORD_ROUTE}>
          <GVButton variant="text">{t("auth.login.forgot")}</GVButton>
        </Link>
      </div>
      <FormError error={error} />

      <div className="login__submit-block">
        <GVButton
          className="login__submit-button"
          id="loginSubmit"
          disabled={isSubmitting || !isValid}
          type="submit"
        >
          {t("auth.login.confirm-button-text")}
        </GVButton>
      </div>
    </form>
  );
};

interface Props extends OwnProps, InjectedTranslateProps {}

interface OwnProps {
  onSubmit(data: ILoginFormFormValues, setSubmitting: SetSubmittingType): void;
  error: string;
}

export interface ILoginFormFormValues {
  email: string;
  password: string;
}

const withTranslationAndFormik = compose<React.FC<OwnProps>>(
  React.memo,
  translate(),
  withFormik<Props, ILoginFormFormValues>({
    displayName: "loginForm",
    isInitialValid: true,
    mapPropsToValues: () => ({
      email: "",
      password: ""
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_LoginForm);
export default withTranslationAndFormik;
