import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { number, object, string } from "yup";

export const GoogleStep3 = ({ t, handleSubmit, errorMessage, disabled }) => {
  return (
    <div className="google-auth__step">
      <div className="google-auth__count">03</div>
      <div className="google-auth__title">{t("2fa.enter-code")}</div>
      <form id="google-auth" onSubmit={handleSubmit}>
        <GVFormikField
          name="code"
          label={t("2fa.google-code")}
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
          className="google-auth__button"
          variant="contained"
          color="primary"
          type="submit"
          disabled={disabled}
        >
          {t("buttons.activate")}
        </GVButton>
      </form>
    </div>
  );
};

const GoogleActivateStep = compose(
  translate(),
  withFormik({
    displayName: "google-auth",
    mapPropsToValues: () => ({
      code: "",
      password: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        code: number().required(t("2fa.code-required")),
        password: string().required(t("2fa.password-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  })
)(GoogleStep3);

GoogleActivateStep.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default GoogleActivateStep;
