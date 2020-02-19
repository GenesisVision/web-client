import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { PasswordModel } from "gv-api-web";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object, string } from "yup";

enum FIELDS {
  password = "password"
}

const _GenerateRecoveryForm: React.FC<Props> = ({ errorMessage, onSubmit }) => {
  const [t] = useTranslation();

  const form = useForm<IFormValues>({
    defaultValues: {
      [FIELDS.password]: ""
    },
    validationSchema: object().shape({
      [FIELDS.password]: string().required(t("2fa-page.password-required"))
    }),
    mode: "onChange"
  });
  const {
    formState: { isSubmitting, isValid, dirty, isSubmitted }
  } = form;

  const isSuccessful = isSubmitted && !errorMessage;
  const disabled = !isValid || !dirty || isSubmitting || isSuccessful;

  return (
    <>
      <DialogTop title={t("2fa-page.codes.generate-recovery-codes")} />
      <DialogBottom>
        <HookForm form={form} onSubmit={onSubmit}>
          <GVHookFormField
            name={FIELDS.password}
            type="password"
            label={t("2fa-page.password")}
            component={SimpleTextField}
            autoComplete="new-password"
          />
          <DialogError error={errorMessage} />
          <DialogButtons>
            <GVButton
              wide
              className="google-auth__button"
              variant="contained"
              color="primary"
              type="submit"
              isPending={isSubmitting}
              isSuccessful={isSuccessful}
              disabled={disabled}
            >
              {t("buttons.generate")}
            </GVButton>
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
