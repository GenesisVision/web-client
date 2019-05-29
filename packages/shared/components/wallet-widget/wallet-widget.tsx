import "./wallet-widget.scss";

import classNames from "classnames";
import { WalletsGrandTotal } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import Popover from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import withLoader from "shared/decorators/with-loader";
import { CurrentWallet } from "shared/modules/wallet-add-funds/components/wallet-add-funds-form";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import { formatCurrencyValue } from "shared/utils/formatter";

class _WalletWidget extends React.PureComponent<
  IWalletWidgetProps & InjectedTranslateProps,
  IWalletWidgetState
> {
  state = {
    anchorEl: undefined,
    isOpenAddFundsPopup: false
  };
  handleOpenDetails = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    this.setState({ anchorEl: event.currentTarget });

  handleCloseDetails = () => this.setState({ anchorEl: undefined });

  handleOpenAddFundsPopup = () => this.setState({ isOpenAddFundsPopup: true });

  handleClodsAddFundsPopup = () =>
    this.setState({ isOpenAddFundsPopup: false });

  render() {
    const { t, info, className } = this.props;
    const {
      currencyCcy: currency,
      availableCcy: available,
      investedCcy: invested,
      pendingCcy: pending,
      totalCcy: totalBalance
    } = info;
    const currentWallet: CurrentWallet = { available, currency };
    return (
      <>
        <div className={classNames("wallet-widget", className)}>
          <div
            className="wallet-widget__wallet"
            onClick={this.handleOpenDetails}
          >
            <WalletIcon primary={this.state.anchorEl !== undefined} />
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
              <StatisticItem label={t("wallet-widget.invested")}>
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
      </>
    );
  }
}

interface IWalletWidgetProps {
  info: WalletsGrandTotal;
  className?: string;
}

interface IWalletWidgetState {
  anchorEl?: EventTarget;
  isOpenAddFundsPopup: boolean;
}

const WalletWidget = withLoader(translate()(_WalletWidget));
export default WalletWidget;
