import "./program-details-description.scss";

import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { ComponentType } from "react";
import { useSelector } from "react-redux";
import { ProgramControlsLoader } from "shared/components/details/details.contaner.loader";

import { levelParametersSelector } from "../reducers/level-parameters.reducer";
import PerformanceData from "./performance-data";
import ProgramDetailsDescriptionMain from "./program-details-description-main";

const _ProgramDetailsDescriptionSection: React.FC<Props> = ({
  programDescription,
  isAuthenticated,
  ProgramControls,
  ChangePasswordTradingAccount
}) => {
  const levelsParameters = useSelector(levelParametersSelector);
  const personalDetails = programDescription.personalProgramDetails;
  const isOwnProgram = personalDetails && personalDetails.isOwnProgram;
  return (
    <div className="details__section asset-details-description">
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

interface Props {
  programDescription: ProgramDetailsFull;
  isAuthenticated: boolean;
  ProgramControls: ComponentType<any>;
  ChangePasswordTradingAccount?: ComponentType<any>;
}

const ProgramDetailsDescriptionSection = React.memo(
  _ProgramDetailsDescriptionSection
);
export default ProgramDetailsDescriptionSection;
