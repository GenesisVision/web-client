import "./two-factor-code.scss";

import FormError from "components/form/form-error/form-error";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import useIsOpen from "hooks/is-open.hook";
import {
  CAPTCHA_STATUS,
  CaptchaStatusContext
} from "pages/auth/captcha-container";
import * as React from "react";
import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object, string } from "yup";

import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "../signin.constants";

enum FIELDS {
  code = "code",
  email = "email"
}

const _TwoFactorCodeForm: React.FC<Props> = ({ email, error, onSubmit }) => {
  const [t] = useTranslation();

  const form = useForm<ITwoFactorCodeFormValues>({
    defaultValues: { [FIELDS.code]: "", [FIELDS.email]: email },
    validationSchema: object().shape({
      [FIELDS.code]: string()
        .trim()
        .matches(
          /^\d{6}$/,
          t("auth.login.two-factor.validation.two-factor-6digits")
        )
        .required(t("auth.login.two-factor.validation.two-factor-required"))
    }),
    mode: "onChange"
  });
  const {
    watch,
    formState: { isSubmitting, isValid }
  } = form;
  const { code } = watch();

  const { linkCreator } = useToLink();
  const [isChecking, setIsChecking] = useIsOpen();

  useEffect(() => {
    if (!isChecking && code.length === 6) {
      checkTwoFactor();
    }
  }, [code, isChecking]);

  const checkTwoFactor = useCallback(() => {
    if (isSubmitting) return;
    setIsChecking();
    onSubmit(watch());
  }, [isSubmitting, watch]);

  const requestStatus = useContext(CaptchaStatusContext);

  const isSuccessful = requestStatus === CAPTCHA_STATUS.SUCCESS;
  const disabled =
    isSubmitting ||
    requestStatus === CAPTCHA_STATUS.PENDING ||
    isSuccessful ||
    !isValid;

  return (
    <HookForm className="login-two-factor" form={form} onSubmit={onSubmit}>
      <h3>{t("auth.login.two-factor.title")}</h3>
      <div className="login-two-factor__text">
        {t("auth.login.two-factor.text")}
      </div>
      <GVHookFormField
        disabled={isSubmitting}
        type="tel"
        name={FIELDS.code}
        label={t("auth.login.two-factor.input-label")}
        autoComplete="off"
        autoFocus
        component={SimpleTextField}
        format="######"
      />

      <div className="login-two-factor__recovery-info">
        {t("auth.login.two-factor.recovery-info")}
      </div>
      <GVButton className="login-two-factor__recovery-link" variant="text">
        <Link to={linkCreator(LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE)}>
          {t("auth.login.two-factor.link-to-recovery")}
        </Link>
      </GVButton>

      <FormError error={error} />
      <div className="login-two-factor__submit">
        <GVButton
          type="submit"
          id="signUpFormSubmit"
          disabled={disabled}
          isSuccessful={isSuccessful}
          isPending={isSubmitting}
        >
          {t("auth.login.two-factor.verify")}
        </GVButton>
      </div>
    </HookForm>
  );
};

export interface ITwoFactorCodeFormValues {
  [FIELDS.code]: string;
  [FIELDS.email]: string;
}

interface Props {
  email: string;
  onSubmit: (values: ITwoFactorCodeFormValues) => void;
  error: string;
  isChecking?: boolean;
}
const TwoFactorCodeForm = React.memo(_TwoFactorCodeForm);
export default TwoFactorCodeForm;
