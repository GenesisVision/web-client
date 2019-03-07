import "./wallet-widget.scss";

import classNames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import Popover from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import { formatCurrencyValue } from "shared/utils/formatter";
import { Nullable } from "shared/utils/types";

interface IWalletWidgetProps {
  available: number;
  invested: number;
  pending: number;
  totalBalance: number;
  className?: string;
  currency: string;
}

interface IWalletWidgetState {
  anchorEl: Nullable<EventTarget>;
  isOpenAddFundsPopup: boolean;
}

class WalletWidget extends React.Component<
  IWalletWidgetProps & InjectedTranslateProps,
  IWalletWidgetState
> {
  state = {
    anchorEl: null,
    isOpenAddFundsPopup: false
  };
  handleOpenDetails = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
      available = 0,
      invested = 0,
      totalBalance = 0,
      pending = 0,
      className
    } = this.props;
    const currentWallet = { available, currency };
    return (
      <React.Fragment>
        <div className={classNames("wallet-widget", className)}>
          <div
            className="wallet-widget__wallet"
            onClick={this.handleOpenDetails}
          >
            <WalletIcon primary={this.state.anchorEl !== null} />
            <span className="wallet-widget__value">{`${formatCurrencyValue(
              available,
              currency
            )} ${currency}`}</span>
          </div>
          <div className="wallet-widget__add">
            <Chip
              type={CHIP_TYPE.POSITIVE}
              onClick={this.handleOpenAddFundsPopup}
            >
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
                {`${formatCurrencyValue(totalBalance, currency)} ${currency}`}
              </StatisticItem>
            </div>
            <div className="wallet-details__item">
              <StatisticItem label={t("wallet-widget.available")}>
                {`${formatCurrencyValue(available, currency)} ${currency}`}
              </StatisticItem>
            </div>
            <div className="wallet-details__item">
              <StatisticItem label={t("wallet-widget.invested-value")}>
                {`${formatCurrencyValue(invested, currency)} ${currency}`}
              </StatisticItem>
            </div>
            <div className="wallet-details__item">
              <StatisticItem label={t("wallet-widget.pending-value")}>
                {`${formatCurrencyValue(pending, currency)} ${currency}`}
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
      </React.Fragment>
    );
  }
}

export default translate()(WalletWidget);
