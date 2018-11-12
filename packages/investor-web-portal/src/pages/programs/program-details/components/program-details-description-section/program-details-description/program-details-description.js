import "./program-details-description.scss";

import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Popover from "shared/components/popover/popover";
import { GVButton } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import AboutLevelsContainerComponent from "pages/app/components/about-levels/about-levels-container";
import { composeManagerDetailsUrl, composeProgramNotificationsUrl } from "shared/utils/compose-url";
import { ProgramDetailContext } from "pages/programs/program-details/program-details.page";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { formatValue } from "shared/utils/formatter";

import ProgramDetailsInvestment from "../program-details-investment/program-details-investment";
import ProgramDetailsFavorite from "./program-details-favorite";
import ProgramDetailsNotification from "./program-details-notificaton";

class ProgramDetailsDescription extends PureComponent {
  state = {
    isOpenInvestmentPopup: false,
    isOpenAboutLevels: false,
    anchor: null
  };

  handleOpenAboutLevels = () => {
    this.setState({ isOpenAboutLevels: true });
    this.handleCloseDropdown();
  };
  handleCloseAboutLevels = () => this.setState({ isOpenAboutLevels: false });
  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });
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
    const { isOpenInvestmentPopup, isOpenAboutLevels, anchor } = this.state;
    const {
      t,
      isInvested,
      canInvest,
      canWithdraw,
      programDescription,
      onReinvestingClick,
      onFavoriteClick,
      isReinvestPending,
      isFavoritePending,
      composeInvestmentData,
      onChangeInvestmentStatus
    } = this.props;

    const isFavorite =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.isFavorite;
    const title = programDescription.title;
    return (
      <div className="program-details-description">
        <div className="program-details-description__left">
          <div
            className="program-details-description__avatar"
            onClick={this.handleOpenDropdown}
          >
            <AssetAvatar
              url={programDescription.logo}
              level={programDescription.level}
              alt={title}
              size="big"
              color={programDescription.color}
            />
          </div>
          <Popover
            horizontal="left"
            vertical="bottom"
            anchorEl={anchor}
            noPadding
            onClose={this.handleCloseDropdown}
          >
            <div className="popover-levels">
              <div className="popover-levels__block">
                <div className="popover-levels__title">
                  {t("program-details-page.popover.genesis-level")}{" "}
                  {programDescription.level}
                </div>
                <div className="popover-levels__subtitle">
                  {t("program-details-page.popover.invest-limit")}
                </div>
                <div className="popover-levels__balance">
                  <NumberFormat
                    value={formatValue(
                      programDescription.availableInvestment,
                      5
                    )}
                    displayType="text"
                    suffix={` GVT`}
                  />
                </div>
              </div>
              <div className="popover-levels__block popover-levels__text-block">
                <div className="popover-levels__text">
                  {t("program-details-page.popover.text")}
                </div>
                {/*<GVButton
                  variant="text"
                  onClick={this.handleOpenAboutLevels}
                  color="secondary"
                  className="popover-levels__about"
                >
                  {t("program-details-page.popover.about-levels")} &#8250;
                </GVButton>*/}
              </div>
            </div>
          </Popover>
          <AboutLevelsContainerComponent
            open={isOpenAboutLevels}
            onClose={this.handleCloseAboutLevels}
          />
        </div>
        <div className="program-details-description__main">
          <div className="program-details-description__heading">{title}</div>
          <Link
            to={{
              pathname: composeManagerDetailsUrl(
                programDescription.manager.url
              ),
              state: `/ ${title}`
            }}
          >
            <GVButton
              variant="text"
              className="program-details-description__author-btn"
            >
              {programDescription.manager.username}
            </GVButton>
          </Link>

          <div className="program-details-description__info">
            <div className="program-details-description__subheading">
              {t("program-details-page.description.strategy")}
            </div>
            <div className="program-details-description__text">
              {programDescription.description}
            </div>
            <div className="program-details-description__short-statistic">
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.avToInvest")}
                </span>
                <NumberFormat
                  value={formatValue(programDescription.availableInvestment, 2)}
                  displayType="text"
                  suffix={` GVT`}
                />
              </div>
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.entryFee")}
                </span>
                <NumberFormat
                  value={formatValue(programDescription.entryFee, 2)}
                  displayType="text"
                  suffix=" %"
                />
              </div>
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.successFee")}
                </span>
                <NumberFormat
                  value={formatValue(programDescription.successFee, 2)}
                  displayType="text"
                  suffix=" %"
                />
              </div>
            </div>
            <div className="program-details-description__investing-container">
              <div className="program-details-description__invest-button-container">
                <GVButton
                  className="program-details-description__invest-btn"
                  onClick={this.handleOpenInvestmentPopup}
                  disabled={
                    !programDescription.personalProgramDetails ||
                    !programDescription.personalProgramDetails.canInvest
                  }
                >
                  {t("program-details-page.description.invest")}
                </GVButton>
              </div>
              {isInvested &&
                canInvest && (
                  <ProgramReinvestingWidget
                    className="program-details-description__reinvest"
                    toggleReinvesting={onReinvestingClick}
                    isReinvesting={
                      programDescription.personalProgramDetails.isReinvest
                    }
                    disabled={isReinvestPending}
                  />
                )}
            </div>
            {isInvested && (
              <ProgramDetailsInvestment
                canWithdraw={canWithdraw}
                className={"program-details-description__your-investment"}
                programCurrency={programDescription.currency}
                {...composeInvestmentData(programDescription)}
                onChangeInvestmentStatus={onChangeInvestmentStatus}
              />
            )}
            <ProgramDetailContext.Consumer>
              {({ updateDetails }) => (
                <ProgramDepositContainer
                  currency={programDescription.currency}
                  open={isOpenInvestmentPopup}
                  type={"program"}
                  id={programDescription.id}
                  onClose={this.handleCloseInvestmentPopup}
                  onInvest={updateDetails}
                />
              )}
            </ProgramDetailContext.Consumer>
          </div>
        </div>
        <div className="program-details-description__right">
          <ProgramDetailsFavorite
            programId={programDescription.id}
            isFavorite={isFavorite}
            toggleFavorite={onFavoriteClick}
            disabled={isFavoritePending}
          />
          <ProgramDetailsNotification
            title={title}
            url={composeProgramNotificationsUrl(programDescription.url)}
            disabled={isFavoritePending}
          />
        </div>
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescription);
