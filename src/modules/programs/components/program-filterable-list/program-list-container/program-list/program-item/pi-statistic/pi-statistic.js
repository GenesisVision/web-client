import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { UncontrolledTooltip } from "reactstrap";

import "./pi-statisctic.css";

const TIStatistic = ({ t, trader, className = "" }) => {
  return (
    <div className={`pi-statistic ${className}`}>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.availableInvestment}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">
            <span id={`availableToInvestment_${trader.id}`}>
              {t("program-statistic.available-to-invest.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`availableToInvestment_${trader.id}`}
            >
              {t("program-statistic.available-to-invest.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
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
          <div className="metric__description">
            <span id={`avgProfit_${trader.id}`}>
              {t("program-statistic.avg-profit.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`avgProfit_${trader.id}`}
            >
              {t("program-statistic.avg-profit.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">{trader.tradesCount}</div>
          <div className="metric__description">
            <span id={`trades_${trader.id}`}>
              {t("program-statistic.trades.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`trades_${trader.id}`}
            >
              {t("program-statistic.trades.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <hr/>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">{trader.investorsCount}</div>
          <div className="metric__description">
            <span id={`investors_${trader.id}`}>
              {t("program-statistic.investors.text", {
                count: trader.investorsCount
              })}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`investors_${trader.id}`}
            >
              {t("program-statistic.investors.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.balance}
              decimalScale={4}
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
              decimalScale={4}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">
            <span id={`totalProfit_${trader.id}`}>
              {t("program-statistic.total-profit.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`totalProfit_${trader.id}`}
            >
              {t("program-statistic.total-profit.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(TIStatistic);
