import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  CAPTCHA_STATUS,
  CaptchaStatusContext
} from "pages/auth/captcha-container";
import * as React from "react";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object, string } from "yup";

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
    validationSchema: object().shape({
      [FIELDS.code]: string()
        .trim()
        .required(t("auth.login.recovery.validation.recovery-is-required"))
    }),
    mode: "onChange"
  });

  const { code } = form.watch();

  const requestStatus = useContext(CaptchaStatusContext);

  const handleSubmit = useCallback(() => {
    onSubmit({ code, email });
  }, [code, email]);

  return (
    <HookForm className="recovery-form" form={form} onSubmit={handleSubmit}>
      <h3>{t("auth.login.recovery.title")}</h3>
      <p className="recovery-form__text">{t("auth.login.recovery.text")}</p>
      <GVHookFormField
        name={FIELDS.code}
        placeholder="Recovery code"
        autoFocus
        component={SimpleTextField}
      />
      <FormError error={errorMessage} />
      <SubmitButton
        id="recoverySubmit"
        isPending={requestStatus === CAPTCHA_STATUS.PENDING}
        isSuccessful={requestStatus === CAPTCHA_STATUS.SUCCESS}
        disabled={requestStatus === CAPTCHA_STATUS.PENDING}
        className="recovery-form__submit"
      >
        {t("auth.login.recovery.continue")}
      </SubmitButton>
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
