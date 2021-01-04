import { Button } from "components/button/button";
import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { Text } from "components/text/text";
import useIsOpen from "hooks/is-open.hook";
import {
  CAPTCHA_STATUS,
  CaptchaStatusContext
} from "pages/auth/captcha-container";
import { useTwoFactorState } from "pages/auth/signin/signin.service";
import * as React from "react";
import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { twoFactorRules } from "utils/validators/validators";

import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "../signin.constants";

enum FIELDS {
  code = "code",
  email = "email"
}

const _TwoFactorCodeForm: React.FC<Props> = ({
  email,
  error,
  onSubmit,
  password
}) => {
  const { storeTwoFactorState } = useTwoFactorState();
  const [t] = useTranslation();

  const form = useForm<ITwoFactorCodeFormValues>({
    defaultValues: { [FIELDS.code]: "", [FIELDS.email]: email },
    mode: "onChange"
  });
  const {
    watch,
    formState: { isSubmitting }
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
    onSubmit({ code, email });
  }, [isSubmitting, code, email]);

  const requestStatus = useContext(CaptchaStatusContext);

  const handleSubmit = useCallback(() => {
    return onSubmit({ code, email });
  }, [code, email]);

  const handleRecoveryClick = useCallback(() => {
    storeTwoFactorState({ email, password });
  }, [storeTwoFactorState]);

  return (
    <HookForm form={form} onSubmit={handleSubmit}>
      <h3>{t("auth:login.two-factor.title")}</h3>
      <Row>
        <Text muted>{t("auth:login.two-factor.text")}</Text>
      </Row>
      <Row size={"xlarge"}>
        <GVHookFormField
          disabled={isSubmitting}
          type="tel"
          name={FIELDS.code}
          label={t("auth:login.two-factor.input-label")}
          autoComplete="off"
          autoFocus
          component={SimpleTextField}
          format="######"
          rules={twoFactorRules(t)}
        />
      </Row>
      <Row size={"large"}>
        <Text muted>{t("auth:login.two-factor.recovery-info")}</Text>
      </Row>
      <Row size={"small"}>
        <Button noPadding variant="text">
          <Link
            onClick={handleRecoveryClick}
            to={linkCreator(LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE)}
          >
            {t("auth:login.two-factor.link-to-recovery")}
          </Link>
        </Button>
      </Row>
      {error && (
        <Row>
          <FormError error={error} />
        </Row>
      )}
      <Row size={"large"}>
        <SubmitButton
          checkSubmitted={false}
          id="signUpFormSubmit"
          isPending={requestStatus === CAPTCHA_STATUS.PENDING}
          isSuccessful={requestStatus === CAPTCHA_STATUS.SUCCESS}
          disabled={requestStatus === CAPTCHA_STATUS.PENDING}
        >
          {t("auth:login.two-factor.verify")}
        </SubmitButton>
      </Row>
    </HookForm>
  );
};

export interface ITwoFactorCodeFormValues {
  [FIELDS.code]: string;
  [FIELDS.email]: string;
}

interface Props {
  password: string;
  email: string;
  onSubmit: (values: ITwoFactorCodeFormValues) => void;
  error: string;
  isChecking?: boolean;
}
const TwoFactorCodeForm = React.memo(_TwoFactorCodeForm);
export default TwoFactorCodeForm;
