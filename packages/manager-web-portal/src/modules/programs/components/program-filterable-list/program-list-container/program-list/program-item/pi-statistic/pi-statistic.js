import "./pi-statisctic.css";

import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

import PIStat from "../../../../../../../../components/program-item/pi-stat/pi-stat";

const TIStatistic = ({ t, program, className = "" }) => {
  return (
    <div className={`pi-statistic ${className}`}>
      <PIStat
        value={
          <NumberFormat
            value={program.availableInvestment}
            displayType="text"
            decimalScale={0}
          />
        }
        bubble="GVT"
        description={t("program-statistic.available-to-invest.text")}
        tooltip={t("program-statistic.available-to-invest.tooltip")}
      />
      <PIStat
        value={
          <NumberFormat
            value={program.profitAvgPercent}
            suffix="%"
            decimalScale={0}
            displayType="text"
          />
        }
        description={t("program-statistic.avg-profit.text")}
        tooltip={t("program-statistic.avg-profit.tooltip")}
      />
      <PIStat
        value={program.tradesCount}
        description={t("program-statistic.trades.text")}
        tooltip={t("program-statistic.trades.tooltip")}
      />
      <hr />
      <PIStat
        value={program.investorsCount}
        description={t("program-statistic.investors.text", {
          count: program.investorsCount
        })}
        tooltip={t("program-statistic.investors.tooltip")}
      />
      <PIStat
        value={
          <NumberFormat
            value={program.balance}
            decimalScale={program.balance < 1000 ? 2 : 0}
            displayType="text"
          />
        }
        bubble={program.currency}
        description={t("program-statistic.program-item-balance.text")}
        tooltip={t("program-statistic.program-item-balance.tooltip")}
      />
      <PIStat
        value={
          <NumberFormat
            value={program.profitTotal}
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
