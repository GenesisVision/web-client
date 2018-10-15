import "./fund-details-description.scss";

import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { GVButton } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import { FUND_NOTIFICATIONS_ROUTE } from "pages/notifications/notifications.routes";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import replaceParams from "utils/replace-params";

import AssetContainer from "../../../../../../modules/funds-table/components/funds-table/asset/asset-container";
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
      fundDescription,
      onReinvestingClick,
      onFavoriteClick,
      isReinvestPending,
      isFavoritePending
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
            />
          </div>
        </div>
        <div className="fund-details-description__main">
          <div className="fund-details-description__heading">
            {fundDescription.title}
          </div>
          <div className="fund-details-description__info-block">
            <div className="fund-details-description__subheading">
              {t("fund-details-page.description.assets")}
            </div>
            <div className="fund-details-description__text">
              <AssetContainer
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
                  value={fundDescription.entryFee}
                  displayType="text"
                  suffix=" %"
                />
              </div>
              <div className="fund-details-description__short-statistic-item">
                <span className="fund-details-description__short-statistic-subheading">
                  Exit fee
                </span>
                <NumberFormat
                  value={fundDescription.exitFee}
                  displayType="text"
                  suffix=" %"
                />
              </div>
            </div>
            <div className="fund-details-description__invest-button-container">
              <GVButton
                className="fund-details-description__invest-btn"
                onClick={this.handleOpenInvestmentPopup}
              >
                {t("fund-details-page.description.invest")}
              </GVButton>
            </div>

            <ProgramDepositContainer
              open={isOpenInvestmentPopup}
              id={fundDescription.id}
              type={"fund"}
              onClose={this.handleCloseInvestmentPopup}
            />

            {isInvested && (
              <ProgramReinvestingWidget
                className="fund-details-description__reinvest"
                toggleReinvesting={onReinvestingClick}
                isReinvesting={
                  fundDescription.personalProgramDetails.isReinvest
                }
                disabled={isReinvestPending}
              />
            )}
          </div>
        </div>
        <div className="fund-details-description__right">
          <FundDetailsFavorite
            programId={fundDescription.id}
            isFavorite={isFavorite}
            toggleFavorite={onFavoriteClick}
            disabled={isFavoritePending}
          />
          <FundDetailsNotification
            url={composeFundNotificationsUrl(fundDescription.url)}
            disabled={isFavoritePending}
          />
        </div>
      </div>
    );
  }
}

export default translate()(FundDetailsDescription);
