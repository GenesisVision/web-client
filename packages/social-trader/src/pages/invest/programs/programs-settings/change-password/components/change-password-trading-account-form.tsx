import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { twoFactorRules } from "utils/validators/validators";

import { ChangePasswordTradingAccountValidationSchema } from "./change-password-trading-account.validators";

enum FORM_FIELDS {
  password = "password",
  confirmPassword = "confirmPassword",
  twoFactorCode = "twoFactorCode"
}

const _ChangePasswordTradingAccountForm: React.FC<ChangePasswordTradingAccountFormProps> = ({
  onSubmit,
  programName,
  errorMessage,
  twoFactorEnabled
}) => {
  const [t] = useTranslation();
  const form = useForm<IChangePasswordTradingAccountFormValues>({
    defaultValues: {
      [FORM_FIELDS.password]: "",
      [FORM_FIELDS.confirmPassword]: "",
      [FORM_FIELDS.twoFactorCode]: ""
    },
    validationSchema: ChangePasswordTradingAccountValidationSchema({
      t,
      twoFactorEnabled
    }),
    mode: "onBlur"
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <DialogTop
        title={t("asset-settings:password-change-trading-account.title")}
        subtitle={programName}
      />
      <DialogBottom>
        <Row onlyOffset>
          <GVHookFormField
            validateOnInput={false}
            wide
            component={SimpleTextField}
            label={t(
              "asset-settings:password-change-trading-account.new-password"
            )}
            type="password"
            name={FORM_FIELDS.password}
            autoComplete="off"
          />
        </Row>
        <Row onlyOffset>
          <GVHookFormField
            wide
            component={SimpleTextField}
            label={t(
              "asset-settings:password-change-trading-account.confirm-password"
            )}
            type="password"
            name={FORM_FIELDS.confirmPassword}
            autoComplete="off"
          />
        </Row>
        {twoFactorEnabled && (
          <Row onlyOffset>
            <GVHookFormField
              wide
              type="text"
              name={FORM_FIELDS.twoFactorCode}
              label={t("labels.two-factor-code-label")}
              autoComplete="off"
              component={SimpleTextField}
              rules={twoFactorRules(t)}
            />
          </Row>
        )}
        {errorMessage && (
          <Row>
            <FormError error={errorMessage} />
          </Row>
        )}
        <DialogButtons>
          <SubmitButton wide isSuccessful={!errorMessage}>
            {t("buttons.confirm")}
          </SubmitButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

interface ChangePasswordTradingAccountFormProps {
  twoFactorEnabled: boolean;
  errorMessage: string;
  programName: string;
  onSubmit(values: IChangePasswordTradingAccountFormValues): void;
}

export interface IChangePasswordTradingAccountFormValues {
  [FORM_FIELDS.password]: string;
  [FORM_FIELDS.confirmPassword]: string;
  [FORM_FIELDS.twoFactorCode]: string;
}

const ChangePasswordTradingAccountForm = React.memo(
  _ChangePasswordTradingAccountForm
);
export default ChangePasswordTradingAccountForm;
