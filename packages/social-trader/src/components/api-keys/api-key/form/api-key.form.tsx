import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { HookForm } from "utils/hook-form.helpers";

import { AllowedIpsField } from "./allowed-ips-field";
import {
  ADD_API_KEY_FORM_FIELDS,
  AddApiKeyFormValidationSchema,
  IApiKeyFormValues
} from "./api-key.helpers";

export interface IApiKeyFormProps {
  submitLabel: string;
  showTitle?: boolean;
  isTwoFactorEnabled?: boolean;
  onSubmit: (values: IApiKeyFormValues) => Promise<any>;
  defaultValues?: Partial<IApiKeyFormValues>;
}

const initialValues: Partial<IApiKeyFormValues> = {
  isIpRestrict: false,
  allowedIps: [],
  isTradingEnabled: false,
  twoFactorCode: "",
  title: ""
};

const _ApiKeyForm: React.FC<IApiKeyFormProps> = ({
  submitLabel,
  showTitle,
  isTwoFactorEnabled,
  onSubmit,
  defaultValues = initialValues
}) => {
  const [t] = useTranslation();
  const form = useForm<IApiKeyFormValues>({
    defaultValues,
    validationSchema: AddApiKeyFormValidationSchema(t, showTitle),
    mode: "onChange"
  });

  const { watch, setValue } = form;

  const { isIpRestrict, allowedIps } = watch();

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      {showTitle && (
        <Row>
          <GVHookFormField
            wide
            showCorrect
            type={"text"}
            name={ADD_API_KEY_FORM_FIELDS.title}
            label={t("api-keys:key-dialog.form.title")}
            autoComplete="off"
            component={SimpleTextField}
          />
        </Row>
      )}
      <Row size={"large"}>
        <GVHookFormField
          wide
          type="checkbox"
          color="primary"
          name={ADD_API_KEY_FORM_FIELDS.isTradingEnabled}
          label={t("api-keys:key-dialog.form.isTradingEnabled")}
          component={GVCheckbox}
        />
      </Row>
      <Row size={"large"}>
        <GVHookFormField
          wide
          type="checkbox"
          color="primary"
          name={ADD_API_KEY_FORM_FIELDS.isIpRestrict}
          label={t("api-keys:key-dialog.form.ipRestricted")}
          component={GVCheckbox}
        />
      </Row>
      <Row hide={!isIpRestrict} size={"large"}>
        <AllowedIpsField
          name={ADD_API_KEY_FORM_FIELDS.allowedIps}
          value={allowedIps}
          setValue={setValue}
        />
      </Row>
      <Row size={"large"}>
        {isTwoFactorEnabled && (
          <GVHookFormField
            showCorrect
            name={ADD_API_KEY_FORM_FIELDS.twoFactorCode}
            type="tel"
            label={t("profile-page:2fa-page.google-code")}
            component={SimpleNumberField}
            autoComplete="off"
            autoFocus
            InputComponent={NumberFormat}
            allowNegative={false}
            format="######"
          />
        )}
      </Row>
      <Row wide>
        <SubmitButton wide>{submitLabel}</SubmitButton>
      </Row>
      <Row hide>
        <GVHookFormField
          wide
          showCorrect
          type={"text"}
          name={ADD_API_KEY_FORM_FIELDS.id}
          label={t("api-keys:key-dialog.form.title")}
          autoComplete="off"
          component={SimpleTextField}
        />
      </Row>
    </HookForm>
  );
};

export const ApiKeyForm = React.memo(_ApiKeyForm);
