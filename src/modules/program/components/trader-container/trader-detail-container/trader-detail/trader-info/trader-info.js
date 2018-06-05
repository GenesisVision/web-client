import React from "react";

import "./trader-info.css";
import TraderAvatar from "../../../../../../../components/program-item/pi-avatar/pi-avatar";
import TraderButtons from "./trader-buttons/trader-buttons";

const TraderInfo = ({
  trader,
  isAuthenticated,
  openInvestPopup,
  openWithdrawPopup
}) => {
  return (
    <div className="trader-info">
      <div className="trader-info__avatar">
        <TraderAvatar url={trader.logo} level={trader.level} />
      </div>
      <div className="trader-info__name">
        <div className="trader-info__title">{trader.title}</div>
        <div className="trader-info__description">{trader.description}</div>
      </div>
      {isAuthenticated && (
        <div className="trader-info__buttons">
          <TraderButtons
            programId={trader.id}
            isInvestEnable={trader.isInvestEnable}
            isWithdrawEnable={trader.isWithdrawEnable}
            openInvestPopup={openInvestPopup}
            openWithdrawPopup={openWithdrawPopup}
          />
        </div>
      )}
    </div>
  );
};

export default TraderInfo;
