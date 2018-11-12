import { Modal } from "reactstrap";
import React from "react";

import "./popup.css";

import {
  PROGRAM_DEPOSIT_POPUP,
  PROGRAM_WITHDRAW_POPUP,
  PROGRAM_CLOSE_POPUP,
  PROGRAM_CLOSE_PERIOD_POPUP
} from "../../actions/popup-actions.constants";

import ProgramDepositContainer from "../../../program-deposit/components/program-deposit-container/program-deposit-container";
import ProgramWithdrawContainer from "../../../program-withdraw/components/program-withdraw-container/program-withdraw-container";
import ProgramCloseContainer from "../../../program-close/components/program-close-container/program-close-container";
import ProgramClosePeriodContainer from "../../../program-close-period/components/program-close-period-container";
const POPUP_COMPONENTS = {
  [PROGRAM_DEPOSIT_POPUP]: ProgramDepositContainer,
  [PROGRAM_WITHDRAW_POPUP]: ProgramWithdrawContainer,
  [PROGRAM_CLOSE_POPUP]: ProgramCloseContainer,
  [PROGRAM_CLOSE_PERIOD_POPUP]: ProgramClosePeriodContainer
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
