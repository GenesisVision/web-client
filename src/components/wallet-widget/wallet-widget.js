import "./wallet-widget.scss";

import { ArrowIcon, WalletIcon } from "components/icon/icon";
import Popover from "components/popover/popover";
import { WALLET_PAGE_ROUTE } from "pages/wallet/wallet-page";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

class WalletWidget extends React.Component {
  state = {
    anchorEl: null
  };
  handleOpenDetails = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleCloseDetails = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { t, availableGvt, investedGvt, totalBalanceGvt } = this.props;
    return (
      <Fragment>
        <div className="wallet-widget" onClick={this.handleOpenDetails}>
          <WalletIcon />
          <span className="wallet-widget__value">{`${availableGvt} GVT`}</span>
        </div>
        <Popover
          anchorEl={this.state.anchorEl}
          onClose={this.handleCloseDetails}
        >
          <div className="wallet-details">
            <div className="wallet-details__item">
              <div className="wallet-details__title">
                {t("wallet-widget.total-balance")}
              </div>
              <div className="wallet-details__value">{`${totalBalanceGvt} GVT`}</div>
            </div>
            <div className="wallet-details__item">
              <div className="wallet-details__title">
                {t("wallet-widget.invested-value")}
              </div>
              <div className="wallet-details__value">{`${investedGvt} GVT`}</div>
            </div>
            <div className="wallet-details__item">
              <div className="wallet-details__title">
                {t("wallet-widget.available")}
              </div>
              <div className="wallet-details__value">{`${availableGvt} GVT`}</div>
            </div>
            <div className="wallet-details__item">
              <div className="wallet-details__value">
                <Link to={WALLET_PAGE_ROUTE} onClick={this.handleCloseDetails}>
                  {t("wallet-widget.details")}{" "}
                  <ArrowIcon className={"wallet-details__arrow-link"} />
                </Link>
              </div>
            </div>
          </div>
        </Popover>
      </Fragment>
    );
  }
}

WalletWidget.propTypes = {
  availableGvt: PropTypes.number,
  investedGvt: PropTypes.number,
  totalBalanceGvt: PropTypes.number
};

WalletWidget.defaultProps = {
  availableGvt: 0,
  investedGvt: 0,
  totalBalanceGvt: 0
};

export default translate()(WalletWidget);
