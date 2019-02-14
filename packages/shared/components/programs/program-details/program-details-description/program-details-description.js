import "./program-details-description.scss";

import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { STATUS } from "shared/constants/constants";
import platformApi from "shared/services/api-client/platform-api";

import ProgramDetailsDescriptionCenter from "./program-details-description-center";
import ProgramDetailsDescriptionTop from "./program-details-description-top";

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
      isAuthenticated,
      redirectToLogin,
      isReinvest
    } = this.props;

    return (
      <div className="program-details-description">
        <ProgramDetailsDescriptionTop
          programDescription={programDescription}
          AboutLevelsContainerComponent={AboutLevelsContainerComponent}
          investmentsLimits={this.state.investmentsLimits}
          isFavorite={isFavorite}
          onFavoriteClick={onFavoriteClick}
          hasNotifications={hasNotifications}
        />
        <ProgramDetailsDescriptionCenter
          programDescription={programDescription}
          canCloseProgram={canCloseProgram}
          isOwnProgram={isOwnProgram}
          ClosePeriodContainer={ClosePeriodContainer}
          CloseProgramContainer={CloseProgramContainer}
          ProgramDepositContainer={ProgramDepositContainer}
          ProgramDetailContext={ProgramDetailContext}
          AssetEditContainer={AssetEditContainer}
          PROGRAM={PROGRAM}
          canInvest={canInvest}
          canWithdraw={canWithdraw}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
        />

        {programDescription.personalProgramDetails && status !== STATUS.ENDED && (
          <div className="program-details-description__bottom">
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
              role={role}
              {...investmentData}
            />
          </div>
        )}
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescription);
