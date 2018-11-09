import NumberFormat from "react-number-format";
import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";
import React from "react";

import DSFundChart from "./ds-fund-chart";

import "./ds-fund.css";
import { COLORS } from "../../../../../dashboard.constants";

const DSFund = ({ t, funds }) => {
  return (
    <div className="dashboard-card__body card-body">
      <div className="dashboard-card__header">
        <span id="dashboardStatisticFunds">
          {t("dashboard-statistic.funds.text")}
        </span>
        <UncontrolledTooltip
          placement="bottom"
          target="dashboardStatisticFunds"
        >
          {t("dashboard-statistic.funds.tooltip")}
        </UncontrolledTooltip>
      </div>
      <div className="dashboard-card__image ds-fund__chart">
        <DSFundChart data={funds} colors={COLORS} />
      </div>
      <div className="dashboard-card__value">
        <div className="ds-fund__values">
          {funds.map((x, idx) => (
            <div key={idx} className="metric ds-fund__value">
              <div className="metric__value">
                <NumberFormat
                  value={x.balance}
                  decimalScale={2}
                  displayType="text"
                />
                <div className="metric__bubble">{x.currency}</div>
              </div>
              <div className="metric__description">
                <div
                  className="ds-fund__color"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                {x.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default translate()(DSFund);
