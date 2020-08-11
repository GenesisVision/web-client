import { Button } from "components/button/button";
import FormError from "components/form/form-error/form-error";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import { GVHookFormField } from "components/gv-hook-form-field";
import Link from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
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
import { LOGIN_ROUTE } from "routes/app.routes";
import { HookForm } from "utils/hook-form.helpers";

import validationSchema, {
  SIGN_UP_FORM_FIELDS
} from "./signup-form.validators";

const _SignUpForm: React.FC<Props> = ({
  showLogin,
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
      [SIGN_UP_FORM_FIELDS.privacyPolicy]: false,
      [SIGN_UP_FORM_FIELDS.acceptTerms]: false,
      [SIGN_UP_FORM_FIELDS.isAuto]: false //TODO remove when upgrade api
    },
    validationSchema: validationSchema(t),
    mode: "onChange"
  });

  const requestStatus = useContext(CaptchaStatusContext);

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row onlyOffset>
        <GVHookFormField
          wide
          showCorrect
          type="text"
          name={SIGN_UP_FORM_FIELDS.userName}
          label={t("auth:signup.username-field-text")}
          autoComplete="off"
          autoFocus
          component={SimpleTextField}
        />
      </Row>
      <Row onlyOffset>
        <GVHookFormField
          wide
          showCorrect
          type="email"
          name={SIGN_UP_FORM_FIELDS.email}
          label={t("auth:signup.email-field-text")}
          autoComplete="email"
          component={SimpleTextField}
        />
      </Row>
      <Row onlyOffset>
        <GVHookFormField
          wide
          showCorrect
          type="password"
          name={SIGN_UP_FORM_FIELDS.password}
          label={t("auth:signup.password-field-text")}
          component={SimpleTextField}
          autoComplete="new-password"
        />
      </Row>
      <Row>
        <GVHookFormField
          type="checkbox"
          color="primary"
          name={SIGN_UP_FORM_FIELDS.privacyPolicy}
          label={
            <span>
              {t("auth:signup.i-accept-text")}{" "}
              <a
                title={t("auth:signup.privacy-policy-text")}
                target="_blank"
                rel="noopener noreferrer"
                href={PRIVACY_POLICY_ROUTE}
                onClick={e => e.stopPropagation()}
              >
                {t("auth:signup.privacy-policy-text")}
              </a>
            </span>
          }
          component={GVCheckbox}
        />
      </Row>
      <Row>
        <GVHookFormField
          type="checkbox"
          color="primary"
          name={SIGN_UP_FORM_FIELDS.acceptTerms}
          label={
            <span>
              {t("auth:signup.i-accept-text")}{" "}
              <a
                title={t("auth:signup.accept-terms-text")}
                target="_blank"
                rel="noopener noreferrer"
                href={TERMS_ROUTE}
                onClick={e => e.stopPropagation()}
              >
                {t("auth:signup.accept-terms-text")}
              </a>
            </span>
          }
          component={GVCheckbox}
        />
      </Row>
      {error && (
        <Row>
          <FormError error={error} />
        </Row>
      )}
      <Row size={"xlarge"}>
        <RowItem size={"large"}>
          <SubmitButton
            id="signUpFormSubmit"
            isPending={requestStatus === CAPTCHA_STATUS.PENDING}
            isSuccessful={requestStatus === CAPTCHA_STATUS.SUCCESS}
            disabled={requestStatus === CAPTCHA_STATUS.PENDING}
          >
            {t("auth:signup.title")}
          </SubmitButton>
        </RowItem>
        {showLogin && (
          <RowItem>
            <Link to={LOGIN_ROUTE}>
              <Button variant="outlined" color="secondary">
                {t("auth:login.title")}
              </Button>
            </Link>
          </RowItem>
        )}
      </Row>
    </HookForm>
  );
};

interface Props {
  showLogin?: boolean;
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
