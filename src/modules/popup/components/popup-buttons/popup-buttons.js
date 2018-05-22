import React from "react";
import Button from "../../../../components/button/button";
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
      <Button
        type="submit"
        id={submitButtonId}
        className="popup-button"
        primary
        onClick={onSubmit}
        disabled={isSubmitting}
        label={submitLabel}
      />
      <Button secondary onClick={onCancel} label="Cancel" />
    </div>
  );
};

export default PopupButtons;
