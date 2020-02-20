import FormError from "components/form/form-error/form-error";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { RegisterViewModel } from "gv-api-web";
import {
  CAPTCHA_STATUS,
  CaptchaStatusContext
} from "pages/auth/captcha-container";
import {
  PRIVACY_POLICY_ROUTE,
  TERMS_ROUTE
} from "pages/landing-page/static-data/nav-links";
import * as React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import validationSchema, {
  SIGN_UP_FORM_FIELDS
} from "./signup-form.validators";

const _SignUpForm: React.FC<Props> = ({
  onSubmit,
  error,
  referer,
  urlParams,
  refCode
}) => {
  const [t] = useTranslation();

  const form = useForm<ISignUpFormFormValues>({
    defaultValues: {
      [SIGN_UP_FORM_FIELDS.utmSource]: {
        referer,
        urlParams
      },
      [SIGN_UP_FORM_FIELDS.captchaCheckResult]: {
        id: "",
        pow: {
          prefix: ""
        },
        geeTest: {}
      },
      [SIGN_UP_FORM_FIELDS.refCode]: refCode || "",
      [SIGN_UP_FORM_FIELDS.userName]: "",
      [SIGN_UP_FORM_FIELDS.email]: "",
      [SIGN_UP_FORM_FIELDS.password]: "",
      [SIGN_UP_FORM_FIELDS.confirmPassword]: "",
      [SIGN_UP_FORM_FIELDS.privacyPolicy]: false,
      [SIGN_UP_FORM_FIELDS.acceptTerms]: false,
      [SIGN_UP_FORM_FIELDS.isAuto]: false //TODO remove when upgrade api
    },
    validationSchema: validationSchema,
    mode: "onChange"
  });

  const requestStatus = useContext(CaptchaStatusContext);

  return (
    <HookForm className="signup-form" form={form} onSubmit={onSubmit}>
      <GVHookFormField
        showCorrect
        type="text"
        name={SIGN_UP_FORM_FIELDS.userName}
        label={t("auth.signup.username-field-text")}
        autoComplete="off"
        autoFocus
        component={SimpleTextField}
      />
      <GVHookFormField
        showCorrect
        type="email"
        name={SIGN_UP_FORM_FIELDS.email}
        label={t("auth.signup.email-field-text")}
        autoComplete="email"
        component={SimpleTextField}
      />
      <GVHookFormField
        showCorrect
        type="password"
        name={SIGN_UP_FORM_FIELDS.password}
        label={t("auth.signup.password-field-text")}
        component={SimpleTextField}
        autoComplete="new-password"
      />
      <GVHookFormField
        showCorrect
        type="password"
        name={SIGN_UP_FORM_FIELDS.confirmPassword}
        label={t("auth.signup.password-confirm-field-text")}
        component={SimpleTextField}
        autoComplete="new-password"
      />
      <GVHookFormField
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
      <GVHookFormField
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
      <SubmitButton
        id="signUpFormSubmit"
        className="signup-form__submit-button"
        isPending={requestStatus === CAPTCHA_STATUS.PENDING}
        isSuccessful={requestStatus === CAPTCHA_STATUS.SUCCESS}
        disabled={requestStatus === CAPTCHA_STATUS.PENDING}
      >
        {t("auth.signup.title")}
      </SubmitButton>
    </HookForm>
  );
};

interface Props {
  referer?: string;
  onSubmit: (data: ISignUpFormFormValues) => void;
  error: string;
  refCode?: string;
  urlParams?: string;
}

export interface ISignUpFormFormValues extends RegisterViewModel {
  [SIGN_UP_FORM_FIELDS.privacyPolicy]: boolean;
  [SIGN_UP_FORM_FIELDS.acceptTerms]: boolean;
}

const SignUpForm = React.memo(_SignUpForm);
export default SignUpForm;
