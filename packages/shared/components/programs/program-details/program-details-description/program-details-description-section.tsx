import "./program-details-description.scss";

import { ProgramDetailsFull } from "gv-api-web";
import React, { ComponentType, PureComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { STATUS } from "shared/constants/constants";
import { PROGRAM } from "shared/constants/constants";

import ProgramDetailsDescriptionMain from "./program-details-description-main";

interface IProgramDetailsDescriptionSectionProps
  extends InjectedTranslateProps {
  programDescription: ProgramDetailsFull;
  isAuthenticated: boolean;
  redirectToLogin(): void;
  ProgramControls: ComponentType<any>;
  ProgramReinvestingWidget: ComponentType<any>;
  ProgramWithdrawContainer: ComponentType<any>;
}

interface IProgramDetailsDescriptionSectionState {
  investmentsLimits: any;
}

class ProgramDetailsDescriptionSection extends PureComponent<
  IProgramDetailsDescriptionSectionProps,
  IProgramDetailsDescriptionSectionState
> {
  state = {
    investmentsLimits: {}
  };

  constructor(props: IProgramDetailsDescriptionSectionProps) {
    super(props);
    this.state = {
      investmentsLimits: {}
    };
  }

  componentDidMount() {}

  // composeInvestmentData = (programDetails: any) => {
  //   const { statistic, personalProgramDetails } = programDetails;
  //   const { balanceBase, profitPercent } = statistic;
  //   return {
  //     id: programDetails.id,
  //     balanceAmount: balanceBase.amount,
  //     balanceCurrency: balanceBase.currency,
  //     profitPercent,
  //     ...personalProgramDetails
  //   };
  // };

  render() {
    const {
      t,
      programDescription,
      isAuthenticated,
      redirectToLogin,
      ProgramControls,
      ProgramReinvestingWidget,
      ProgramWithdrawContainer
    } = this.props;

    const personalDetails = programDescription.personalProgramDetails;
    return (
      <div className="program-details-description">
        <ProgramDetailsDescriptionMain
          programDescription={programDescription}
        />
        <ProgramControls
          programDescription={programDescription}
          canCloseProgram={personalDetails && personalDetails.canCloseProgram}
          canMakeSignalProvider={
            personalDetails && personalDetails.canMakeSignalProvider
          }
          isOwnProgram={personalDetails && personalDetails.isOwnProgram}
          canInvest={personalDetails && personalDetails.canInvest}
          canWithdraw={personalDetails && personalDetails.canWithdraw}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
        />
        {isAuthenticated && status !== STATUS.ENDED && (
          <div className="program-details-description__additionally">
            <DetailsInvestment
              isInvested={personalDetails && personalDetails.isInvested}
              notice={t(
                "program-details-page.description.withdraw-notice-text"
              )}
              canWithdraw={personalDetails && personalDetails.canWithdraw}
              assetCurrency={programDescription.currency}
              asset={PROGRAM}
              ProgramReinvestingWidget={ProgramReinvestingWidget}
              WithdrawContainer={ProgramWithdrawContainer}
              // {...investmentData}
            />
          </div>
        )}
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescriptionSection);
