import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { UncontrolledTooltip } from "reactstrap";

import PIStat from "../../../../../../../../components/program-item/pi-stat/pi-stat";

import "./pi-statisctic.css";

const TIStatistic = ({ t, trader, className = "" }) => {
  return (
    <div className={`pi-statistic ${className}`}>
      <PIStat
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
      <PIStat
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
      <PIStat
        value={trader.tradesCount}
        description={t("program-statistic.trades.text")}
        tooltip={t("program-statistic.trades.tooltip")}
      />
      <hr />
      <PIStat
        value={trader.investorsCount}
        description={t("program-statistic.investors.text", {
          count: trader.investorsCount
        })}
        tooltip={t("program-statistic.investors.tooltip")}
      />
      <PIStat
        value={
          <NumberFormat
            value={trader.balance}
            decimalScale={0}
            displayType="text"
          />
        }
        bubble={trader.currency}
        description={t("program-statistic.program-item-balance.text")}
        tooltip={t("program-statistic.program-item-balance.tooltip")}
      />
      <PIStat
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
