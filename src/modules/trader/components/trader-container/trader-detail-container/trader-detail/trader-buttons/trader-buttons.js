import React from "react";

import "./trader-buttons.css";

const TraderButtons = ({ traderId, openInvestPopup, openWithdrawPopup }) => {
  return (
    <div className="trader-buttons">
      <button
        className="trader-button gv-btn gv-btn-secondary"
        onClick={openWithdrawPopup(traderId)}
        disabled
      >
        Sell Tokens
      </button>
      <button
        className="trader-button gv-btn gv-btn-primary"
        onClick={openInvestPopup(traderId)}
        disabled
      >
        Invest
      </button>
    </div>
  );
};

export default TraderButtons;
