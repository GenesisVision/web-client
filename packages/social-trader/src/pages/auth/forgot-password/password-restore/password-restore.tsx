import FormError from "components/form/form-error/form-error";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object, ref, string } from "yup";

enum FIELDS {
  password = "password",
  confirmPassword = "confirmPassword"
}

const _RestorePassword: React.FC<Props> = ({ errorMessage, onSubmit }) => {
  const [t] = useTranslation();
  const form = useForm<IRestorePasswordFormValues>({
    defaultValues: {
      [FIELDS.password]: "",
      [FIELDS.confirmPassword]: ""
    },
    validationSchema: object().shape({
      [FIELDS.password]: string()
        .min(6, t("auth.password-restore.validators.password-weak"))
        .required(t("auth.password-restore.validators.password-required")),
      [FIELDS.confirmPassword]: string()
        .oneOf(
          [ref(FIELDS.password)],
          t("auth.password-restore.validators.password-dont-match")
        )
        .required(
          t("auth.password-restore.validators.confirm-password-required")
        )
    }),
    mode: "onChange"
  });

  const {
    formState: { isValid, dirty, isSubmitting, isSubmitted }
  } = form;

  const isSuccessful = isSubmitted && !errorMessage;
  const disabled = !isValid || !dirty || isSubmitting || isSuccessful;
  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <GVHookFormField
        type="password"
        name={FIELDS.password}
        label={t("auth.password-restore.new-password.password-field-text")}
        component={SimpleTextField}
      />
      <GVHookFormField
        type="password"
        name={FIELDS.confirmPassword}
        label={t(
          "auth.password-restore.new-password.password-confirm-field-text"
        )}
        component={SimpleTextField}
      />
      <FormError error={errorMessage} />
      <div className="password-restore__navigation">
        <GVButton
          type="submit"
          id="passwordRestoreSubmit"
          isPending={isSubmitting}
          isSuccessful={isSuccessful}
          disabled={disabled}
        >
          {t("auth.password-restore.new-password.confirm-button-text")}
        </GVButton>
      </div>
    </HookForm>
  );
};

interface Props {
  errorMessage?: string;
  onSubmit: (data: IRestorePasswordFormValues) => void;
}

export interface IRestorePasswordFormValues {
  password: string;
  confirmPassword: string;
}

const RestorePassword = React.memo(_RestorePassword);
export default RestorePassword;
