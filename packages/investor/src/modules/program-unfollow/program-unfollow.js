import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";

const ProgramUnfollow = ({ t, open, onCancel, onApply }) => {
  return (
    <ConfirmPopup
      open={open}
      onClose={onCancel}
      onCancel={onCancel}
      onApply={onApply}
      header={t("unfollow-program.title")}
      body={t("unfollow-program.text")}
      applyButtonText={t("buttons.confirm")}
      className="dialog--wider"
    />
  );
};

ProgramUnfollow.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default compose(translate())(ProgramUnfollow);
