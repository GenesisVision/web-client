import { connect } from "react-redux";
import React from "react";

import Popup from "./popup/popup";
import popupActions from "../actions/popup-actions";

const PopupContainer = ({ isOpen, popupType, popupProps, onClosePopup }) => {
  if (!popupType) {
    return null;
  }

  return (
    <Popup
      isOpen={isOpen}
      type={popupType}
      onClosePopup={onClosePopup}
      popupProps={popupProps}
    />
  );
};

const mapStateToProps = state => {
  const popup = state.popupData;
  return popup;
};

const mapDispatchToProps = dispatch => ({
  onClosePopup: () => {
    dispatch(popupActions.closePopup());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
