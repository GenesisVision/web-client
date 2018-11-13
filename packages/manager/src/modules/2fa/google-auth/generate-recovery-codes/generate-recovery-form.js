import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { object, string } from "yup";

const GenerateRecoveryForm = ({ t, handleSubmit, errorMessage, disabled }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("2fa.codes.generate-recovery-codes")}</h2>
      </div>
      <form
        id="generate-recovery-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <GVFormikField
          name="password"
          type="password"
          label={t("2fa.password")}
          component={GVTextField}
          autoComplete="new-password"
        />
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            className="google-auth__button"
            variant="contained"
            color="primary"
            type="submit"
            disabled={disabled}
          >
            {t("buttons.generate")}
          </GVButton>
        </div>
      </form>
    </div>
  );
};

const GenerateRecoveryWithFormik = compose(
  translate(),
  withFormik({
    displayName: "generate-recovery-form",
    mapPropsToValues: () => ({
      password: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        password: string().required(t("2fa.password-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  })
)(GenerateRecoveryForm);

GenerateRecoveryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default GenerateRecoveryWithFormik;
