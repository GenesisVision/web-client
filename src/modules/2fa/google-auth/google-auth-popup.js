import "./google-auth-popup.scss";

import Dialog from "components/dialog/dialog";
import GoogleAuthContainer from "modules/2fa/google-auth/google-auth-container";
import PropTypes from "prop-types";
import React from "react";

const GoogleAuthPopup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} className="google-auth">
      <GoogleAuthContainer />
    </Dialog>
  );
};

GoogleAuthPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default GoogleAuthPopup;
