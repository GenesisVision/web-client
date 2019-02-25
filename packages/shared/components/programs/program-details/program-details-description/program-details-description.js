import "./program-details-description.scss";

import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { STATUS } from "shared/constants/constants";
import platformApi from "shared/services/api-client/platform-api";

import ProgramDetailsDescriptionControls from "./program-details-description-controls";
import ProgramDetailsDescriptionMain from "./program-details-description-main";

class ProgramDetailsDescription extends PureComponent {
  state = {
    investmentsLimits: {}
  };

  componentDidMount() {
    platformApi.v10PlatformLevelsGet({ currency: "GVT" }).then(data => {
      this.setState({ investmentsLimits: data.levels });
    });
  }
  render() {
    const {
      t,
      status,
      isFavorite,
      canCloseProgram,
      hasNotifications,
      isOwnProgram,
      onReinvestingClick,
      isReinvestPending,
      isInvested,
      ProgramReinvestingWidget,
      ProgramFollowContainer,
      ProgramUnfollowContainer,
      ClosePeriodContainer,
      CloseProgramContainer,
      ProgramDepositContainer,
      AboutLevelsContainerComponent,
      PROGRAM,
      ProgramWithdrawContainer,
      canInvest,
      canWithdraw,
      programDescription,
      onFavoriteClick,
      investmentData,
      onChangeInvestmentStatus,
      isAuthenticated,
      redirectToLogin,
      ProgramControls
    } = this.props;

    return (
      <div className="program-details-description">
        <ProgramDetailsDescriptionMain
          programDescription={programDescription}
          AboutLevelsContainerComponent={AboutLevelsContainerComponent}
          investmentsLimits={this.state.investmentsLimits}
          isFavorite={isFavorite}
          onFavoriteClick={onFavoriteClick}
          hasNotifications={hasNotifications}
        />
        <ProgramControls
          programDescription={programDescription}
          canCloseProgram={canCloseProgram}
          isOwnProgram={isOwnProgram}
          canInvest={canInvest}
          canWithdraw={canWithdraw}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
        />
        {programDescription.personalProgramDetails && status !== STATUS.ENDED && (
          <div className="program-details-description__additionally">
            <DetailsInvestment
              ProgramReinvestingWidget={ProgramReinvestingWidget}
              onReinvestingClick={onReinvestingClick}
              isReinvestPending={isReinvestPending}
              isInvested={isInvested}
              WithdrawContainer={ProgramWithdrawContainer}
              notice={t(
                "program-details-page.description.withdraw-notice-text"
              )}
              canWithdraw={canWithdraw}
              assetCurrency={programDescription.currency}
              onChangeInvestmentStatus={onChangeInvestmentStatus}
              asset={PROGRAM}
              {...investmentData}
            />
          </div>
        )}
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescription);
