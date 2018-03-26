import React from "react";
import EmailConfirmIcon from "../../media/confirm-email-icon.svg";
import "./email-confirm-pending.css";

const EmailConfirmPending = () => {
  return (
    <div className="email-confirm-pending">
      <img
        className="email-confirm-pending__image"
        src={EmailConfirmIcon}
        alt="Confirm email"
      />
      <div className="email-confirm-pending__text">
        Please, confirm your email.
      </div>
    </div>
  );
};

export default EmailConfirmPending;
