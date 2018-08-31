import "./ts-cards.css";

import walletIcon from "media/wallet-icon.svg";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { UncontrolledTooltip } from "reactstrap";
import investorAvatar from "shared/media/investor-avatar.png";

import TSProfitChart from "./ts-profit-chart";

const profitChartData = (chartData, programStartDate) => {
  return [
    {
      totalProfit: 0,
      date: programStartDate
    },
    ...chartData
  ];
};

const TSCards = ({ t, trader }) => {
  return (
    <div className="trader-cards">
      <div className="trader-card card">
        <div className="trader-card__body  card-body">
          <div className="trader-card__image">
            <TSProfitChart
              data={profitChartData(trader.chart, trader.programStartDate)}
            />
          </div>
          <div className="trader-card__value">
            <NumberFormat
              value={trader.profitTotal}
              // decimalScale={4}
              displayType="text"
            />
            <div className="trader-card__bubble metric__bubble">GVT</div>
          </div>
          <div className="trader-card__description">
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
      <div className="trader-card card">
        <div className="trader-card__body card-body">
          <div className="trader-card__image">
            <img src={walletIcon} height="100" alt="Avg Profit" />
          </div>
          <div className="trader-card__value">{trader.profitAvgPercent}%</div>
          <div className="trader-card__description">
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
      <div className="trader-card card">
        <div className="trader-card__body card-body">
          <div className="trader-card__image">
            <img src={investorAvatar} height="130" alt="Investor" />
          </div>
          <div className="trader-card__value">{trader.investorsCount}</div>
          <div className="trader-card__description">
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
    </div>
  );
};

export default translate()(TSCards);
