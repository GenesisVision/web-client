import classnames from "classnames";
import moment from "moment";
import NumberFormat from "react-number-format";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";

import ExpandIcon from "./expand-icon";
import TraderDealDetail from "./trader-deal-detail/trader-deal-detail";

import "./trader-deal.css";

class TraderDeal extends Component {
  state = {
    isOpen: false
  };
  toggleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { deal, serverType, currency, t } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="trader-deal">
        <div className="trader-deal__short-info">
          <div
            className={classnames({
              "trader-deal__expand": true,
              "trader-deal__expand--open": isOpen
            })}
            onClick={this.toggleOpen}
          >
            <ExpandIcon />
          </div>
          <div className="trader-deal__info">
            <div className="trader-deal__cell">
              <div className="metric">
                <div className="metric__value">{deal.symbol}</div>
                <div className="metric__description">
                  <span id={`symbol_${deal.ticket}`}>
                    {t("program-deal-list.symbol.text")}
                  </span>
                  <UncontrolledTooltip
                    placement="bottom"
                    target={`symbol_${deal.ticket}`}
                  >
                    {t("program-deal-list.symbol.tooltip")}
                  </UncontrolledTooltip>
                </div>
              </div>
            </div>
            <div className="trader-deal__cell">
              <div className="metric">
                <div className="metric__value">{deal.volume}</div>
                <div className="metric__description">
                  <span id={`volume_${deal.ticket}`}>
                    {t("program-deal-list.volume.text")}
                  </span>
                  <UncontrolledTooltip
                    placement="bottom"
                    target={`volume_${deal.ticket}`}
                  >
                    {t("program-deal-list.volume.tooltip")}
                  </UncontrolledTooltip>
                </div>
              </div>
            </div>
            <div className="trader-deal__cell">
              <div className="metric">
                <div className="metric__value">
                  <NumberFormat
                    value={deal.profit}
                    // decimalScale={2}
                    displayType="text"
                  />
                  <div className="metric__bubble">{currency}</div>
                </div>
                <div className="metric__description">
                  <span id={`profit_${deal.ticket}`}>
                    {t("program-deal-list.profit.text")}
                  </span>
                  <UncontrolledTooltip
                    placement="bottom"
                    target={`profit_${deal.ticket}`}
                  >
                    {t("program-deal-list.profit.tooltip")}
                  </UncontrolledTooltip>
                </div>
              </div>
            </div>
            <div className="trader-deal__cell">
              <div className="metric">
                <div className="metric__value">{deal.direction}</div>
                <div className="metric__description">
                  <span id={`direction_${deal.ticket}`}>
                    {t("program-deal-list.direction.text")}
                  </span>
                  <UncontrolledTooltip
                    placement="bottom"
                    target={`direction_${deal.ticket}`}
                  >
                    {t("program-deal-list.direction.tooltip")}
                  </UncontrolledTooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="trader-deal__date">
            {deal.date && moment(deal.date).format("LLL")}
            {deal.dateOpen && moment(deal.dateOpen).format("LLL")}
          </div>
        </div>
        {isOpen && (
          <div className="trader-deal__detail">
            <TraderDealDetail deal={deal} serverType={serverType} />
          </div>
        )}
      </div>
    );
  }
}

export default translate()(TraderDeal);
