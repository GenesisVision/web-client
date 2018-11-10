import "./fund-details-description.scss";

import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import { GVButton } from "gv-react-components";
import FundDepositContainer from "modules/fund-deposit/fund-deposit-container";
import { FundDetailContext } from "pages/funds/fund-details/fund-details.page";
import { composeManagerDetailsUrl, composeFundNotificationsUrl } from "shared/utils/compose-url";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { formatValue } from "shared/utils/formatter";
import FundDetailsInvestment from "../fund-details-investment/fund-details-investment";
import FundDetailsFavorite from "./fund-details-favorite";
import FundDetailsNotification from "./fund-details-notificaton";
import AssetEditContainer from "../../../../../../modules/asset-edit/asset-edit-container";
import { FUND } from "../../../../../../modules/asset-edit/asset-edit.constants";

class FundDetailsDescription extends PureComponent {
  state = {
    isOpenInvestmentPopup: false,
    isOpenAboutLevels: false,
    isOpenEditFundPopup: false,
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
  handleOpenEditFundPopup = () => {
    this.setState({ isOpenEditFundPopup: true });
  };
  handleCloseEditFundPopup = () => {
    this.setState({ isOpenEditFundPopup: false });
  };
  handleApplyEditFundPopup = updateDetails => () => {
    updateDetails();
  };

  render() {
    const { isOpenInvestmentPopup, isOpenEditFundPopup } = this.state;
    const {
      t,
      canWithdraw,
      fundDescription,
      onFavoriteClick,
      isFavoritePending,
      composeInvestmentData,
      onChangeInvestmentStatus,
      isOwnProgram
    } = this.props;
    const isFavorite =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.isFavorite;

    const canCloseProgram =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.canCloseProgram;

    const hasNotifications =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.hasNotifications;

    const composeEditInfo = {
      id: fundDescription.id,
      title: fundDescription.title,
      description: fundDescription.description,
      logo: {
        src: fundDescription.logo
      }
    };

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
            {isOwnProgram && (
              <Fragment>
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
                  <GVButton
                    className="fund-details-description__invest-btn"
                    color="secondary"
                    variant="outlined"
                    onClick={this.handleOpenEditFundPopup}
                    disabled={!canCloseProgram}
                  >
                    {t("fund-details-page.description.edit-fund")}
                  </GVButton>
                  <FundDetailContext.Consumer>
                    {({ updateDetails }) => (
                      <Fragment>
                        <FundDepositContainer
                          open={isOpenInvestmentPopup}
                          id={fundDescription.id}
                          type={"fund"}
                          onClose={this.handleCloseInvestmentPopup}
                          onInvest={updateDetails}
                        />
                        <AssetEditContainer
                          open={isOpenEditFundPopup}
                          info={composeEditInfo}
                          onClose={this.handleCloseEditFundPopup}
                          onApply={this.handleApplyEditFundPopup(updateDetails)}
                          type={FUND}
                        />
                      </Fragment>
                    )}
                  </FundDetailContext.Consumer>
                </div>
                <FundDetailsInvestment
                  canWithdraw={canWithdraw}
                  className={"fund-details-description__your-investment"}
                  fundCurrency={"GVT"}
                  {...composeInvestmentData(fundDescription)}
                  onChangeInvestmentStatus={onChangeInvestmentStatus}
                />
              </Fragment>
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
            hasNotifications={hasNotifications}
          />
        </div>
      </div>
    );
  }
}

export default translate()(FundDetailsDescription);
