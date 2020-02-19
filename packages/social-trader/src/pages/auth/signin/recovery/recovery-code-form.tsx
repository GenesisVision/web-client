import FormError from "components/form/form-error/form-error";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import * as React from "react";
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
      [FIELDS.code]: "",
      [FIELDS.email]: email
    },
    validationSchema: object().shape({
      [FIELDS.code]: string()
        .trim()
        .required(t("auth.login.recovery.validation.recovery-is-required"))
    }),
    mode: "onChange"
  });
  const {
    formState: { isValid, dirty, isSubmitting, isSubmitted }
  } = form;

  const isSuccessful = isSubmitted && !errorMessage;
  const disabled = !isValid || !dirty || isSubmitting || isSuccessful;

  return (
    <HookForm className="recovery-form" form={form} onSubmit={onSubmit}>
      <h3>{t("auth.login.recovery.title")}</h3>
      <p className="recovery-form__text">{t("auth.login.recovery.text")}</p>
      <GVHookFormField
        name={FIELDS.code}
        placeholder="Recovery code"
        autoFocus
        component={SimpleTextField}
      />
      <FormError error={errorMessage} />
      <GVButton
        id="recoverySubmit"
        isPending={isSubmitting}
        isSuccessful={isSuccessful}
        disabled={disabled}
        type="submit"
        className="recovery-form__submit"
      >
        {t("auth.login.recovery.continue")}
      </GVButton>
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
