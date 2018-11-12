import "./program-buttons.css";

import React from "react";
import { translate } from "react-i18next";

import Button from "shared/components/button/button";

const TraderButtons = ({
  t,
  programId,
  isInvestEnable,
  isWithdrawEnable,
  canCloseProgram,
  canClosePeriod,
  openInvestPopup,
  openWithdrawPopup,
  openCloseProgramPopup,
  openEditProgramPage,
  openClosePeriodPopup
}) => {
  return (
    <div className="program-buttons">
      <Button
        label={t("program-actions.invest")}
        className="program-button"
        primary
        onClick={openInvestPopup(programId)}
        disabled={!isInvestEnable}
      />
      <Button
        label={t("program-actions.withdraw")}
        className="program-button"
        secondary
        onClick={openWithdrawPopup}
        disabled={!isWithdrawEnable}
      />
      <Button
        label={t("program-actions.edit-program")}
        className="program-button"
        secondary
        onClick={openEditProgramPage(programId)}
        disabled={!canCloseProgram}
      />
      <Button
        label={t("program-actions.close-period")}
        className="program-button"
        secondary
        onClick={openClosePeriodPopup(programId)}
        disabled={!canClosePeriod}
      />
      <Button
        label={t("program-actions.close-program")}
        secondary
        className="program-button"
        onClick={openCloseProgramPopup(programId)}
        disabled={!canCloseProgram}
      />
    </div>
  );
};

export default translate()(TraderButtons);
