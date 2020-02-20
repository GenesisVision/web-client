import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import { SubmitButton } from "components/submit-button/submit-button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { HookForm } from "utils/hook-form.helpers";
import { object, string } from "yup";

enum FIELDS {
  code = "code",
  password = "password"
}

export const GoogleStep3: React.FC<Props> = ({
  onSubmit,
  errorMessage,
  enablePassword = true
}) => {
  const [t] = useTranslation();

  const form = useForm<IGoogleActivateStepFormValues>({
    defaultValues: {
      [FIELDS.code]: "",
      [FIELDS.password]: ""
    },
    validationSchema: object().shape({
      [FIELDS.code]: string()
        .trim()
        .matches(
          /^\d{6}$/,
          t("auth.login.two-factor.validation.two-factor-6digits")
        )
        .required(t("2fa-page.code-required")),
      [FIELDS.password]: enablePassword
        ? string().required(t("2fa-page.password-required"))
        : string()
    }),
    mode: "onChange"
  });

  return (
    <div className="google-auth__step">
      <div className="google-auth__count">03</div>
      <div className="google-auth__title">{t("2fa-page.enter-code")}</div>
      <HookForm form={form} onSubmit={onSubmit}>
        <GVHookFormField
          showCorrect
          name={FIELDS.code}
          type="tel"
          label={t("2fa-page.google-code")}
          component={SimpleNumberField}
          autoComplete="off"
          autoFocus
          InputComponent={NumberFormat}
          allowNegative={false}
          format="######"
        />
        {enablePassword && (
          <GVHookFormField
            name={FIELDS.password}
            type="password"
            label={t("2fa-page.password")}
            component={SimpleNumberField}
            autocomplete="new-password"
          />
        )}
        <div className="form-error">{errorMessage}</div>
        <SubmitButton
          className="google-auth__button"
          isSuccessful={!errorMessage}
        >
          {t("buttons.activate")}
        </SubmitButton>
      </HookForm>
    </div>
  );
};

interface Props {
  enablePassword?: boolean;
  onSubmit(twoFactorCode: IGoogleActivateStepFormValues): void;
  errorMessage?: string;
}
export interface IGoogleActivateStepFormValues {
  [FIELDS.code]: string;
  [FIELDS.password]: string;
}

const GoogleActivateStep = React.memo(GoogleStep3);
export default GoogleActivateStep;
