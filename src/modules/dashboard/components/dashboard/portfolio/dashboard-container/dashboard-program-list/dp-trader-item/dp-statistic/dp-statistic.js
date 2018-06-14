import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import ProgramMetric from "components/program-metric/program-metric";
import React from "react";

const DPStatistic = ({ t, trader, className = "" }) => {
  return (
    <div className={`pi-statistic ${className}`}>
      <ProgramMetric
        value={
          <NumberFormat value={trader.investedTokens} displayType="text" />
        }
        bubble={trader.token.tokenSymbol}
        description={t("dashboard-statistic.my-tokens.text")}
        tooltip={t("dashboard-statistic.my-tokens.tooltip")}
      />
      <ProgramMetric
        value={
          <NumberFormat
            value={trader.investedTokens * trader.token.initialPrice}
            prefix="$"
            decimalScale={0}
            displayType="text"
          />
        }
        description={t("dashboard-statistic.est-value.text")}
        tooltip={t("dashboard-statistic.est-value.tooltip")}
      />
      <ProgramMetric
        value={
          <NumberFormat
            value={trader.profitFromProgram}
            decimalScale={0}
            displayType="text"
          />
        }
        bubble="GVT"
        description={t("dashboard-statistic.my-profit.text")}
        tooltip={t("dashboard-statistic.my-profit.tooltip")}
      />
      <hr />
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
      <ProgramMetric
        value={
          <NumberFormat
            value={trader.balance}
            decimalScale={0}
            displayType="text"
          />
        }
        bubble={trader.currency}
        description={t("program-statistic.balance.text")}
        tooltip={t("program-statistic.balance.tooltip")}
      />
      <ProgramMetric
        value={
          <NumberFormat
            value={
              trader.balance === 0
                ? 0
                : ((trader.investedTokens * trader.token.initialPrice) /
                    trader.balance) *
                  100
            }
            suffix="%"
            decimalScale={0}
            displayType="text"
          />
        }
        description={t("dashboard-statistic.my-share.text")}
        tooltip={t("dashboard-statistic.my-share.tooltip")}
      />
    </div>
  );
};

export default translate()(DPStatistic);
