import "./program-details-description.scss";

import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import { PROGRAM, STATUS } from "shared/constants/constants";

import PerfomanceData from "./perfomance-data";
import ProgramDetailsDescriptionMain from "./program-details-description-main";
import SubscriptionDetailsContainer from "./subscription-details/subscription-details-container";

const _ProgramDetailsDescriptionSection: React.FC<
  IProgramDetailsDescriptionSectionProps
> = ({
  levelsParameters,
  t,
  accountCurrency,
  programDescription,
  isAuthenticated,
  redirectToLogin,
  ProgramControls,
  ChangePasswordTradingAccount,
  ProgramReinvestingWidget,
  ProgramWithdrawContainer
}) => {
  const personalDetails = programDescription.personalProgramDetails;
  const isOwnProgram = personalDetails && personalDetails.isOwnProgram;
  return (
    <div className="program-details-description">
      <ProgramDetailsDescriptionMain
        programDescription={programDescription}
        isOwnProgram={isOwnProgram}
        ChangePasswordTradingAccount={ChangePasswordTradingAccount}
      />
      <PerfomanceData
        levelsParameters={levelsParameters}
        programDescription={programDescription}
      />
      <ProgramControls
        programDescription={programDescription}
        canCloseProgram={personalDetails && personalDetails.canCloseProgram}
        canMakeSignalProvider={
          personalDetails && personalDetails.canMakeSignalProvider
        }
        isOwnProgram={isOwnProgram}
        canInvest={personalDetails && personalDetails.canInvest}
        canWithdraw={personalDetails && personalDetails.canWithdraw}
        isAuthenticated={isAuthenticated}
        redirectToLogin={redirectToLogin}
        levelsParameters={levelsParameters}
      />
      {personalDetails && isAuthenticated && (
        <div className="program-details-description__additionally">
          {personalDetails.isInvested &&
            personalDetails.status !== STATUS.ENDED && (
              <DetailsInvestment
                notice={t(
                  "program-details-page.description.withdraw-notice-text"
                )}
                asset={PROGRAM}
                id={programDescription.id}
                assetCurrency={programDescription.currency}
                accountCurrency={accountCurrency}
                personalDetails={personalDetails as InvestmentDetails} // TODO fix type InvestmentDetails
                ProgramReinvestingWidget={ProgramReinvestingWidget}
                WithdrawContainer={ProgramWithdrawContainer}
              />
            )}
          {personalDetails.signalSubscription.hasActiveSubscription && (
            <SubscriptionDetailsContainer
              id={programDescription.id}
              currency={programDescription.currency}
              personalDetails={personalDetails}
            />
          )}
        </div>
      )}
    </div>
  );
};

interface IProgramDetailsDescriptionSectionProps
  extends InjectedTranslateProps {
  levelsParameters: LevelsParamsInfo;
  accountCurrency: string;
  programDescription: ProgramDetailsFull;
  isAuthenticated: boolean;
  redirectToLogin(): void;
  ProgramControls: ComponentType<any>;
  ProgramWithdrawContainer: ComponentType<any>;
  ProgramReinvestingWidget?: ComponentType<any>;
  ChangePasswordTradingAccount?: ComponentType<any>;
}

const ProgramDetailsDescriptionSection = translate()(
  React.memo(_ProgramDetailsDescriptionSection)
);
export default ProgramDetailsDescriptionSection;
