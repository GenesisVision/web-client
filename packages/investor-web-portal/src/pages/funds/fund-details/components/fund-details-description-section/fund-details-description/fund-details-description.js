import "./fund-details-description.scss";

import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import { GVButton } from "gv-react-components";
import FundDepositContainer from "modules/fund-deposit/fund-deposit-container";
import { FundDetailContext } from "pages/funds/fund-details/fund-details.page";
import { composeManagerDetailsUrl } from "pages/manager/manager.page";
import { FUND_NOTIFICATIONS_ROUTE } from "pages/notifications/notifications.routes";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import replaceParams from "utils/replace-params";

import { formatValue } from "../../../../../../utils/formatter";
import FundDetailsInvestment from "../fund-details-investment/fund-details-investment";
import FundDetailsFavorite from "./fund-details-favorite";
import FundDetailsNotification from "./fund-details-notificaton";

export const composeFundNotificationsUrl = url => {
  return replaceParams(FUND_NOTIFICATIONS_ROUTE, {
    ":id": url
  });
};

class FundDetailsDescription extends PureComponent {
  state = {
    isOpenInvestmentPopup: false,
    isOpenAboutLevels: false,
    anchor: null
  };

  handleOpenInvestmentPopup = () => {
    const { isAuthenticated, redirectToLogin } = this.props;
    if (isAuthenticated) {
      this.setState({ isOpenInvestmentPopup: true });
    } else {
      redirectToLogin();
    }
  };

  handleCloseInvestmentPopup = () => {
    this.setState({ isOpenInvestmentPopup: false });
  };

  render() {
    const { isOpenInvestmentPopup } = this.state;
    const {
      t,
      isInvested,
      canWithdraw,
      fundDescription,
      onFavoriteClick,
      isFavoritePending,
      composeInvestmentData,
      onChangeInvestmentStatus
    } = this.props;
    const isFavorite =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.isFavorite;
    return (
      <div className="fund-details-description">
        <div className="fund-details-description__left">
          <div
            className="fund-details-description__avatar"
            onClick={this.handleOpenDropdown}
          >
            <AssetAvatar
              url={fundDescription.logo}
              level={fundDescription.level}
              alt={fundDescription.title}
              size="big"
              color={fundDescription.color}
            />
          </div>
        </div>
        <div className="fund-details-description__main">
          <div className="fund-details-description__heading">
            {fundDescription.title}
          </div>
          <Link
            to={{
              pathname: composeManagerDetailsUrl(fundDescription.manager.url),
              state: `/ ${fundDescription.title}`
            }}
          >
            <GVButton
              variant="text"
              className="fund-details-description__author-btn"
            >
              {fundDescription.manager.username}
            </GVButton>
          </Link>
          <div className="fund-details-description__info-block">
            <div className="fund-details-description__subheading">
              {t("fund-details-page.description.assets")}
            </div>
            <div className="fund-details-description__text">
              <FundAssetContainer
                type={"large"}
                assets={fundDescription.currentAssets}
                size={7}
              />
            </div>
          </div>
          <div className="fund-details-description__info">
            <div className="fund-details-description__info-block">
              <div className="fund-details-description__subheading">
                {t("fund-details-page.description.strategy")}
              </div>
              <div className="fund-details-description__text">
                {fundDescription.description}
              </div>
            </div>
            <div className="fund-details-description__short-statistic">
              <div className="fund-details-description__short-statistic-item">
                <span className="fund-details-description__short-statistic-subheading">
                  {t("fund-details-page.description.entryFee")}
                </span>
                <NumberFormat
                  value={formatValue(fundDescription.entryFee)}
                  displayType="text"
                  suffix=" %"
                />
              </div>
              <div className="fund-details-description__short-statistic-item">
                <span className="fund-details-description__short-statistic-subheading">
                  Exit fee
                </span>
                <NumberFormat
                  value={formatValue(fundDescription.exitFee)}
                  displayType="text"
                  suffix=" %"
                />
              </div>
            </div>
            <div className="fund-details-description__invest-button-container">
              <GVButton
                className="fund-details-description__invest-btn"
                onClick={this.handleOpenInvestmentPopup}
                disabled={
                  !fundDescription.personalFundDetails ||
                  !fundDescription.personalFundDetails.canInvest
                }
              >
                {t("fund-details-page.description.invest")}
              </GVButton>
              <FundDetailContext.Consumer>
                {({ updateDetails }) => (
                  <FundDepositContainer
                    open={isOpenInvestmentPopup}
                    id={fundDescription.id}
                    type={"fund"}
                    onClose={this.handleCloseInvestmentPopup}
                    onInvest={updateDetails}
                  />
                )}
              </FundDetailContext.Consumer>
            </div>
            {isInvested && (
              <FundDetailsInvestment
                canWithdraw={canWithdraw}
                className={"fund-details-description__your-investment"}
                fundCurrency={"GVT"}
                {...composeInvestmentData(fundDescription)}
                onChangeInvestmentStatus={onChangeInvestmentStatus}
              />
            )}
          </div>
        </div>
        <div className="fund-details-description__right">
          <FundDetailsFavorite
            fundId={fundDescription.id}
            isFavorite={isFavorite}
            toggleFavorite={onFavoriteClick}
            disabled={isFavoritePending}
          />
          <FundDetailsNotification
            title={fundDescription.title}
            url={composeFundNotificationsUrl(fundDescription.url)}
            disabled={isFavoritePending}
          />
        </div>
      </div>
    );
  }
}

export default translate()(FundDetailsDescription);
