import "./program-details-description.scss";

import { GVButton } from "gv-react-components";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/details-notificaton";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import Hint from "shared/components/hint/hint";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { STATUS } from "shared/constants/constants";
import platformApi from "shared/services/api-client/platform-api";
import { composeProgramNotificationsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

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
      isReinvest
    } = this.props;

    return (
      <div className="program-details-description">
        <ProgramDetailsDescriptionTop
          programDescription={programDescription}
          AboutLevelsContainerComponent={AboutLevelsContainerComponent}
          investmentsLimits={this.state.investmentsLimits}
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
