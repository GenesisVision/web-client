import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  GoogleAuthStepContainer,
  GoogleAuthStepCount,
  GoogleAuthStepTitle
} from "modules/2fa/google-auth/google-auth-steps/google-auth-steps.styles";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { HookForm } from "utils/hook-form.helpers";
import { twoFactorRules } from "utils/validators/validators";

enum FIELDS {
  code = "code",
  password = "password"
}

interface Props {
  mobile?: boolean;
  enablePassword?: boolean;
  onSubmit: (twoFactorCode: IGoogleActivateStepFormValues) => void;
  errorMessage?: string;
}
export interface IGoogleActivateStepFormValues {
  [FIELDS.code]: string;
  [FIELDS.password]: string;
}

export const GoogleStep3: React.FC<Props> = ({
  mobile,
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
    mode: "onChange"
  });

  return (
    <GoogleAuthStepContainer mobile={mobile}>
      <GoogleAuthStepCount>03</GoogleAuthStepCount>
      <GoogleAuthStepTitle>
        {t("profile-page:2fa-page.enter-code")}
      </GoogleAuthStepTitle>
      <HookForm form={form} onSubmit={onSubmit}>
        <Row>
          <GVHookFormField
            showCorrect
            name={FIELDS.code}
            type="tel"
            label={t("profile-page:2fa-page.google-code")}
            component={SimpleNumberField}
            autoComplete="off"
            autoFocus
            InputComponent={NumberFormat}
            allowNegative={false}
            format="######"
            rules={twoFactorRules(t)}
          />
        </Row>
        {enablePassword && (
          <Row>
            <GVHookFormField
              name={FIELDS.password}
              type="password"
              label={t("profile-page:2fa-page.password")}
              component={SimpleTextField}
              autocomplete="new-password"
              rules={{
                required: t("profile-page:2fa-page.password-required")
              }}
            />
          </Row>
        )}
        {errorMessage && (
          <Row>
            <FormError error={errorMessage} />
          </Row>
        )}
        <Row>
          <SubmitButton isSuccessful={!errorMessage}>
            {t("buttons.activate")}
          </SubmitButton>
        </Row>
      </HookForm>
    </GoogleAuthStepContainer>
  );
};

const GoogleActivateStep = React.memo(GoogleStep3);
export default GoogleActivateStep;
