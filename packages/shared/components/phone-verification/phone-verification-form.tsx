import "./phone-verification.scss";

import { FormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { number, object } from "yup";

export interface IPhoneVerificationFormValues {
  code: string;
}

export interface IPhoneVerificationFormProps {
  phoneNumber: string;
  errorMessage?: string;
  onResendClick?(): void;
  disabledResend?: boolean;
  onSubmit(code: string): void;
}

class PhoneVerificationForm extends React.Component<
  IPhoneVerificationFormProps &
    WithTranslation &
    IPhoneVerificationFormValues &
    FormikProps<IPhoneVerificationFormValues>
> {
  componentDidMount() {
    this.props.onResendClick();
  }

  render() {
    const { phoneNumber, t, handleSubmit } = this.props;
    return (
      <form
        id="phone-verification"
        className="phone-verification"
        onSubmit={handleSubmit}
      >
        <div className="dialog__top">
          <div className="dialog__title">
            <h2>{t("profile-page.verification.phone.title")}</h2>
            <p>{t("profile-page.verification.phone.description")}</p>
          </div>
          <div className="gv-text-field__wrapper">
            <label className="gv-text-field__label gv-text-field__label--shrink">
              {t("profile-page.verification.phone.number")}
            </label>
            <div className="gv-text-field wallet-add-funds-popup__will-get">
              <div className="gv-text-field__input dialog-field__value">
                {phoneNumber}
              </div>
            </div>
          </div>
        </div>
        <div className="dialog__bottom">
          <GVFormikField
            className="phone-verification__code"
            name="code"
            label={t("profile-page.verification.phone.code")}
            component={GVTextField}
            adornment={
              <GVButton
                variant="text"
                onClick={this.props.onResendClick}
                disabled={this.props.disabledResend}
              >
                {t("profile-page.verification.phone.resend")}
              </GVButton>
            }
            autoComplete="off"
            InputComponent={NumberFormat}
            allowNegative={false}
          />
          <div className="form-error">{this.props.errorMessage}</div>
          <div className="dialog__buttons">
            <GVButton type="submit">{t("buttons.confirm")}</GVButton>
          </div>
        </div>
      </form>
    );
  }
}

export default compose<React.ComponentType<IPhoneVerificationFormProps>>(
  withTranslation(),
  withFormik({
    displayName: "phone-verification",
    mapPropsToValues: () => ({
      code: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        code: number().required(t("profile-page.verification.phone.required"))
      }),
    handleSubmit: (
      values,
      { props }: { props: IPhoneVerificationFormProps }
    ) => {
      props.onSubmit(values.code);
    }
  })
)(PhoneVerificationForm);
