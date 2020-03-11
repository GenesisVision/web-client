import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import { CreateExternalAccountFormValidationSchema } from "./follow-popup-create-account.validators";

export enum CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS {
  secret = "secret",
  key = "key"
}

const _FollowCreateExternalAccount: React.FC<CreateAccountFormProps> = ({
  onClick
}) => {
  const [t] = useTranslation();

  const form = useForm<CreateAccountFormValues>({
    validationSchema: CreateExternalAccountFormValidationSchema({
      t
    }),
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={onClick}>
      <DialogBottom>
        <DialogField>
          <GVHookFormField
            wide
            type="text"
            name={CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.key}
            label={t("attach-account-page.settings.fields.api-key")}
            autoComplete="off"
            component={SimpleTextField}
          />
        </DialogField>
        <DialogField>
          <GVHookFormField
            wide
            type="text"
            name={CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.secret}
            label={t("attach-account-page.settings.fields.api-secret")}
            autoComplete="off"
            component={SimpleTextField}
          />
        </DialogField>
        <DialogButtons>
          <SubmitButton wide className="invest-form__submit-button">
            {t("follow-program.create-account.next")}
          </SubmitButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

interface CreateAccountFormProps {
  onClick: (values: CreateAccountFormValues) => void;
}

export interface CreateAccountFormValues {
  [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.secret]: string;
  [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.key]: string;
}

const FollowCreateExternalAccount = React.memo(_FollowCreateExternalAccount);
export default FollowCreateExternalAccount;
