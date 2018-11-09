import "./dp-buttons.css";

import React from "react";
import { translate } from "react-i18next";

import Button from "../../../../../../../../../components/button/button";

const DPButtons = ({
  t,
  programId,
  isInvestEnable,
  isWithdrawEnable,
  canEditProgram,
  openInvestPopup,
  openWithdrawPopup,
  openCloseProgramPopup,
  openEditProgramPage
}) => {
  return (
    <div className="dp-buttons">
      <Button
        label={t("program-actions.invest")}
        className="dp-button"
        primary
        onClick={openInvestPopup(programId)}
        disabled={!isInvestEnable}
      />
      <Button
        label={t("program-actions.withdraw")}
        className="dp-button"
        secondary
        onClick={openWithdrawPopup}
        disabled={!isWithdrawEnable}
      />
      <Button
        label={t("program-actions.edit-program")}
        className="dp-button"
        secondary
        onClick={openEditProgramPage(programId)}
        disabled={!canEditProgram}
      />
    </div>
  );
};

export default translate()(DPButtons);
