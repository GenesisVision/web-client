import React from "react";
import ProgramAvatar from "components/program-avatar/program-avatar";
import TraderButtons from "./trader-buttons/trader-buttons";
import "./trader-info.css";

const TraderInfo = ({
  trader,
  isAuthenticated,
  openInvestPopup,
  openWithdrawPopup
}) => {
  return (
    <div className="trader-info">
      <div className="trader-info__avatar">
        <ProgramAvatar
          url={trader.logo}
          level={trader.level}
          isTournament={trader.isTournament}
        />
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
