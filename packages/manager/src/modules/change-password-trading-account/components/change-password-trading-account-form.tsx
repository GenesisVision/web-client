import { FormikProps, withFormik } from "formik";
import { GVButton } from "gv-react-components";
import SignalsFeeFormPartial from "pages/create-program/components/create-program-settings/signals-fee-form.partial";
import React, { ComponentType, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";

import { ChangePasswordTradingAccountValidationSchema } from "./change-password-trading-account.validators";

interface IChangePasswordTradingAccountFormOwnProps {
  programName: string;
  errorMessage: string;
  onSubmit(
    values: IChangePasswordTradingAccountFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ): void;
}

enum FORM_FIELDS {
  successFee = "successFee",
  subscriptionFee = "subscriptionFee"
}

export interface IChangePasswordTradingAccountFormValues {
  [FORM_FIELDS.successFee]?: number;
  [FORM_FIELDS.subscriptionFee]?: number;
}

type ChangePasswordTradingAccountFormProps = InjectedTranslateProps &
  IChangePasswordTradingAccountFormOwnProps &
  FormikProps<IChangePasswordTradingAccountFormValues>;
const ChangePasswordTradingAccountForm: FunctionComponent<
  ChangePasswordTradingAccountFormProps
> = ({ t, dirty, handleSubmit, programName, errorMessage }) => {
  return (
    <form id="change-password-trading-account" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("program-details-page.description.signal-provider.title")}</h2>
          <p>{programName}</p>
        </div>
      </div>
      <div className="dialog__bottom">
        <SignalsFeeFormPartial
          subscriptionFeeFieldName={FORM_FIELDS.subscriptionFee}
          successFeeFieldName={FORM_FIELDS.successFee}
          maxEntryFee={100}
          maxSuccessFee={50}
          hasSubscriptionFeeAutofocus={true}
        />
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
      [FORM_FIELDS.successFee]: undefined,
      [FORM_FIELDS.subscriptionFee]: undefined
    }),
    validationSchema: ChangePasswordTradingAccountValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(ChangePasswordTradingAccountForm);
