import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { object, string } from "yup";

const UnfollowTradesForm = ({
  t,
  onCancel,
  twoFactorEnabled,
  handleSubmit,
  isSubmitting,
  errorMessage
}) => {
  return (
    <form id="UnfollowTradesForm" onSubmit={handleSubmit} noValidate>
      <div className="dialog__top">
        <h2>{t("program-details-page.description.close-program")}</h2>
        <div className="dialog__text">
          <p>
            {t("program-details-page.description.close-program-notification")}
          </p>
        </div>
        {errorMessage && <div className="form-error">{errorMessage}</div>}
        <div className="dialog__buttons">
          <GVButton type="submit" disabled={isSubmitting}>
            {t("buttons.confirm")}
          </GVButton>
          <GVButton
            color="secondary"
            variant="outlined"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            {t("buttons.cancel")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

UnfollowTradesForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default compose(
  translate(),
  withFormik({
    displayName: "unfollow-trades",
    handleSubmit: ({ props, setSubmitting }) => {
      props.onSubmit(setSubmitting);
    }
  })
)(UnfollowTradesForm);
