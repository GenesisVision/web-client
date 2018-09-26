import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { number, object, string } from "yup";

const DisableAuth = ({ t, handleSubmit, errorMessage, disabled }) => {
  return (
    <form id="disable-auth" onSubmit={handleSubmit} className="dialog__top">
      <GVFormikField
        name="twoFactorCode"
        label={t("2fa.2fa-code")}
        component={GVTextField}
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
        format="######"
      />
      <GVFormikField
        name="password"
        type="password"
        label={t("2fa.password")}
        component={GVTextField}
        autoComplete="off"
      />
      {errorMessage}
      <GVButton
        variant="contained"
        color="primary"
        type="submit"
        disabled={disabled}
      >
        {t("buttons.disable")}
      </GVButton>
    </form>
  );
};

const DisableAuthForm = compose(
  translate(),
  withFormik({
    displayName: "disable-auth",
    mapPropsToValues: () => ({
      twoFactorCode: "",
      password: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        twoFactorCode: number().required(t("2fa.2fa-required")),
        password: string().required(t("2fa.password-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  })
)(DisableAuth);

DisableAuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool
};

export default DisableAuthForm;
