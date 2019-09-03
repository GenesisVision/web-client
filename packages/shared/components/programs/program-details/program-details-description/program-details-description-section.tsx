import "shared/components/details/details-description-section/details-description/details-description.scss";

import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { ComponentType } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { ProgramControlsLoader } from "shared/components/details/details.contaner.loader";
import { RootState } from "shared/reducers/root-reducer";

import { levelParametersSelector } from "../reducers/level-parameters.reducer";
import PerformanceData from "./performance-data";
import ProgramDetailsDescriptionMain from "./program-details-description-main";

const _ProgramDetailsDescriptionSection: React.FC<
  IProgramDetailsDescriptionSectionProps
> = ({
  levelsParameters,
  t,
  programDescription,
  isAuthenticated,
  ProgramControls,
  ChangePasswordTradingAccount
}) => {
  const personalDetails = programDescription.personalProgramDetails;
  const isOwnProgram = personalDetails && personalDetails.isOwnProgram;
  return (
    <div className="asset-details-description">
      <ProgramDetailsDescriptionMain
        programDescription={programDescription}
        isOwnProgram={isOwnProgram}
        ChangePasswordTradingAccount={ChangePasswordTradingAccount}
      />
      <PerformanceData
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
      />
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  levelsParameters: levelParametersSelector(state)
});

interface StateProps {
  levelsParameters?: LevelsParamsInfo;
}

interface OwnProps {
  programDescription: ProgramDetailsFull;
  isAuthenticated: boolean;
  ProgramControls: ComponentType<any>;
  ChangePasswordTradingAccount?: ComponentType<any>;
}

interface IProgramDetailsDescriptionSectionProps
  extends WithTranslation,
    StateProps,
    OwnProps {}

const ProgramDetailsDescriptionSection = compose<React.ComponentType<OwnProps>>(
  connect(mapStateToProps),
  translate(),
  React.memo
)(_ProgramDetailsDescriptionSection);
export default ProgramDetailsDescriptionSection;
