import NumberFormat from "react-number-format";
import React from "react";
import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";

import "./ts-short-statistic.css";

const TSShortStatistic = ({ t, trader }) => {
  return (
    <div className="trader-statistic">
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.balance}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">{trader.currency}</div>
          </div>
          <div className="metric__description">
            <span id={`balance_${trader.id}`}>
              {t("program-statistic.program-item-balance.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`balance_${trader.id}`}
            >
              {t("program-statistic.program-item-balance.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={
                trader.balance === 0
                  ? 0
                  : trader.ownBalance / trader.balance * 100
              }
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">
            <span id={`manager-share_${trader.id}`}>
              {t("program-statistic.manager-share.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`manager-share_${trader.id}`}
            >
              {t("program-statistic.manager-share.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">{trader.tradesCount}</div>
          <div className="metric__description">
            <span id={`trades_${trader.id}`}>
              {t("program-statistic.trades.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`trades_${trader.id}`}
            >
              {t("program-statistic.trades.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            {trader.periodDuration}{" "}
            <div className="metric__bubble">
              {t("program-settings.period-duration.bubble", {
                count: trader.periodDuration
              })}
            </div>
          </div>
          <div className="metric__description">
            <span id={`duration_${trader.id}`}>
              {t("program-settings.period-duration.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`duration_${trader.id}`}
            >
              {t("program-settings.period-duration.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.feeManagement}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">
            <span id={`managersFee_${trader.id}`}>
              {t("program-settings.management-fee.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`managersFee_${trader.id}`}
            >
              {t("program-settings.management-fee.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="trader-statistic__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.feeSuccess}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">
            <span id={`successFee_${trader.id}`}>
              {t("program-settings.success-fee.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`successFee_${trader.id}`}
            >
              {t("program-settings.success-fee.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(TSShortStatistic);
