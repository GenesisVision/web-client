import "./email-confirm-pending.css";

import React from "react";
import EmailConfirmIcon from "shared/media/email-image.svg";

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
