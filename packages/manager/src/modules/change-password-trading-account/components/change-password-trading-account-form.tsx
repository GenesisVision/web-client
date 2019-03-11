import { FormikProps, withFormik } from "formik";
import { GVButton } from "gv-react-components";
import SignalsFeeFormPartial from "pages/create-program/components/create-program-settings/signals-fee-form.partial";
import React, { ComponentType, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";

import { ChangePasswordTradingAccountValidationSchema } from "./change-password-trading-account.validators";

interface IChangePasswordTradingAccountFormOwnProps {
  twoFactorEnabled: boolean;
  errorMessage: string;
  onSubmit(
    values: IChangePasswordTradingAccountFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ): void;
}

enum FORM_FIELDS {
  password = "password",
  confirmPassword = "confirmPassword",
  twoFactorCode = "twoFactorCode"
}

export interface IChangePasswordTradingAccountFormValues {
  [FORM_FIELDS.password]?: string;
  [FORM_FIELDS.confirmPassword]?: string;
  [FORM_FIELDS.twoFactorCode]?: string;
}

type ChangePasswordTradingAccountFormProps = InjectedTranslateProps &
  IChangePasswordTradingAccountFormOwnProps &
  FormikProps<IChangePasswordTradingAccountFormValues>;

const ChangePasswordTradingAccountForm: FunctionComponent<
  ChangePasswordTradingAccountFormProps
> = ({ t, dirty, handleSubmit, errorMessage }) => {
  return (
    <form id="change-password-trading-account" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("program-details-page.description.signal-provider.title")}</h2>
        </div>
      </div>
      <div className="dialog__bottom">
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            id="programMakeSignalSubmit"
            disabled={!dirty}
          >
            {t("buttons.confirm")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

export default compose<
  ComponentType<IChangePasswordTradingAccountFormOwnProps>
>(
  translate(),
  withFormik<
    IChangePasswordTradingAccountFormOwnProps,
    IChangePasswordTradingAccountFormValues
  >({
    displayName: "make-signal-form",
    mapPropsToValues: () => ({
      [FORM_FIELDS.password]: undefined,
      [FORM_FIELDS.confirmPassword]: undefined,
      [FORM_FIELDS.twoFactorCode]: undefined
    }),
    validationSchema: ChangePasswordTradingAccountValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(ChangePasswordTradingAccountForm);
