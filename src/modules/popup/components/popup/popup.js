import { Modal } from "reactstrap";
import React from "react";

import "./popup.css";

import {
  PROGRAM_DEPOSIT_POPUP,
  PROGRAM_WITHDRAW_POPUP
} from "../../actions/popup-actions.constants";

import ProgramDepositContainer from "../../../program-deposit/components/program-deposit-container/program-deposit-container";
import ProgramWithdrawContainer from "../../../program-withdraw/components/program-withdraw-container/program-withdraw-container";
const POPUP_COMPONENTS = {
  [PROGRAM_DEPOSIT_POPUP]: ProgramDepositContainer,
  [PROGRAM_WITHDRAW_POPUP]: ProgramWithdrawContainer
};

const Popup = ({ isOpen, type, onSubmitPopup, onClosePopup, popupProps }) => {
  const SpecificPopup = POPUP_COMPONENTS[type];
  return (
    <Modal isOpen={isOpen} toggle={onClosePopup} className="popup-dialog">
      <SpecificPopup
        submitPopup={onSubmitPopup}
        closePopup={onClosePopup}
        {...popupProps}
      />
    </Modal>
  );
};

export default Popup;
