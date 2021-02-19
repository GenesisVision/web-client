import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { Text } from "components/text/text";
import {
  CAPTCHA_STATUS,
  CaptchaStatusContext
} from "pages/auth/captcha-container";
import * as React from "react";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

enum FIELDS {
  code = "code",
  email = "email"
}

const _RecoveryCodeForm: React.FC<Props> = ({
  errorMessage,
  email,
  onSubmit
}) => {
  const [t] = useTranslation();
  const form = useForm<IRecoveryCodeFormValues>({
    defaultValues: {
      [FIELDS.code]: ""
    },
    mode: "onChange"
  });

  const { code } = form.watch();

  const requestStatus = useContext(CaptchaStatusContext);

  const handleSubmit = useCallback(() => {
    return onSubmit({ code, email });
  }, [code, email]);

  return (
    <HookForm form={form} onSubmit={handleSubmit}>
      <h3>{t("auth:login.recovery.title")}</h3>
      <Row>
        <Text muted>{t("auth:login.recovery.text")}</Text>
      </Row>
      <Row>
        <GVHookFormField
          name={FIELDS.code}
          placeholder="Recovery code"
          autoFocus
          component={SimpleTextField}
          rules={{
            required: t("validations.recovery-is-required")
          }}
        />
      </Row>
      {errorMessage && (
        <Row>
          <FormError error={errorMessage} />
        </Row>
      )}
      <Row>
        <SubmitButton
          id="recoverySubmit"
          isPending={requestStatus === CAPTCHA_STATUS.PENDING}
          isSuccessful={requestStatus === CAPTCHA_STATUS.SUCCESS}
          disabled={requestStatus === CAPTCHA_STATUS.PENDING}
        >
          {t("auth:login.recovery.continue")}
        </SubmitButton>
      </Row>
    </HookForm>
  );
};

interface Props {
  email: string;
  onSubmit: (data: IRecoveryCodeFormValues) => void;
  errorMessage: string;
}

export interface IRecoveryCodeFormValues {
  [FIELDS.code]: string;
  [FIELDS.email]: string;
}

const RecoveryCodeForm = React.memo(_RecoveryCodeForm);
export default RecoveryCodeForm;
