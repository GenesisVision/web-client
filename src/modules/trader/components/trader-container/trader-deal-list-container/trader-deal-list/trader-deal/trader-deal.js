import React, { Component } from "react";
import ExpandIcon from "./expand-icon";
import classnames from "classnames";
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
    const { deal, serverType } = this.props;
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
                <div className="metric__description">Symbol</div>
              </div>
            </div>
            <div className="trader-deal__cell">
              <div className="metric">
                <div className="metric__value">{deal.volume}</div>
                <div className="metric__description">Volume</div>
              </div>
            </div>
            <div className="trader-deal__cell">
              <div className="metric">
                <div className="metric__value">{deal.profit}</div>
                <div className="metric__description">Profit</div>
              </div>
            </div>
            <div className="trader-deal__cell">
              <div className="metric">
                <div className="metric__value">{deal.direction}</div>
                <div className="metric__description">Direction</div>
              </div>
            </div>
          </div>
          <div className="trader-deal__date">
            {new Date(deal.date).toDateString()}
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

export default TraderDeal;
