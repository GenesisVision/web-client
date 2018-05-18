import NumberFormat from "react-number-format";
import React from "react";
import { translate } from "react-i18next";
import PIStat from "../../../../../../../../../components/program-item/pi-stat/pi-stat";

const DPStatistic = ({ t, trader, className = "" }) => {
  return (
    <div className={`pi-statistic ${className}`}>
      <PIStat
        value={
          <NumberFormat value={trader.investedTokens} displayType="text" />
        }
        bubble={trader.token.tokenSymbol}
        description={t("dashboard-statistic.my-tokens.text")}
        tooltip={t("dashboard-statistic.my-tokens.tooltip")}
      />
      <PIStat
        value={
          <NumberFormat
            value={trader.investedTokens * trader.token.initialPrice}
            prefix="$"
            decimalScale={2}
            displayType="text"
          />
        }
        description={t("dashboard-statistic.est-value.text")}
        tooltip={t("dashboard-statistic.est-value.tooltip")}
      />
      <PIStat
        value={
          <NumberFormat
            value={trader.profitFromProgram}
            // decimalScale={2}
            displayType="text"
          />
        }
        bubble="GVT"
        description={t("dashboard-statistic.my-profit.text")}
        tooltip={t("dashboard-statistic.my-profit.tooltip")}
      />
      <hr />
      <PIStat
        value={
          <NumberFormat
            value={trader.profitTotal}
            // decimalScale={2}
            displayType="text"
          />
        }
        bubble="GVT"
        description={t("program-statistic.total-profit.text")}
        tooltip={t("program-statistic.total-profit.tooltip")}
      />
      <PIStat
        value={
          <NumberFormat
            value={trader.balance}
            decimalScale={4}
            displayType="text"
          />
        }
        bubble={trader.currency}
        description={t("program-statistic.balance.text")}
        tooltip={t("program-statistic.balance.tooltip")}
      />
      <PIStat
        value={
          <NumberFormat
            value={
              trader.balance === 0
                ? 0
                : trader.investedTokens *
                  trader.token.initialPrice /
                  trader.balance *
                  100
            }
            suffix="%"
            decimalScale={2}
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
