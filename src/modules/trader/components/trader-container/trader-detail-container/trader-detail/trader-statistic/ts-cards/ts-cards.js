import React from "react";
import NumberFormat from "react-number-format";

import "./ts-cards.css";
import walletIcon from "../../../../../../media/wallet-icon.svg";
import investorAvatar from "../../../../../../../../shared/media/investor-avatar.png";
import TSProfitChart from "./ts-profit-chart";

const TSCards = ({ trader }) => {
  return (
    <div className="trader-cards">
      <div className="trader-card card">
        <div className="trader-card__body  card-body">
          <div className="trader-card__image">
            <TSProfitChart data={trader.chart} />
          </div>
          <div className="trader-card__value">
            <NumberFormat
              value={trader.profitTotal}
              // decimalScale={4}
              displayType="text"
            />
            <div className="trader-card__bubble metric__bubble">GVT</div>
          </div>
          <div className="trader-card__description">Profit</div>
        </div>
      </div>
      <div className="trader-card card">
        <div className="trader-card__body card-body">
          <div className="trader-card__image">
            <img src={walletIcon} height="100" alt="Avg Profit" />
          </div>
          <div className="trader-card__value">{trader.profitAvgPercent}%</div>
          <div className="trader-card__description">Avg Profit</div>
        </div>
      </div>
      <div className="trader-card card">
        <div className="trader-card__body card-body">
          <div className="trader-card__image">
            <img src={investorAvatar} height="130" alt="Investor" />
          </div>
          <div className="trader-card__value">{trader.investorsCount}</div>
          <div className="trader-card__description">Investors</div>
        </div>
      </div>
    </div>
  );
};

export default TSCards;
