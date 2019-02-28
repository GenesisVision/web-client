import "./two-factor-code.scss";

import { FormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "pages/auth/login/login.routes";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import { object, string } from "yup";

interface ITwoFactorValues {
  twoFactorCode: string;
}

interface ITwoFactorFormProps extends InjectedTranslateProps {
  onSubmit(
    twoFactor: string,
    setSubmitting: (isSubmitting: boolean) => void
  ): Promise<any>;
  errorMessage: string;
}

type ITwoFactorFormState = {
  isChecking: boolean;
};

class TwoFactorCodeForm extends React.Component<
  ITwoFactorFormProps & FormikProps<ITwoFactorValues>,
  ITwoFactorFormState
> {
  state: ITwoFactorFormState = {
    isChecking: false
  };

  checkTwoFactor = () => {
    if (this.props.isSubmitting) return;
    this.setState({ isChecking: true });
    this.props.setSubmitting(true);
    const req = this.props.onSubmit(
      this.props.values.twoFactorCode,
      this.props.setSubmitting
    );
    req.catch(() => this.setState({ isChecking: false }));
  };

  componentDidUpdate(
    prevProps: Readonly<ITwoFactorFormProps & FormikProps<ITwoFactorValues>>,
    prevState: Readonly<ITwoFactorFormState>,
    snapshot?: any
  ): void {
    if (
      this.state.isChecking ||
      this.props.values.twoFactorCode === prevProps.values.twoFactorCode
    )
      return;
    if (this.props.values.twoFactorCode.length === 6) {
      this.checkTwoFactor();
    }
  }

  render() {
    {
      const { t, handleSubmit, error, isSubmitting } = this.props;
      return (
        <form
          id="twoFactorForm"
          className="login-two-factor"
          onSubmit={handleSubmit}
          noValidate
        >
          <h3>{t("auth.login.two-factor.title")}</h3>
          <div className="login-two-factor__text">
            {t("auth.login.two-factor.text")}
          </div>
          <GVFormikField
            disabled={isSubmitting}
            type="text"
            name="twoFactorCode"
            label={t("auth.login.two-factor.input-label")}
            autoComplete="off"
            autoFocus
            component={GVTextField}
          />

          <div className="login-two-factor__recovery-info">
            {t("auth.login.two-factor.recovery-info")}
          </div>
          <GVButton className="login-two-factor__recovery-link" variant="text">
            <Link to={LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE}>
              {t("auth.login.two-factor.link-to-recovery")}
            </Link>
          </GVButton>

          <FormError error={error} />
          <div className="login-two-factor__submit">
            <GVButton
              type="submit"
              id="signUpFormSubmit"
              disabled={isSubmitting}
            >
              {t("auth.login.two-factor.verify")}
            </GVButton>
          </div>
        </form>
      );
    }
  }
}

export default compose<React.FunctionComponent<ITwoFactorFormProps>>(
  translate(),
  withFormik<ITwoFactorFormProps, ITwoFactorValues>({
    displayName: "twoFactorForm",
    mapPropsToValues: () => ({
      twoFactorCode: ""
    }),
    validationSchema: (props: ITwoFactorFormProps) =>
      object().shape({
        twoFactorCode: string()
          .trim()
          .matches(
            /^\d{6}$/,
            props.t("auth.login.two-factor.validation.two-factor-6digits")
          )
          .required(
            props.t("auth.login.two-factor.validation.two-factor-required")
          )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      return props.onSubmit(values.twoFactorCode, setSubmitting);
    }
  })
)(TwoFactorCodeForm);
