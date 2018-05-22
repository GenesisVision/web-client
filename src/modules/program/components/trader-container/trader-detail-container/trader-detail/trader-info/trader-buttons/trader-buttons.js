import React from "react";
import Button from "../../../../../../../../components/button/button";
import "./trader-buttons.css";

const TraderButtons = ({
  programId,
  isInvestEnable,
  isWithdrawEnable,
  openInvestPopup,
  openWithdrawPopup
}) => {
  return (
    <div className="trader-buttons">
      <Button
        className="trader-button"
        onClick={openWithdrawPopup}
        disabled={!isWithdrawEnable}
        label="Withdraw"
        secondary
      />
      <Button
        primary
        className="trader-button"
        label="Invest"
        onClick={openInvestPopup(programId)}
        disabled={!isInvestEnable}
      />
    </div>
  );
};

export default TraderButtons;
