import "shared/components/details/details-description-section/details-description/details-description.scss";

import { GVButton } from "gv-react-components";
import moment from "moment";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsStatisticItem from "shared/components/details-statistic-item/details-statistic-item";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/details-notificaton";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import {
  composeFundNotificationsUrl,
  composeManagerDetailsUrl
} from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

class FundDetailsDescription extends PureComponent {
  state = {
    isOpenInvestmentPopup: false,
    isOpenAboutLevels: false,
    isOpenEditFundPopup: false,
    isOpenReallocateFundPopup: false,
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
  handleOpenReallocateFundPopup = () => {
    this.setState({ isOpenReallocateFundPopup: true });
  };
  handleCloseReallocateFundPopup = updateDetails => () => {
    this.setState({ isOpenReallocateFundPopup: false });
    updateDetails();
  };

  render() {
    const {
      isOpenInvestmentPopup,
      isOpenEditFundPopup,
      isOpenReallocateFundPopup
    } = this.state;
    const {
      t,
      possibleReallocationTime,
      canReallocate,
      status,
      isFavorite,
      canCloseProgram,
      hasNotifications,
      isOwnProgram,
      FUND,
      ReallocateContainer,
      AssetEditContainer,
      FundDetailContext,
      FundDepositContainer,
      FundWithdrawContainer,
      canWithdraw,
      fundDescription,
      onFavoriteClick,
      isFavoritePending,
      investmentData,
      onChangeInvestmentStatus,
      canInvest
    } = this.props;

    const composeEditInfo = {
      id: fundDescription.id,
      title: fundDescription.title,
      description: fundDescription.description,
      logo: {
        src: fundDescription.logo
      }
    };

    return (
      <div className="details-description">
        <div className="details-description__left">
          <div
            className="details-description__avatar"
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
        <div className="details-description__main">
          <div className="details-description__heading">
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
              className="details-description__author-btn"
            >
              {fundDescription.manager.username}
            </GVButton>
          </Link>
          <div className="details-description__info-block">
            <div className="details-description__subheading">
              {t("fund-details-page.description.assets")}
            </div>
            <div>
              <FundAssetContainer
                type={"large"}
                assets={fundDescription.currentAssets}
                size={7}
              />
            </div>
          </div>
          <div className="details-description__info">
            <div className="details-description__subheading">
              {t("fund-details-page.description.strategy")}
            </div>
            <div className="details-description__text">
              {fundDescription.description}
            </div>
            <div className="details-description__short-statistic">
              <DetailsStatisticItem
                label={t("fund-details-page.description.entryFee")}
                className={"details-description__short-statistic-item"}
                accent
              >
                <NumberFormat
                  value={formatValue(fundDescription.entryFee)}
                  displayType="text"
                  suffix=" %"
                />
              </DetailsStatisticItem>
              <DetailsStatisticItem
                label={t("fund-details-page.description.exitFee")}
                className={"details-description__short-statistic-item"}
                accent
              >
                <NumberFormat
                  value={formatValue(fundDescription.exitFee)}
                  displayType="text"
                  suffix=" %"
                />
              </DetailsStatisticItem>
            </div>
            {(isOwnProgram || canInvest) && (
              <Fragment>
                <div className="details-description__invest-button-container">
                  <GVButton
                    className="details-description__invest-btn"
                    onClick={this.handleOpenInvestmentPopup}
                    disabled={!canInvest}
                  >
                    {t("fund-details-page.description.invest")}
                  </GVButton>
                  {isOwnProgram && (
                    <Fragment>
                      <GVButton
                        className="details-description__invest-btn"
                        color="secondary"
                        variant="outlined"
                        onClick={this.handleOpenEditFundPopup}
                        disabled={!canCloseProgram}
                      >
                        {t("fund-details-page.description.edit-fund")}
                      </GVButton>
                      <div className="details-description__reallocate-container">
                        <GVButton
                          className="details-description__invest-btn"
                          color="secondary"
                          variant="outlined"
                          onClick={this.handleOpenReallocateFundPopup}
                          disabled={!canReallocate}
                        >
                          {t("fund-details-page.description.reallocate")}
                        </GVButton>
                        {!canReallocate && possibleReallocationTime && (
                          <div className="details-description__reallocate-message">
                            {t(
                              "fund-details-page.description.disable-reallocation-message"
                            )}{" "}
                            {moment(possibleReallocationTime).format(
                              "D MMM YYYY"
                            )}
                          </div>
                        )}
                      </div>
                    </Fragment>
                  )}
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
                        {AssetEditContainer && (
                          <AssetEditContainer
                            open={isOpenEditFundPopup}
                            info={composeEditInfo}
                            onClose={this.handleCloseEditFundPopup}
                            onApply={this.handleApplyEditFundPopup(
                              updateDetails
                            )}
                            type={FUND}
                          />
                        )}
                        {ReallocateContainer && (
                          <ReallocateContainer
                            key={isOpenReallocateFundPopup}
                            id={fundDescription.id}
                            open={isOpenReallocateFundPopup}
                            onClose={this.handleCloseReallocateFundPopup(
                              updateDetails
                            )}
                            assets={fundDescription.currentAssets}
                          />
                        )}
                      </Fragment>
                    )}
                  </FundDetailContext.Consumer>
                </div>
              </Fragment>
            )}
            {fundDescription.personalFundDetails && status !== "Ended" && (
              <DetailsInvestment
                WithdrawContainer={FundWithdrawContainer}
                canWithdraw={canWithdraw}
                className={"details-description__your-investment"}
                assetCurrency={"GVT"}
                {...investmentData}
                onChangeInvestmentStatus={onChangeInvestmentStatus}
              />
            )}
          </div>
        </div>
        <div className="details-description__right">
          <DetailsFavorite
            id={fundDescription.id}
            isFavorite={isFavorite}
            toggleFavorite={onFavoriteClick}
          />
          <DetailsNotification
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
