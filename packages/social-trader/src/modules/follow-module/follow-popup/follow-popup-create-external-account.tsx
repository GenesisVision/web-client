import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

export enum CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS {
  secret = "secret",
  key = "key"
}

const _FollowCreateExternalAccount: React.FC<CreateAccountFormProps> = ({
  onClick
}) => {
  const [t] = useTranslation();

  const form = useForm<CreateAccountFormValues>({
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={onClick}>
      <DialogBottom>
        <Row>
          <GVHookFormField
            wide
            type="text"
            name={CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.key}
            label={t("asset-settings:fields.api-key")}
            autoComplete="off"
            component={SimpleTextField}
            rules={{
              required: t("validations.api-key")
            }}
          />
        </Row>
        <Row>
          <GVHookFormField
            wide
            type="text"
            name={CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.secret}
            label={t("asset-settings:fields.api-secret")}
            autoComplete="off"
            component={SimpleTextField}
            rules={{
              required: t("validations.api-secret")
            }}
          />
        </Row>
        <DialogButtons>
          <SubmitButton wide>
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
