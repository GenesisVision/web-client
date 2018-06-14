import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import ProgramMetric from "components/program-metric/program-metric";
import React from "react";

import "./pi-statisctic.css";

const TIStatistic = ({ t, trader, className = "" }) => {
  return (
    <div className={`pi-statistic ${className}`}>
      <ProgramMetric
        value={
          <NumberFormat
            value={trader.availableInvestment}
            displayType="text"
            decimalScale={0}
          />
        }
        bubble="GVT"
        description={t("program-statistic.available-to-invest.text")}
        tooltip={t("program-statistic.available-to-invest.tooltip")}
      />
      <ProgramMetric
        value={
          <NumberFormat
            value={trader.profitAvgPercent}
            suffix="%"
            decimalScale={0}
            displayType="text"
          />
        }
        description={t("program-statistic.avg-profit.text")}
        tooltip={t("program-statistic.avg-profit.tooltip")}
      />
      <ProgramMetric
        value={trader.tradesCount}
        description={t("program-statistic.trades.text")}
        tooltip={t("program-statistic.trades.tooltip")}
      />
      <hr />
      <ProgramMetric
        value={trader.investorsCount}
        description={t("program-statistic.investors.text", {
          count: trader.investorsCount
        })}
        tooltip={t("program-statistic.investors.tooltip")}
      />
      <ProgramMetric
        value={
          <NumberFormat
            value={trader.balance}
            decimalScale={trader.balance < 1000 ? 2 : 0}
            displayType="text"
          />
        }
        bubble={trader.currency}
        description={t("program-statistic.program-item-balance.text")}
        tooltip={t("program-statistic.program-item-balance.tooltip")}
      />
      <ProgramMetric
        value={
          <NumberFormat
            value={trader.profitTotal}
            decimalScale={0}
            displayType="text"
          />
        }
        bubble="GVT"
        description={t("program-statistic.total-profit.text")}
        tooltip={t("program-statistic.total-profit.tooltip")}
      />
    </div>
  );
};

export default translate()(TIStatistic);
