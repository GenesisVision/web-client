import "./program-details-description.scss";

import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { ComponentType } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import { ProgramControlsLoader } from "shared/components/details/details.contaner.loader";
import { PROGRAM, STATUS } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";

import { levelParametersSelector } from "../reducers/level-parameters.reducer";
import { dispatchProgramDescription } from "../services/program-details.service";
import PerfomanceData from "./perfomance-data";
import ProgramDetailsDescriptionMain from "./program-details-description-main";
import SubscriptionDetailsContainer from "./subscription-details/subscription-details-container";

const _ProgramDetailsDescriptionSection: React.FC<
  IProgramDetailsDescriptionSectionProps
> = ({
  service: { dispatchProgramDescription },
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
        condition={!!levelsParameters}
        levelsParameters={levelsParameters!}
        programDescription={programDescription}
      />
      <ProgramControls
        condition={!!levelsParameters}
        loader={<ProgramControlsLoader />}
        levelsParameters={levelsParameters!}
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
      />
      {personalDetails && isAuthenticated && (
        <div className="program-details-description__additionally">
          {personalDetails.isInvested &&
            personalDetails.status !== STATUS.ENDED && (
              <DetailsInvestment
                updateDescription={dispatchProgramDescription}
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

const mapStateToProps = (state: RootState): StateProps => ({
  levelsParameters: levelParametersSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface StateProps {
  levelsParameters?: LevelsParamsInfo;
}

interface OwnProps {
  accountCurrency: string;
  programDescription: ProgramDetailsFull;
  isAuthenticated: boolean;
  redirectToLogin(): void;
  ProgramControls: ComponentType<any>;
  ProgramWithdrawContainer: ComponentType<any>;
  ProgramReinvestingWidget?: ComponentType<any>;
  ChangePasswordTradingAccount?: ComponentType<any>;
}

interface IProgramDetailsDescriptionSectionProps
  extends WithTranslation,
    StateProps,
    DispatchProps,
    OwnProps {}

const ProgramDetailsDescriptionSection = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate(),
  React.memo
)(_ProgramDetailsDescriptionSection);
export default ProgramDetailsDescriptionSection;
