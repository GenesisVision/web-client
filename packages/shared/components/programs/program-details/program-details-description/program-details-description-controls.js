import "./program-details-description.scss";

import { GVButton } from "gv-react-components";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Hint from "shared/components/hint/hint";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { FOLLOW_TYPE } from "shared/constants/constants";
import { formatValue } from "shared/utils/formatter";

class ProgramDetailsDescriptionControls extends React.Component {
  state = {
    isOpenFollowPopup: false,
    isOpenUnfollowPopup: false,
    isOpenInvestmentPopup: false,
    isOpenCloseProgramPopup: false,
    isOpenEditProgramPopup: false,
    isOpenClosePeriodPopup: false
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
  handleOpenFollowPopup = () => {
    this.setState({ isOpenFollowPopup: true });
  };
  handleCloseFollowPopup = () => {
    this.setState({ isOpenFollowPopup: false });
  };
  handleOpenUnfollowPopup = () => {
    this.setState({ isOpenUnfollowPopup: true });
  };
  handleCloseUnfollowPopup = () => {
    this.setState({ isOpenUnfollowPopup: false });
  };
  handleApplyUnfollowPopup = updateDetails => () => {
    updateDetails();
  };
  handleApplyFollowPopup = updateDetails => () => {
    updateDetails();
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

  render() {
    const {
      isOpenFollowPopup,
      isOpenUnfollowPopup,
      isOpenInvestmentPopup,
      isOpenCloseProgramPopup,
      isOpenEditProgramPopup,
      isOpenClosePeriodPopup
    } = this.state;
    const {
      t,
      canCloseProgram,
      isOwnProgram,
      ProgramFollowContainer,
      ProgramUnfollowContainer,
      ClosePeriodContainer,
      CloseProgramContainer,
      ProgramDepositContainer,
      ProgramDetailContext,
      AssetEditContainer,
      PROGRAM,
      canInvest,
      canWithdraw,
      programDescription
    } = this.props;
    const composeEditInfo = {
      id: programDescription.id,
      title: programDescription.title,
      description: programDescription.description,
      logo: {
        src: programDescription.logo
      }
    };

    const isAvailableFollowingTrades =
      ProgramFollowContainer &&
      ProgramUnfollowContainer &&
      programDescription.isSignalProgram;

    return (
      <div className="program-details-description__controls">
        <div className="program-details-description__col">
          <div className="program-details-description__statistic-container">
            <StatisticItem
              label={t("program-details-page.description.avToInvest")}
              className="program-details-description__short-statistic-item"
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
              className="program-details-description__short-statistic-item"
              accent
            >
              {programDescription.entryFeeSelected !==
              programDescription.entryFeeCurrent ? (
                <Hint
                  content={
                    <NumberFormat
                      value={formatValue(
                        programDescription.entryFeeSelected,
                        2
                      )}
                      displayType="text"
                      prefix={`${programDescription.entryFeeCurrent} % (`}
                      suffix=" %)"
                    />
                  }
                  className="program-details-description__short-statistic-hint"
                  vertical={"bottom"}
                  tooltipContent={t(
                    "program-details-page.description.entry-fee-levels"
                  )}
                />
              ) : (
                <NumberFormat
                  value={formatValue(programDescription.entryFeeCurrent, 2)}
                  displayType="text"
                  suffix=" %"
                />
              )}
            </StatisticItem>
            <StatisticItem
              label={t("program-details-page.description.successFee")}
              className="program-details-description__short-statistic-item"
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
            <div className="program-details-description__button-container">
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
              {CloseProgramContainer && (
                <GVButton
                  className="program-details-description__invest-btn"
                  color="secondary"
                  variant="outlined"
                  onClick={this.handleOpenCloseProgramPopup}
                  disabled={
                    !programDescription.personalProgramDetails.canCloseProgram
                  }
                >
                  {t("program-details-page.description.close-program")}
                </GVButton>
              )}
              {ClosePeriodContainer && (
                <GVButton
                  className="program-details-description__invest-btn"
                  color="secondary"
                  variant="outlined"
                  onClick={this.handleOpenClosePeriodPopup}
                  disabled={
                    !programDescription.personalProgramDetails.canClosePeriod
                  }
                >
                  {t("program-details-page.close-period.title")}
                </GVButton>
              )}
              {AssetEditContainer && (
                <GVButton
                  className="program-details-description__invest-btn"
                  color="secondary"
                  variant="outlined"
                  onClick={this.handleOpenEditProgramPopup}
                  disabled={!canCloseProgram}
                >
                  {t("program-details-page.description.edit-program")}
                </GVButton>
              )}
            </div>
          )}
        </div>
        {isAvailableFollowingTrades ? (
          <div className="program-details-description__col program-details-description__col--small-size">
            <div className="program-details-description__statistic-container">
              <StatisticItem
                label={t("program-details-page.description.successFee")}
                className="program-details-description__short-statistic-item"
                accent
              >
                <NumberFormat
                  value={formatValue(programDescription.signalSuccessFee, 2)}
                  displayType="text"
                  suffix=" %"
                />
              </StatisticItem>
              <StatisticItem
                label={t("program-details-page.description.subscriptionFee")}
                className="program-details-description__short-statistic-item"
                accent
              >
                <NumberFormat
                  value={formatValue(
                    programDescription.signalSubscriptionFee,
                    2
                  )}
                  displayType="text"
                  suffix=" GVT"
                />
              </StatisticItem>
            </div>
            <div className="program-details-description__button-container">
              {programDescription.personalProgramDetails.isFollowSignals ? (
                <GVButton
                  className="program-details-description__invest-btn"
                  onClick={this.handleOpenUnfollowPopup}
                >
                  {t("program-details-page.description.unfollow")}
                </GVButton>
              ) : (
                <GVButton
                  className="program-details-description__invest-btn"
                  onClick={this.handleOpenFollowPopup}
                >
                  {t("program-details-page.description.follow-trade")}
                </GVButton>
              )}
            </div>
          </div>
        ) : null}
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
              {ProgramFollowContainer && (
                <ProgramFollowContainer
                  programName={programDescription.title}
                  type={FOLLOW_TYPE.CREATE}
                  id={programDescription.id}
                  open={isOpenFollowPopup}
                  currency={programDescription.currency}
                  onClose={this.handleCloseFollowPopup}
                  onApply={this.handleApplyFollowPopup(updateDetails)}
                />
              )}
              {ProgramUnfollowContainer && (
                <ProgramUnfollowContainer
                  open={isOpenUnfollowPopup}
                  id={programDescription.id}
                  onClose={this.handleCloseUnfollowPopup}
                  onApply={this.handleApplyUnfollowPopup(updateDetails)}
                />
              )}
            </Fragment>
          )}
        </ProgramDetailContext.Consumer>
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescriptionControls);
