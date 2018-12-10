import "./phone-verification.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { number, object } from "yup";

class PhoneVerificationForm extends Component {
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

PhoneVerificationForm.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onResendClick: PropTypes.func,
  errorMessage: PropTypes.string,
  disabledResend: PropTypes.bool
};

export default compose(
  translate(),
  withFormik({
    displayName: "phone-verification",
    mapPropsToValues: () => ({
      code: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        code: number().required(t("profile-page.verification.phone.required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.code);
    }
  })
)(PhoneVerificationForm);
