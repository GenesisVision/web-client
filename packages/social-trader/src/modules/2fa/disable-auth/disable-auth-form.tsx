import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogTop } from "components/dialog/dialog-top";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { number, object, string } from "yup";

enum FIELDS {
  twoFactorCode = "twoFactorCode",
  password = "password"
}

const _DisableAuthForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const [t] = useTranslation();

  const form = useForm<IDisableAuthFormFormValues>({
    defaultValues: {
      [FIELDS.twoFactorCode]: "",
      [FIELDS.password]: ""
    },
    validationSchema: object().shape({
      [FIELDS.twoFactorCode]: number().required(t("2fa-page.code-required")),
      [FIELDS.password]: string().required(t("2fa-page.password-required"))
    }),
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <DialogTop title={t("2fa-page.disable.title")} />
      <DialogBottom>
        <GVHookFormField
          name={FIELDS.twoFactorCode}
          type="tel"
          label={t("2fa-page.google-code")}
          component={SimpleTextField}
          autoComplete="off"
          allowNegative={false}
          format="######"
        />
        <GVHookFormField
          name={FIELDS.password}
          type="password"
          label={t("2fa-page.password")}
          component={SimpleTextField}
          autoComplete="new-password"
        />
        <DialogError error={errorMessage} />
        <DialogButtons>
          <SubmitButton
            wide
            className="google-auth__button"
            isSuccessful={!errorMessage}
          >
            {t("buttons.disable")}
          </SubmitButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

interface Props {
  errorMessage?: string;
  onSubmit: (twoFactorCode: IDisableAuthFormFormValues) => void;
}

export interface IDisableAuthFormFormValues {
  [FIELDS.twoFactorCode]: string;
  [FIELDS.password]: string;
}

const DisableAuthForm = React.memo(_DisableAuthForm);
export default DisableAuthForm;
