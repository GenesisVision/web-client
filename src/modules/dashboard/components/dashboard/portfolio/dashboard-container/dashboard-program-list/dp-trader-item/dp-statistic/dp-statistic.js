import NumberFormat from "react-number-format";
import React from "react";
import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";

const DPStatistic = ({ t, trader }) => {
  return (
    <div className="pi-statistic">
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.investedTokens}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">{trader.token.tokenSymbol}</div>
          </div>
          <div className="metric__description">
            <span id={`my-tokens_${trader.id}`}>
              {t("dashboard-statistic.my-tokens.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`my-tokens_${trader.id}`}
            >
              {t("dashboard-statistic.my-tokens.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.investedTokens * trader.token.initialPrice}
              prefix="$"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">
            <span id={`est-value_${trader.id}`}>
              {t("dashboard-statistic.est-value.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`est-value_${trader.id}`}
            >
              {t("dashboard-statistic.est-value.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.profitFromProgram}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">
            <span id={`my-profit_${trader.id}`}>
              {t("dashboard-statistic.my-profit.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`my-profit_${trader.id}`}
            >
              {t("dashboard-statistic.my-profit.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.profitTotal}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">
            <span id={`total-profit_${trader.id}`}>
              {t("program-statistic.total-profit.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`total-profit_${trader.id}`}
            >
              {t("program-statistic.total-profit.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.balance}
              decimalScale={4}
              displayType="text"
            />
            <div className="metric__bubble">{trader.currency}</div>
          </div>
          <div className="metric__description">
            <span id={`program-balance_${trader.id}`}>
              {t("program-statistic.balance.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`program-balance_${trader.id}`}
            >
              {t("program-statistic.balance.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="pis-item">
        <div className="metric">
          <div className="metric__value">
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
          </div>
          <div className="metric__description">
            <span id={`my-share_${trader.id}`}>
              {t("dashboard-statistic.my-share.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`my-share_${trader.id}`}
            >
              {t("dashboard-statistic.my-share.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(DPStatistic);
