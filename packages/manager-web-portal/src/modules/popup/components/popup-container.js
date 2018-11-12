import { connect } from "react-redux";
import React from "react";

import Popup from "./popup/popup";
import popupActions from "../actions/popup-actions";

const PopupContainer = ({
  isOpen,
  popupType,
  popupProps,
  submitPopup,
  closePopup
}) => {
  if (!popupType) {
    return null;
  }
  return (
    <Popup
      isOpen={isOpen}
      type={popupType}
      onSubmitPopup={submitPopup}
      onClosePopup={closePopup}
      popupProps={popupProps}
    />
  );
};

const mapStateToProps = state => {
  const popup = state.popupData;
  return popup;
};

const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(popupActions.closePopup()),
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  return {
    ...stateProps,
    ...otherDispatchProps,
    ...ownProps,
    submitPopup: () =>
      dispatch(stateProps.onSubmitPopup()).then(() => {
        dispatch(popupActions.closePopup());
        return Promise.resolve();
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  PopupContainer
);
