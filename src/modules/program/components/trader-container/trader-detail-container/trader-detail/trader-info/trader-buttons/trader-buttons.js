import React from "react";

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
      <button
        className="trader-button gv-btn gv-btn-secondary"
        onClick={openWithdrawPopup}
        disabled={!isWithdrawEnable}
      >
        Withdraw
      </button>
      <button
        className="trader-button gv-btn gv-btn-primary"
        onClick={openInvestPopup(programId)}
        disabled={!isInvestEnable}
      >
        Invest
      </button>
    </div>
  );
};

export default TraderButtons;
