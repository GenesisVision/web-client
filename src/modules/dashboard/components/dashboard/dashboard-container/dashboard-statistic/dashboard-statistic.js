import NumberFormat from "react-number-format";
import React from "react";
import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";
import "./dashboard-statistic.css";

const DashboardStatistic = ({
  hasPrograms,
  profitFromPrograms,
  investedAmount,
  totalPortfolioAmount,
  t
}) => {
  if (!hasPrograms) return null;
  return (
    <div className="dashboard-statistic">
      <div className="dashboard-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={totalPortfolioAmount}
              decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">USD</div>
          </div>
          <div className="metric__description">
            <span id={`portfolio-value`}>
              {t("investor-dashboard.portfolio-value.text")}
            </span>
            <UncontrolledTooltip placement="bottom" target={`portfolio-value`}>
              {t("investor-dashboard.portfolio-value.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="dashboard-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={profitFromPrograms}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">
            <span id={`profit`}>{t("investor-dashboard.profit.text")}</span>
            <UncontrolledTooltip placement="bottom" target={`profit`}>
              {t("investor-dashboard.profit.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="dashboard-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={investedAmount}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">
            <span id={`invested`}>{t("investor-dashboard.invested.text")}</span>
            <UncontrolledTooltip placement="bottom" target={`invested`}>
              {t("investor-dashboard.invested.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(DashboardStatistic);
