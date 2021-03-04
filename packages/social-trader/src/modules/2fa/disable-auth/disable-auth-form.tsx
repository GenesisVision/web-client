import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import useTab from "hooks/tab.hook";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { twoFactorRules } from "utils/validators/validators";

enum FIELDS {
  recoveryCode = "recoveryCode",
  twoFactorCode = "twoFactorCode",
  password = "password"
}

enum TAB {
  TFA = "TFA",
  RECOVERY = "RECOVERY"
}

const _DisableAuthForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const [t] = useTranslation();

  const { tab, setTab } = useTab<TAB>(TAB.TFA);

  const form = useForm<IDisableAuthFormFormValues>({
    defaultValues: {
      [FIELDS.recoveryCode]: "",
      [FIELDS.twoFactorCode]: "",
      [FIELDS.password]: ""
    },
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <DialogTop title={t("profile-page:2fa-page.disable.title")} />
      <DialogBottom>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={TAB.TFA} label={t("profile-page:2fa-page.tabs.tfa")} />
          <GVTab
            value={TAB.RECOVERY}
            label={t("profile-page:2fa-page.tabs.recovery")}
          />
        </GVTabs>
        <Row onlyOffset>
          {tab === TAB.TFA && (
            <GVHookFormField
              wide
              name={FIELDS.twoFactorCode}
              type="tel"
              label={t("profile-page:2fa-page.google-code")}
              component={SimpleTextField}
              autoComplete="off"
              allowNegative={false}
              format="######"
              rules={twoFactorRules(t)}
            />
          )}
          {tab === TAB.RECOVERY && (
            <GVHookFormField
              wide
              name={FIELDS.recoveryCode}
              type="tel"
              label={t("profile-page:2fa-page.tabs.recovery")}
              component={SimpleTextField}
              autoComplete="off"
              allowNegative={false}
              format="######"
              rules={twoFactorRules(t)}
            />
          )}
        </Row>
        <Row onlyOffset>
          <GVHookFormField
            wide
            name={FIELDS.password}
            type="password"
            label={t("profile-page:2fa-page.password")}
            component={SimpleTextField}
            autoComplete="new-password"
            rules={{
              required: t("profile-page:2fa-page.password-required")
            }}
          />
        </Row>
        {errorMessage && (
          <Row>
            <FormError error={errorMessage} />
          </Row>
        )}
        <Row size={"large"}>
          <DialogButtons>
            <SubmitButton wide isSuccessful={!errorMessage}>
              {t("buttons.disable")}
            </SubmitButton>
          </DialogButtons>
        </Row>
      </DialogBottom>
    </HookForm>
  );
};

interface Props {
  errorMessage?: string;
  onSubmit: (twoFactorCode: IDisableAuthFormFormValues) => void;
}

export interface IDisableAuthFormFormValues {
  [FIELDS.recoveryCode]: string;
  [FIELDS.twoFactorCode]: string;
  [FIELDS.password]: string;
}

const DisableAuthForm = React.memo(_DisableAuthForm);
export default DisableAuthForm;
