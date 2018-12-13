import "shared/components/details/details-description-section/details-description/details-description.scss";

import { GVButton } from "gv-react-components";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/details-notificaton";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import Hint from "shared/components/hint/hint";
import Popover from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { STATUS } from "shared/constants/constants";
import platformApi from "shared/services/api-client/platform-api";
import {
  composeManagerDetailsUrl,
  composeProgramNotificationsUrl
} from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

class ProgramDetailsDescription extends PureComponent {
  state = {
    isOpenInvestmentPopup: false,
    isOpenCloseProgramPopup: false,
    isOpenEditProgramPopup: false,
    isOpenClosePeriodPopup: false,
    isOpenAboutLevels: false,
    anchor: null,
    investmentsLimits: {}
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
  handleOpenCloseProgramPopup = () => {
    this.setState({ isOpenCloseProgramPopup: true });
  };
  handleCloseCloseProgramPopup = () => {
    this.setState({ isOpenCloseProgramPopup: false });
  };
  handleApplyCloseProgramPopup = updateDetails => () => {
    updateDetails();
  };
  handleOpenEditProgramPopup = () => {
    this.setState({ isOpenEditProgramPopup: true });
  };
  handleCloseEditProgramPopup = () => {
    this.setState({ isOpenEditProgramPopup: false });
  };
  handleApplyEditProgramPopup = updateDetails => () => {
    updateDetails();
  };

  handleOpenClosePeriodPopup = () => {
    this.setState({ isOpenClosePeriodPopup: true });
  };
  handleCloseClosePeriodPopup = () => {
    this.setState({ isOpenClosePeriodPopup: false });
  };
  handleApplyClosePeriodPopup = updateDetails => () => {
    updateDetails();
  };
  componentDidMount() {
    platformApi.v10PlatformLevelsGet({currency: "GVT"}).then(data => {
      this.setState({ investmentsLimits: data.levels });
    });
  };
  getCurrentLimit(currentLevel) {
    return this.state.investmentsLimits
      .find(LevelInfo => LevelInfo.level === currentLevel)
      .investmentLimit;
  };
  render() {
    const {
      isOpenInvestmentPopup,
      isOpenCloseProgramPopup,
      isOpenEditProgramPopup,
      isOpenClosePeriodPopup,
      isOpenAboutLevels,
      anchor,
      investmentsLimits
    } = this.state;
    const {
      t,
      role,
      status,
      isFavorite,
      canCloseProgram,
      hasNotifications,
      isOwnProgram,
      onReinvestingClick,
      isReinvestPending,
      isInvested,
      ProgramReinvestingWidget,
      ClosePeriodContainer,
      CloseProgramContainer,
      ProgramDepositContainer,
      AboutLevelsContainerComponent,
      ProgramDetailContext,
      AssetEditContainer,
      PROGRAM,
      ProgramWithdrawContainer,
      canInvest,
      canWithdraw,
      programDescription,
      onFavoriteClick,
      investmentData,
      onChangeInvestmentStatus,
      isReinvest
    } = this.props;

    const composeEditInfo = {
      id: programDescription.id,
      title: programDescription.title,
      description: programDescription.description,
      logo: {
        src: programDescription.logo
      }
    };

    const title = programDescription.title;
    return (
      <div className="details-description">
        <div className="details-description__left">
          <div className="details-description__avatar">
            <AssetAvatar
              url={programDescription.logo}
              level={programDescription.level}
              alt={title}
              size="big"
              color={programDescription.color}
              onClickLevel={this.handleOpenDropdown}
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
                <h4 className="popover-levels__title">
                  {t("program-details-page.popover.genesis-level")}{" "}
                  {programDescription.level}
                </h4>
                {programDescription.rating.canLevelUp && (
                  <StatisticItem accent label={t("level-tooltip.level-up")}>
                    {t("level-tooltip.top10")}
                  </StatisticItem>
                )}

                {investmentsLimits.length && (
                  <StatisticItem
                    accent
                    label={t("program-details-page.popover.invest-limit")}>
                    <NumberFormat
                      value={formatValue(this.getCurrentLimit(programDescription.level))}
                      thousandSeparator={" "}
                      displayType="text"
                      suffix={` GVT`}
                    />
                  </StatisticItem>
                )}
              </div>
              <div className="popover-levels__block popover-levels__text-block">
                <div className="popover-levels__text">
                  {t("program-details-page.popover.text")}
                </div>
                <GVButton
                  variant="text"
                  onClick={this.handleOpenAboutLevels}
                  color="secondary"
                  className="popover-levels__about"
                >
                  {t("program-details-page.popover.about-levels")} &#8250;
                </GVButton>
              </div>
            </div>
          </Popover>
          <AboutLevelsContainerComponent
            open={isOpenAboutLevels}
            onClose={this.handleCloseAboutLevels}
          />
        </div>
        <div className="details-description__main">
          <h1 className="title-small-padding">{title}</h1>
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
              className="details-description__author-btn"
            >
              {programDescription.manager.username}
            </GVButton>
          </Link>

          <div className="details-description__info">
            <h4 className="details-description__subheading">
              {t("program-details-page.description.strategy")}
            </h4>
            <div className="details-description__text">
              {programDescription.description}
            </div>
            <div className="details-description__short-statistic">
              <StatisticItem
                label={t("program-details-page.description.avToInvest")}
                className={"details-description__short-statistic-item"}
                accent
              >
                <NumberFormat
                  value={formatValue(programDescription.availableInvestment, 2)}
                  displayType="text"
                  suffix={` GVT`}
                />
              </StatisticItem>
              <StatisticItem
                label={t("program-details-page.description.entryFee")}
                className={"details-description__short-statistic-item"}
                accent
              >
                {programDescription.level < 3 ? (
                  <Hint
                    content={
                      <NumberFormat
                        value={formatValue(programDescription.entryFee, 2)}
                        displayType="text"
                        prefix="0 % ("
                        suffix=" %)"
                      />
                    }
                    className="details-description__short-statistic-hint"
                    vertical={"bottom"}
                    tooltipContent={t(
                      "program-details-page.description.entry-fee-levels"
                    )}
                  />
                ) : (
                  <NumberFormat
                    value={formatValue(programDescription.entryFee, 2)}
                    displayType="text"
                    suffix=" %"
                  />
                )}
              </StatisticItem>
              <StatisticItem
                label={t("program-details-page.description.successFee")}
                className={"details-description__short-statistic-item"}
                accent
              >
                <NumberFormat
                  value={formatValue(programDescription.successFee, 2)}
                  displayType="text"
                  suffix=" %"
                />
              </StatisticItem>
            </div>
            {(isOwnProgram || canInvest || canWithdraw) && (
              <Fragment>
                <div className="details-description__investing-container">
                  <div className="details-description__invest-button-container">
                    <GVButton
                      className="details-description__invest-btn"
                      onClick={this.handleOpenInvestmentPopup}
                      disabled={
                        !programDescription.personalProgramDetails ||
                        !programDescription.personalProgramDetails.canInvest
                      }
                    >
                      {t("program-details-page.description.invest")}
                    </GVButton>
                    {CloseProgramContainer && (
                      <GVButton
                        className="details-description__invest-btn"
                        color="secondary"
                        variant="outlined"
                        onClick={this.handleOpenCloseProgramPopup}
                        disabled={
                          !programDescription.personalProgramDetails
                            .canCloseProgram
                        }
                      >
                        {t("program-details-page.description.close-program")}
                      </GVButton>
                    )}
                    {ClosePeriodContainer && (
                      <GVButton
                        className="details-description__invest-btn"
                        color="secondary"
                        variant="outlined"
                        onClick={this.handleOpenClosePeriodPopup}
                        disabled={
                          !programDescription.personalProgramDetails
                            .canClosePeriod
                        }
                      >
                        {t("program-details-page.close-period.title")}
                      </GVButton>
                    )}
                    {AssetEditContainer && (
                      <GVButton
                        className="details-description__invest-btn"
                        color="secondary"
                        variant="outlined"
                        onClick={this.handleOpenEditProgramPopup}
                        disabled={!canCloseProgram}
                      >
                        {t("program-details-page.description.edit-program")}
                      </GVButton>
                    )}
                    {ProgramReinvestingWidget && isInvested && canInvest && (
                      <ProgramReinvestingWidget
                        className="details-description__reinvest"
                        toggleReinvesting={onReinvestingClick}
                        isReinvesting={isReinvest}
                        disabled={isReinvestPending}
                      />
                    )}
                  </div>
                </div>
                {programDescription.personalProgramDetails &&
                  status !== STATUS.ENDED && (
                    <DetailsInvestment
                      WithdrawContainer={ProgramWithdrawContainer}
                      notice={t(
                        "program-details-page.description.withdraw-notice-text"
                      )}
                      canWithdraw={canWithdraw}
                      assetCurrency={programDescription.currency}
                      onChangeInvestmentStatus={onChangeInvestmentStatus}
                      asset={PROGRAM}
                      role={role}
                      {...investmentData}
                    />
                  )}
              </Fragment>
            )}
            <ProgramDetailContext.Consumer>
              {({ updateDetails }) => (
                <Fragment>
                  <ProgramDepositContainer
                    currency={programDescription.currency}
                    open={isOpenInvestmentPopup}
                    type={"program"}
                    id={programDescription.id}
                    onClose={this.handleCloseInvestmentPopup}
                    onInvest={updateDetails}
                  />
                  {ClosePeriodContainer && (
                    <ClosePeriodContainer
                      open={isOpenClosePeriodPopup}
                      onCancel={this.handleCloseClosePeriodPopup}
                      onApply={this.handleApplyClosePeriodPopup(updateDetails)}
                      id={programDescription.id}
                    />
                  )}

                  {CloseProgramContainer && (
                    <CloseProgramContainer
                      open={isOpenCloseProgramPopup}
                      onClose={this.handleCloseCloseProgramPopup}
                      onCancel={this.handleCloseCloseProgramPopup}
                      onApply={this.handleApplyCloseProgramPopup(updateDetails)}
                      id={programDescription.id}
                    />
                  )}

                  {AssetEditContainer && (
                    <AssetEditContainer
                      open={isOpenEditProgramPopup}
                      info={composeEditInfo}
                      onClose={this.handleCloseEditProgramPopup}
                      onApply={this.handleApplyEditProgramPopup(updateDetails)}
                      type={PROGRAM}
                    />
                  )}
                </Fragment>
              )}
            </ProgramDetailContext.Consumer>
          </div>
        </div>
        <div className="details-description__right">
          <DetailsFavorite
            id={programDescription.id}
            isFavorite={isFavorite}
            toggleFavorite={onFavoriteClick}
          />
          <DetailsNotification
            title={title}
            url={composeProgramNotificationsUrl(programDescription.url)}
            hasNotifications={hasNotifications}
          />
        </div>
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescription);
