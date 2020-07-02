import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { passwordValidator } from "utils/validators/validators";
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
      [FIELDS.password]: passwordValidator(t),
      [FIELDS.confirmPassword]: string()
        .oneOf(
          [ref(FIELDS.password)],
          t("auth:password-restore.validators.password-dont-match")
        )
        .required(
          t("auth:password-restore.validators.confirm-password-required")
        )
    }),
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <GVHookFormField
        wide
        showCorrect
        type="password"
        name={FIELDS.password}
        label={t("auth:password-restore.new-password.password-field-text")}
        component={SimpleTextField}
      />
      <Row onlyOffset>
        <GVHookFormField
          wide
          showCorrect
          type="password"
          name={FIELDS.confirmPassword}
          label={t(
            "auth:password-restore.new-password.password-confirm-field-text"
          )}
          component={SimpleTextField}
        />
      </Row>
      {errorMessage && (
        <Row>
          <FormError error={errorMessage} />
        </Row>
      )}
      <Row size={"xlarge"}>
        <SubmitButton id="passwordRestoreSubmit" isSuccessful={!errorMessage}>
          {t("auth:password-restore.new-password.confirm-button-text")}
        </SubmitButton>
      </Row>
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
