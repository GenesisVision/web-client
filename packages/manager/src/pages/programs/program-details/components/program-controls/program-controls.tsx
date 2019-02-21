//import "./program-details-description.scss";

import React, { Component } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

import InvestmentProgramControls from "./investment-program-controls";

interface IProgramControlsProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;

  canCloseProgram: boolean;
  isOwnProgram: boolean;
  ClosePeriodContainer: any;
  CloseProgramContainer: any;
  ProgramDepositContainer: any;
  ProgramDetailContext: any;
  AssetEditContainer: any;
  canInvest: boolean;
  canWithdraw: boolean;
  programDescription: any;
}

interface IProgramControlsState {
  isOpenInvestmentPopup: boolean;
  isOpenCloseProgramPopup: boolean;
  isOpenEditProgramPopup: boolean;
  isOpenClosePeriodPopup: boolean;
}

class ProgramControls extends Component<
  IProgramControlsProps & InjectedTranslateProps,
  IProgramControlsState
> {
  state = {
    isOpenInvestmentPopup: false,
    isOpenCloseProgramPopup: false,
    isOpenEditProgramPopup: false,
    isOpenClosePeriodPopup: false
  };

  render() {
    const {
      isOpenInvestmentPopup,
      isOpenCloseProgramPopup,
      isOpenEditProgramPopup,
      isOpenClosePeriodPopup
    } = this.state;
    const {
      t,
      canCloseProgram,
      isOwnProgram,
      ClosePeriodContainer,
      CloseProgramContainer,
      ProgramDepositContainer,
      ProgramDetailContext,
      AssetEditContainer,
      canInvest,
      canWithdraw,
      programDescription,
      isAuthenticated,
      redirectToLogin
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
      // ProgramFollowContainer &&
      // ProgramUnfollowContainer &&
      programDescription.isSignalProgram;

    return (
      <div className="program-details-description__controls">
        <div className="program-details-description__col">
          <InvestmentProgramControls
            programDescription={programDescription}
            canCloseProgram={canCloseProgram}
            isOwnProgram={isOwnProgram}
            ClosePeriodContainer={ClosePeriodContainer}
            CloseProgramContainer={CloseProgramContainer}
            ProgramDepositContainer={ProgramDepositContainer}
            ProgramDetailContext={ProgramDetailContext}
            AssetEditContainer={AssetEditContainer}
            canInvest={canInvest}
            canWithdraw={canWithdraw}
            isAuthenticated={isAuthenticated}
            redirectToLogin={redirectToLogin}
          />
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
              {/* {programDescription.personalProgramDetails.isFollowSignals ? (
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
              )} */}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default translate()(ProgramControls);
