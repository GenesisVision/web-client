import React from "react";
import EmailConfirmIcon from "../../../../shared/media/email-image.svg";
import "./forgot-password-pending.css";

const ForgotPasswordPending = () => {
  return (
    <div className="forgot-password-pending">
      <img
        className="forgot-password-pending__image"
        src={EmailConfirmIcon}
        alt="Confirm email"
      />
      <div className="email-confirm-pending__text">
        We just sent you a new email.
      </div>
    </div>
  );
};

export default ForgotPasswordPending;
