import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogTop } from "components/dialog/dialog-top";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { PasswordModel } from "gv-api-web";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

enum FIELDS {
  password = "password"
}

const _GenerateRecoveryForm: React.FC<Props> = ({ errorMessage, onSubmit }) => {
  const [t] = useTranslation();

  const form = useForm<IFormValues>({
    defaultValues: {
      [FIELDS.password]: ""
    },
    mode: "onChange"
  });

  return (
    <>
      <DialogTop
        title={t("profile-page:2fa-page.codes.generate-recovery-codes")}
      />
      <DialogBottom>
        <HookForm form={form} onSubmit={onSubmit}>
          <GVHookFormField
            wide
            name={FIELDS.password}
            type="password"
            label={t("profile-page:2fa-page.password")}
            component={SimpleTextField}
            autoComplete="new-password"
            rules={{ required: t("profile-page:2fa-page.password-required") }}
          />
          {errorMessage && <DialogError error={errorMessage} />}
          <DialogButtons>
            <SubmitButton wide isSuccessful={!errorMessage}>
              {t("buttons.generate")}
            </SubmitButton>
          </DialogButtons>
        </HookForm>
      </DialogBottom>
    </>
  );
};

interface Props {
  errorMessage?: string;
  onSubmit: (twoFactorCode: IFormValues) => void;
}
interface IFormValues extends PasswordModel {}

const GenerateRecoveryForm = React.memo(_GenerateRecoveryForm);
export default GenerateRecoveryForm;
