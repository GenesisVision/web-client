import { InjectedFormikProps, withFormik } from "formik";
import {
  CaptchaCheckResult,
  GeeTestResult,
  PowResult,
  RegisterInvestorViewModel
} from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";

import { SIGNUP_FORM_FIELDS } from "./signup-form.types";
import validationSchema from "./signup-form.validators";

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
      type="email"
      name={SIGNUP_FORM_FIELDS.email}
      label={t("auth.signup.email-field-text")}
      autoComplete="email"
      autoFocus
      component={GVTextField}
    />
    <GVFormikField
      type="password"
      name={SIGNUP_FORM_FIELDS.password}
      label={t("auth.signup.password-field-text")}
      component={GVTextField}
      autoComplete="new-password"
    />
    <GVFormikField
      type="password"
      name={SIGNUP_FORM_FIELDS.confirmPassword}
      label={t("auth.signup.password-confirm-field-text")}
      component={GVTextField}
      autoComplete="new-password"
    />
    <GVFormikField
      type="checkbox"
      color="primary"
      name={SIGNUP_FORM_FIELDS.privacyPolicy}
      label={
        <span>
          {t("auth.signup.i-accept-text")}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://genesis.vision/privacy-policy.html"
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
      name={SIGNUP_FORM_FIELDS.acceptTerms}
      label={
        <span>
          {t("auth.signup.i-accept-text")}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://genesis.vision/terms.html"
            onClick={e => e.stopPropagation()}
          >
            {t("auth.signup.accept-terms-text")}
          </a>
        </span>
      }
      component={GVCheckbox}
    />
    <GVFormikField
      type="checkbox"
      color="primary"
      name={SIGNUP_FORM_FIELDS.residentUSA}
      label={t("auth.signup.resident-USA-text")}
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

export interface ISignUpFormFormValues extends RegisterInvestorViewModel {
  [SIGNUP_FORM_FIELDS.privacyPolicy]: boolean;
  [SIGNUP_FORM_FIELDS.acceptTerms]: boolean;
  [SIGNUP_FORM_FIELDS.residentUSA]: boolean;
  [SIGNUP_FORM_FIELDS.captchaCheckResult]: CaptchaCheckResult;
}

const SignUpForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, ISignUpFormFormValues>({
    displayName: "signup-form",
    mapPropsToValues: props => ({
      [SIGNUP_FORM_FIELDS.captchaCheckResult]: {
        id: "",
        pow: {
          prefix: ""
        },
        geeTest: {}
      },
      [SIGNUP_FORM_FIELDS.email]: "",
      [SIGNUP_FORM_FIELDS.password]: "",
      [SIGNUP_FORM_FIELDS.confirmPassword]: "",
      [SIGNUP_FORM_FIELDS.isAuto]: false, //TODO remove when upgrade api
      [SIGNUP_FORM_FIELDS.refCode]: props.refCode || "",
      [SIGNUP_FORM_FIELDS.privacyPolicy]: false,
      [SIGNUP_FORM_FIELDS.acceptTerms]: false,
      [SIGNUP_FORM_FIELDS.residentUSA]: false
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_SignUpForm);
export default SignUpForm;
