import "./wallet-widget.scss";

import classnames from "classnames";
import Chip from "shared/components/chip/chip";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import Popover from "shared/components/popover/popover";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import { WALLET_PAGE_ROUTE } from "shared/components/wallet/wallet-page";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { formatValue } from "shared/utils/formatter";

class WalletWidget extends React.Component {
  state = {
    anchorEl: null,
    isOpenAddFundsPopup: false
  };
  handleOpenDetails = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleCloseDetails = () => {
    this.setState({ anchorEl: null });
  };
  handleOpenAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: true });
  };
  handleClodsAddFundsPopup = () => {
    this.setState({ isOpenAddFundsPopup: false });
  };
  render() {
    const {
      t,
      availableGvt,
      investedGvt,
      totalBalanceGvt,
      className
    } = this.props;
    return (
      <Fragment>
        <div className={classnames("wallet-widget", className)}>
          <div
            className="wallet-widget__wallet"
            onClick={this.handleOpenDetails}
          >
            <WalletIcon primary={this.state.anchorEl !== null} />
            <span className="wallet-widget__value">{`${availableGvt} GVT`}</span>
          </div>
          <div className="wallet-widget__add">
            <Chip type="positive" onClick={this.handleOpenAddFundsPopup}>
              +
            </Chip>
          </div>
        </div>
        <WalletAddFundsPopup
          onClose={this.handleClodsAddFundsPopup}
          open={this.state.isOpenAddFundsPopup}
        />
        <Popover
          anchorEl={this.state.anchorEl}
          onClose={this.handleCloseDetails}
        >
          <div className="wallet-details">
            <div className="wallet-details__item">
              <div className="wallet-details__title">
                {t("wallet-widget.total-balance")}
              </div>
              <div className="wallet-details__value">{`${formatValue(
                totalBalanceGvt
              )} GVT`}</div>
            </div>
            <div className="wallet-details__item">
              <div className="wallet-details__title">
                {t("wallet-widget.invested-value")}
              </div>
              <div className="wallet-details__value">{`${formatValue(
                investedGvt
              )} GVT`}</div>
            </div>
            <div className="wallet-details__item">
              <div className="wallet-details__title">
                {t("wallet-widget.available")}
              </div>
              <div className="wallet-details__value">{`${formatValue(
                availableGvt
              )} GVT`}</div>
            </div>
            <div className="wallet-details__item">
              <div className="wallet-details__value">
                <Link to={WALLET_PAGE_ROUTE} onClick={this.handleCloseDetails}>
                  {t("wallet-widget.details")} ›
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
  totalBalanceGvt: PropTypes.number,
  className: PropTypes.string
};

WalletWidget.defaultProps = {
  availableGvt: 0,
  investedGvt: 0,
  totalBalanceGvt: 0,
  className: ""
};

export default translate()(WalletWidget);
