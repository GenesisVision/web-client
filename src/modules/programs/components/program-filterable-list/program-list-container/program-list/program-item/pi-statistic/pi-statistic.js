import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { UncontrolledTooltip } from "reactstrap";

import "./pi-statisctic.css";

const TIStatistic = ({ t, trader }) => {
  return (
    <div className="pi-statistic">
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.profitAvgPercent}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">Avg Profit</div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">{trader.currency}</div>
          <div className="metric__description">Currency</div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">{trader.tradesCount}</div>
          <div className="metric__description">Trades</div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">{trader.investorsCount}</div>
          <div className="metric__description">Investors</div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.balance}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">{trader.currency}</div>
          </div>
          <div className="metric__description">
            <span id={`balance_${trader.id}`}>
              {t("program-statistic.program-item-balance.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`balance_${trader.id}`}
            >
              {t("program-statistic.program-item-balance.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.profitTotal}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">Total Profit</div>
        </div>
      </div>
    </div>
  );
};

export default translate()(TIStatistic);
