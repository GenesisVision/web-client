import "./phone-verification.scss";

import { FormikProps, withFormik } from "formik";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";
import { number, object } from "yup";

class _PhoneVerificationForm extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.onResendClick();
  }

  render() {
    const { phoneNumber, t, handleSubmit, isSubmitting } = this.props;
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
            name={FIELDS.code}
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
            <GVButton type="submit" disabled={isSubmitting}>
              {t("buttons.confirm")}
            </GVButton>
          </div>
        </div>
      </form>
    );
  }
}

enum FIELDS {
  code = "code"
}

interface FormValues {
  [FIELDS.code]: string;
}

interface FormProps extends FormikProps<FormValues> {}

interface OwnProps {
  phoneNumber: string;
  errorMessage?: string;
  onResendClick(): void;
  disabledResend?: boolean;
  onSubmit(code: string, setSubmitting: SetSubmittingType): void;
}

interface Props extends WithTranslation, OwnProps, FormProps {}

const PhoneVerificationForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, FormValues>({
    displayName: "phone-verification",
    mapPropsToValues: () => ({
      [FIELDS.code]: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        [FIELDS.code]: number().required(
          props.t("profile-page.verification.phone.required")
        )
      }),
    handleSubmit: (values, bag) => {
      bag.props.onSubmit(values[FIELDS.code], bag.setSubmitting);
    }
  })
)(_PhoneVerificationForm);

export default PhoneVerificationForm;
