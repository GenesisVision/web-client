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
  accountCurrency: string;
  programDescription: ProgramDetailsFull;
  isAuthenticated: boolean;
  redirectToLogin(): void;
  ProgramControls: ComponentType<any>;
  ProgramReinvestingWidget: ComponentType<any>;
  ProgramWithdrawContainer: ComponentType<any>;
}

class ProgramDetailsDescriptionSection extends PureComponent<
  IProgramDetailsDescriptionSectionProps
> {
  render() {
    const {
      t,
      accountCurrency,
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
              notice={t(
                "program-details-page.description.withdraw-notice-text"
              )}
              asset={PROGRAM}
              id={programDescription.id}
              assetCurrency={programDescription.currency}
              accountCurrency={accountCurrency}
              personalDetails={personalDetails}
              ProgramReinvestingWidget={ProgramReinvestingWidget}
              WithdrawContainer={ProgramWithdrawContainer}
            />
          </div>
        )}
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescriptionSection);
