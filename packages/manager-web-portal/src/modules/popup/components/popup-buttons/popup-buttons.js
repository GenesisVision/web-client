import "./popup-buttons.css";

import React from "react";

import Button from "../../../../components/button/button";

const PopupButtons = ({
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
  submitButtonId
}) => {
  return (
    <div className="popup-buttons">
      <Button
        label={submitLabel}
        type="submit"
        id={submitButtonId}
        className="popup-button"
        primary
        onClick={onSubmit}
        disabled={isSubmitting}
      />
      <Button
        label="Cancel"
        className="popup-button"
        secondary
        onClick={onCancel}
      />
    </div>
  );
};

export default PopupButtons;
