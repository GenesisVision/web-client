import FormError from "components/form/form-error/form-error";
import GVButton from "components/gv-button";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { InjectedFormikProps, withFormik } from "formik";
import { CaptchaCheckResult } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import {
  PRIVACY_POLICY_ROUTE,
  TERMS_ROUTE
} from "routes/ssr/landing-page/static-data/nav-links";
import { SetSubmittingType } from "utils/types";

import validationSchema, {
  SIGN_UP_FORM_FIELDS
} from "./signup-form.validators";

const _SignUpForm: React.FC<
  InjectedFormikProps<Props, ISignUpFormFormValues>
> = ({ isSubmitting, handleSubmit, error, t, isValid, dirty }) => (
  <form
    id="signUpForm"
    className="signup-form"
    onSubmit={handleSubmit}
    noValidate
  >
    <GVFormikField
      type="text"
      name={SIGN_UP_FORM_FIELDS.userName}
      label={t("auth.signup.username-field-text")}
      autoComplete="off"
      className="signup-form__username"
      autoFocus
      component={GVTextField}
    />
    <GVFormikField
      type="email"
      name={SIGN_UP_FORM_FIELDS.email}
      label={t("auth.signup.email-field-text")}
      autoComplete="email"
      component={GVTextField}
    />
    <GVFormikField
      type="password"
      name={SIGN_UP_FORM_FIELDS.password}
      label={t("auth.signup.password-field-text")}
      component={GVTextField}
      autoComplete="new-password"
    />
    <GVFormikField
      type="password"
      name={SIGN_UP_FORM_FIELDS.confirmPassword}
      label={t("auth.signup.password-confirm-field-text")}
      component={GVTextField}
      autoComplete="new-password"
    />
    <GVFormikField
      type="checkbox"
      color="primary"
      name={SIGN_UP_FORM_FIELDS.privacyPolicy}
      label={
        <span>
          {t("auth.signup.i-accept-text")}{" "}
          <a
            title={t("auth.signup.privacy-policy-text")}
            target="_blank"
            rel="noopener noreferrer"
            href={PRIVACY_POLICY_ROUTE}
            onClick={e => e.stopPropagation()}
          >
            {t("auth.signup.privacy-policy-text")}
          </a>
        </span>
      }
      component={GVCheckbox}
    />
    <GVFormikField
      type="checkbox"
      color="primary"
      name={SIGN_UP_FORM_FIELDS.acceptTerms}
      label={
        <span>
          {t("auth.signup.i-accept-text")}{" "}
          <a
            title={t("auth.signup.accept-terms-text")}
            target="_blank"
            rel="noopener noreferrer"
            href={TERMS_ROUTE}
            onClick={e => e.stopPropagation()}
          >
            {t("auth.signup.accept-terms-text")}
          </a>
        </span>
      }
      component={GVCheckbox}
    />
    <FormError error={error} />
    <GVButton
      type="submit"
      id="signUpFormSubmit"
      className="signup-form__submit-button"
      disabled={!isValid || !dirty || isSubmitting}
    >
      {t("auth.signup.title")}
    </GVButton>
  </form>
);

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  onSubmit(data: ISignUpFormFormValues, setSubmitting: SetSubmittingType): void;
  error: string;
  refCode?: string;
}

export interface ISignUpFormFormValues {
  //extends RegisterManagerViewModel {
  [SIGN_UP_FORM_FIELDS.privacyPolicy]: boolean;
  [SIGN_UP_FORM_FIELDS.acceptTerms]: boolean;
  [SIGN_UP_FORM_FIELDS.captchaCheckResult]: CaptchaCheckResult;
}

const SignUpForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, ISignUpFormFormValues>({
    displayName: "signup-form",
    mapPropsToValues: props => ({
      [SIGN_UP_FORM_FIELDS.captchaCheckResult]: {
        id: "",
        pow: {
          prefix: ""
        },
        geeTest: {}
      },
      [SIGN_UP_FORM_FIELDS.refCode]: props.refCode || "",
      [SIGN_UP_FORM_FIELDS.userName]: "",
      [SIGN_UP_FORM_FIELDS.email]: "",
      [SIGN_UP_FORM_FIELDS.password]: "",
      [SIGN_UP_FORM_FIELDS.confirmPassword]: "",
      [SIGN_UP_FORM_FIELDS.privacyPolicy]: false,
      [SIGN_UP_FORM_FIELDS.acceptTerms]: false,
      [SIGN_UP_FORM_FIELDS.isAuto]: false //TODO remove when upgrade api
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_SignUpForm);
export default SignUpForm;
