import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";
import NumberFormat from "react-number-format";
import React from "react";

import "./ps-short-statistic.css";

const PSShortStatistic = ({ t, program }) => {
  return (
    <div className="program-statistic">
      <div className="program-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat value={program.balance} displayType="text" />
            <div className="metric__bubble">{program.currency}</div>
          </div>
          <div className="metric__description">
            <span id={`balance_${program.id}`}>
              {t("program-statistic.balance.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`balance_${program.id}`}
            >
              {t("program-statistic.balance.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="program-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat value={program.ownBalance} displayType="text" />
            <div className="metric__bubble">{program.currency}</div>
          </div>
          <div className="metric__description">
            <span id={`ownBalance_${program.id}`}>
              {t("program-statistic.own-balance.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`ownBalance_${program.id}`}
            >
              {t("program-statistic.own-balance.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="program-statistic__cell">
        <div className="metric">
          <div className="metric__value">{program.tradesCount}</div>
          <div className="metric__description">
            <span id={`trades_${program.id}`}>
              {t("program-statistic.trades.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`trades_${program.id}`}
            >
              {t("program-statistic.trades.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="program-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            {program.periodDuration}{" "}
            <div className="metric__bubble">
              {t("program-settings.period-duration.bubble", {
                count: program.periodDuration
              })}
            </div>
          </div>
          <div className="metric__description">
            <span id={`periodDuration_${program.id}`}>
              {t("program-settings.period-duration.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`periodDuration_${program.id}`}
            >
              {t("program-settings.period-duration.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="program-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={program.feeManagement}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">
            <span id={`managersFee_${program.id}`}>
              {t("program-settings.management-fee.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`managersFee_${program.id}`}
            >
              {t("program-settings.management-fee.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="program-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={program.feeSuccess}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">
            <span id={`successFee_${program.id}`}>
              {t("program-settings.success-fee.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`successFee_${program.id}`}
            >
              {t("program-settings.success-fee.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(PSShortStatistic);
