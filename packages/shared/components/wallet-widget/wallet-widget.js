import "./wallet-widget.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import Chip from "shared/components/chip/chip";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import Popover from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import { formatCurrencyValue } from "shared/utils/formatter";

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
      currency,
      available,
      invested,
      totalBalance,
      pending,
      className
    } = this.props;
    const currentWallet = { available, currency };
    return (
      <Fragment>
        <div className={classnames("wallet-widget", className)}>
          <div
            className="wallet-widget__wallet"
            onClick={this.handleOpenDetails}
          >
            <WalletIcon primary={this.state.anchorEl !== null} />
            <span className="wallet-widget__value">{`${formatCurrencyValue(
              available
            )} ${currency}`}</span>
          </div>
          <div className="wallet-widget__add">
            <Chip type="positive" onClick={this.handleOpenAddFundsPopup}>
              +
            </Chip>
          </div>
        </div>
        <WalletAddFundsPopup
          currentWallet={currentWallet}
          onClose={this.handleClodsAddFundsPopup}
          open={this.state.isOpenAddFundsPopup}
        />
        <Popover
          anchorEl={this.state.anchorEl}
          onClose={this.handleCloseDetails}
        >
          <div className="wallet-details">
            <div className="wallet-details__item">
              <StatisticItem label={t("wallet-widget.total-balance")}>
                {`${formatCurrencyValue(totalBalance)} ${currency}`}
              </StatisticItem>
            </div>
            <div className="wallet-details__item">
              <StatisticItem label={t("wallet-widget.available")}>
                {`${formatCurrencyValue(available)} ${currency}`}
              </StatisticItem>
            </div>
            <div className="wallet-details__item">
              <StatisticItem label={t("wallet-widget.invested-value")}>
                {`${formatCurrencyValue(invested)} ${currency}`}
              </StatisticItem>
            </div>
            <div className="wallet-details__item">
              <StatisticItem label={t("wallet-widget.pending-value")}>
                {`${formatCurrencyValue(pending)} ${currency}`}
              </StatisticItem>
            </div>
            <div className="wallet-details__item">
              <div className="wallet-details__value">
                <Link
                  to={WALLET_TOTAL_PAGE_ROUTE}
                  onClick={this.handleCloseDetails}
                >
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
  available: PropTypes.number,
  invested: PropTypes.number,
  pending: PropTypes.number,
  totalBalance: PropTypes.number,
  className: PropTypes.string,
  currency: PropTypes.string
};

WalletWidget.defaultProps = {
  available: 0,
  invested: 0,
  pending: 0,
  totalBalance: 0,
  currency: "",
  className: ""
};

export default translate()(WalletWidget);
