import NumberFormat from "react-number-format";
import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";
import React from "react";

import ProfitImage from "./profit-icon.svg";

const DSProfit = ({ t, profit }) => {
  return (
    <div className="dashboard-card__body card-body">
      <div className="dashboard-card__header">
        <span id="dashboardStatisticProfit">
          {t("dashboard-statistic.profit.text")}
        </span>
        <UncontrolledTooltip
          placement="bottom"
          target="dashboardStatisticProfit"
        >
          {t("dashboard-statistic.profit.tooltip")}
        </UncontrolledTooltip>
      </div>
      <div className="dashboard-card__image">
        <img src={ProfitImage} alt="Profit" />
      </div>
      <div className="dashboard-card__value">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat value={profit} decimalScale={2} displayType="text" />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">My Profit</div>
        </div>
      </div>
    </div>
  );
};

export default translate()(DSProfit);
