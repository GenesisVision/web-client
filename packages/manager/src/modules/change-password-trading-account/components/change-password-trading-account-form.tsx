import { FormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React, { ComponentType, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";

import { ChangePasswordTradingAccountValidationSchema } from "./change-password-trading-account.validators";

interface IChangePasswordTradingAccountFormOwnProps {
  twoFactorEnabled: boolean;
  errorMessage: string;
  programName: string;
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
  [FORM_FIELDS.password]: string;
  [FORM_FIELDS.confirmPassword]: string;
  [FORM_FIELDS.twoFactorCode]: string;
}

type ChangePasswordTradingAccountFormProps = InjectedTranslateProps &
  IChangePasswordTradingAccountFormOwnProps &
  FormikProps<IChangePasswordTradingAccountFormValues>;

const ChangePasswordTradingAccountForm: FunctionComponent<
  ChangePasswordTradingAccountFormProps
> = ({
  t,
  dirty,
  isValid,
  programName,
  handleSubmit,
  errorMessage,
  twoFactorEnabled
}) => {
  return (
    <form id="change-password-trading-account" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("password-change-trading-account.title")}</h2>
          <p>{programName}</p>
        </div>
      </div>
      <div className="dialog__bottom">
        <GVFormikField
          component={GVTextField}
          label={t("password-change-trading-account.new-password")}
          type="password"
          name="password"
          autoComplete="off"
        />
        <GVFormikField
          component={GVTextField}
          label={t("password-change-trading-account.confirm-password")}
          type="password"
          name="confirmPassword"
          autoComplete="off"
        />
        {twoFactorEnabled && (
          <GVFormikField
            type="text"
            name="twoFactorCode"
            label={t("wallet-withdraw.two-factor-code-label")}
            autoComplete="off"
            component={GVTextField}
          />
        )}
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton type="submit" disabled={!isValid || !dirty}>
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
    displayName: "change-password-trading-account",
    mapPropsToValues: () => ({
      [FORM_FIELDS.password]: "",
      [FORM_FIELDS.confirmPassword]: "",
      [FORM_FIELDS.twoFactorCode]: ""
    }),
    validationSchema: ChangePasswordTradingAccountValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(ChangePasswordTradingAccountForm);
