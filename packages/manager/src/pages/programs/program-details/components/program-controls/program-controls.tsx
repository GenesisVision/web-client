import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";

import InvestmentProgramControls from "./investment-program-controls";
import SignalProviderControls from "./signal-provider-controls";

const _ProgramControls: React.FC<
  IProgramControlsProps & InjectedTranslateProps
> = ({ programDescription, isAuthenticated, redirectToLogin }) => {
  const personalProgramDetails = programDescription.personalProgramDetails;
  const canCloseProgram =
    personalProgramDetails && personalProgramDetails.canCloseProgram;
  const canMakeSignalProvider =
    personalProgramDetails && personalProgramDetails.canMakeSignalProvider;
  const isOwnProgram =
    personalProgramDetails && personalProgramDetails.isOwnProgram;

  return (
    <div className="program-details-description__controls">
      <div className="program-details-description__col">
        <InvestmentProgramControls
          programDescription={programDescription}
          canCloseProgram={canCloseProgram}
          isOwnProgram={isOwnProgram}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
        />
      </div>
      {isOwnProgram &&
      (canMakeSignalProvider || programDescription.isSignalProgram) ? (
        <div className="program-details-description__col program-details-description__col--small-size">
          <SignalProviderControls
            programDescription={programDescription}
            isAuthenticated={isAuthenticated}
            redirectToLogin={redirectToLogin}
          />
        </div>
      ) : null}
    </div>
  );
};

const ProgramControls = translate()(_ProgramControls);
export default ProgramControls;
