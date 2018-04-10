import React from "react";

import "./popup-buttons.css";

const PopupButtons = ({
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
  submitButtonId
}) => {
  return (
    <div className="popup-buttons">
      <button
        type="submit"
        id={submitButtonId}
        className="popup-button gv-btn gv-btn-primary"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {submitLabel}
      </button>
      <button
        className="popup-button gv-btn gv-btn-secondary"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default PopupButtons;
