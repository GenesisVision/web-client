import "./two-factor-code.scss";

import { FormikProps, InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import useIsOpen from "shared/hooks/is-open.hook";
import { SetSubmittingType } from "shared/utils/types";
import { object, string } from "yup";
import Link from "shared/components/link/link";

import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "../signin.constants";

const _TwoFactorCodeForm: React.FC<
  InjectedFormikProps<Props, ITwoFactorCodeFormValues>
> = ({
  t,
  handleSubmit,
  error,
  isSubmitting,
  values,
  setSubmitting,
  onSubmit
}) => {
  const [isChecking, setIsChecking] = useIsOpen();

  useEffect(() => {
    if (!isChecking && values[FIELDS.code].length === 6) {
      checkTwoFactor();
    }
  }, [values[FIELDS.code], isChecking]);

  const checkTwoFactor = useCallback(() => {
    if (isSubmitting) return;
    setIsChecking();
    setSubmitting(true);
    onSubmit(values, setSubmitting);
  }, [isSubmitting, values]);

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
};

enum FIELDS {
  code = "code",
  email = "email"
}

export interface ITwoFactorCodeFormValues {
  [FIELDS.code]: string;
  [FIELDS.email]: string;
}

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  email: string;
  onSubmit: (
    code: ITwoFactorCodeFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  error: string;
  isChecking?: boolean;
}
const TwoFactorCodeForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, ITwoFactorCodeFormValues>({
    displayName: "twoFactorForm",
    mapPropsToValues: ({ email }) => ({
      [FIELDS.code]: "",
      [FIELDS.email]: email
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
