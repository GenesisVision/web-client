import { InjectedFormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import validationSchema from "./login-form.validators";

const _LoginForm: React.FC<
  InjectedFormikProps<Props, ILoginFormFormValues>
> = ({
  t,
  isSubmitting,
  handleSubmit,
  error,
  isValid,
  dirty,
  FORGOT_PASSWORD_ROUTE
}) => {
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

      <GVButton
        className="login__submit-button"
        id="loginSubmit"
        disabled={isSubmitting || !isValid}
        type="submit"
      >
        {t("auth.login.confirm-button-text")}
      </GVButton>
    </form>
  );
};

const withTranslationAndFormik = compose<React.FC<OwnProps>>(
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

interface Props extends OwnProps, InjectedTranslateProps {}

interface OwnProps {
  onSubmit(
    data: ILoginFormFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ): void;
  error: string;
  FORGOT_PASSWORD_ROUTE: string;
}

export interface ILoginFormFormValues {
  email: string;
  password: string;
}

export default withTranslationAndFormik;
