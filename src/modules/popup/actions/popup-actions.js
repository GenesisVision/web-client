import * as actionTypes from "./popup-actions.constants";

const openPopup = (popupType, popupProps, onSubmitPopup) => dispatch => {
  dispatch({
    type: actionTypes.SHOW_POPUP,
    popupType,
    popupProps,
    onSubmitPopup
  });
};

const closePopup = () => dispatch => {
  dispatch({
    type: actionTypes.HIDE_POPUP
  });
};

const popupActions = {
  openPopup,
  closePopup
};

export default popupActions;
