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
            <span id={`program-my-tokens_${trader.id}`}>
              {t("investor-dashboard.program-my-tokens.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`program-my-tokens_${trader.id}`}
            >
              {t("investor-dashboard.program-my-tokens.tooltip")}
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
            <span id={`program-est-value_${trader.id}`}>
              {t("investor-dashboard.program-est-value.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`program-est-value_${trader.id}`}
            >
              {t("investor-dashboard.program-est-value.tooltip")}
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
            <span id={`program-my-profit_${trader.id}`}>
              {t("investor-dashboard.program-my-profit.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`program-my-profit_${trader.id}`}
            >
              {t("investor-dashboard.program-my-profit.tooltip")}
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
            <span id={`program-total-profit_${trader.id}`}>
              {t("investor-dashboard.program-total-profit.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`program-total-profit_${trader.id}`}
            >
              {t("investor-dashboard.program-total-profit.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="pis-item">
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
            <span id={`program-balance_${trader.id}`}>
              {t("investor-dashboard.program-balance.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`program-balance_${trader.id}`}
            >
              {t("investor-dashboard.program-balance.tooltip")}
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
            <span id={`program-my-share_${trader.id}`}>
              {t("investor-dashboard.program-my-share.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`program-my-share_${trader.id}`}
            >
              {t("investor-dashboard.program-my-share.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(DPStatistic);
