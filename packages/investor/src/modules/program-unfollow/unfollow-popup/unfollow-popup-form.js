import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

const UnfollowPopupForm = ({
  t,
  onCancel,
  twoFactorEnabled,
  handleSubmit,
  isSubmitting
}) => {
  return (
    <form id="UnfollowPopupForm" onSubmit={handleSubmit} noValidate>
      <div className="dialog__top">
        <h2>{t("program-details-page.description.unfollow-trades")}</h2>
        <div className="dialog__text">
          <p>{t("program-details-page.description.unfollow-trade-text")}</p>
        </div>
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

UnfollowPopupForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default compose(translate())(UnfollowPopupForm);
