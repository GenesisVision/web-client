import "./two-factor-code.scss";

import { FormikProps, InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";
import { object, string } from "yup";

import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "../login.routes";

class _TwoFactorCodeForm extends React.PureComponent<
  InjectedFormikProps<Props, ITwoFactorCodeFormValues>,
  State
> {
  state: State = {
    isChecking: false
  };

  checkTwoFactor = () => {
    if (this.props.isSubmitting) return;
    this.setState({ isChecking: true });
    this.props.setSubmitting(true);
    this.props.onSubmit(this.props.values, this.props.setSubmitting);
  };

  componentDidUpdate(
    prevProps: Readonly<Props & FormikProps<ITwoFactorCodeFormValues>>
  ): void {
    if (
      this.state.isChecking ||
      this.props.values[FIELDS.code] === prevProps.values[FIELDS.code]
    )
      return;
    if (this.props.values[FIELDS.code].length === 6) {
      this.checkTwoFactor();
    }
  }

  render() {
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
          type="tel"
          name={FIELDS.code}
          label={t("auth.login.two-factor.input-label")}
          autoComplete="off"
          autoFocus
          component={GVTextField}
          format="######"
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
          <GVButton type="submit" id="signUpFormSubmit" disabled={isSubmitting}>
            {t("auth.login.two-factor.verify")}
          </GVButton>
        </div>
      </form>
    );
  }
}

enum FIELDS {
  code = "code"
}

export interface ITwoFactorCodeFormValues {
  [FIELDS.code]: string;
}

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  onSubmit(
    code: ITwoFactorCodeFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  error: string;
  isChecking?: boolean;
}

interface State {
  isChecking: boolean;
}

const TwoFactorCodeForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, ITwoFactorCodeFormValues>({
    displayName: "twoFactorForm",
    mapPropsToValues: () => ({
      [FIELDS.code]: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        [FIELDS.code]: string()
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
      return props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_TwoFactorCodeForm);
export default TwoFactorCodeForm;
