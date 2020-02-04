import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { FormikProps, withFormik } from "formik";
import * as React from "react";
import { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

import { CreateExternalAccountFormValidationSchema } from "./follow-popup-create-account.validators";

const _FollowCreateExternalAccount: React.FC<CreateAccountFormProps> = ({
  onClick,
  isValid,
  dirty,
  t,
  values
}) => {
  const disableButton = !dirty || !isValid;
  const handleNext = useCallback(() => onClick(values), [onClick, values]);
  return (
    <form id="follow-create-account">
      <DialogBottom>
        <DialogField>
          <GVFormikField
            wide
            type="text"
            name={CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.key}
            label={t("attach-account-page.settings.fields.api-key")}
            autoComplete="off"
            component={GVTextField}
          />
        </DialogField>
        <DialogField>
          <GVFormikField
            wide
            type="text"
            name={CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.secret}
            label={t("attach-account-page.settings.fields.api-secret")}
            autoComplete="off"
            component={GVTextField}
          />
        </DialogField>
        <DialogButtons>
          <GVButton
            wide
            onClick={handleNext}
            className="invest-form__submit-button"
            disabled={disableButton}
          >
            {t("follow-program.create-account.next")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

export enum CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS {
  secret = "secret",
  key = "key"
}

interface OwnProps {
  onClick: (values: CreateAccountFormValues) => void;
}

export interface CreateAccountFormValues {
  [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.secret]: string;
  [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.key]: string;
}

export interface CreateAccountFormProps
  extends OwnProps,
    WithTranslation,
    FormikProps<CreateAccountFormValues> {}

const FollowCreateExternalAccount = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik({
    displayName: "follow-create-account",
    mapPropsToValues: () => ({
      [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.secret]: "",
      [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.key]: ""
    }),
    validationSchema: CreateExternalAccountFormValidationSchema,
    handleSubmit: () => {}
  }),
  React.memo
)(_FollowCreateExternalAccount);
export default FollowCreateExternalAccount;
