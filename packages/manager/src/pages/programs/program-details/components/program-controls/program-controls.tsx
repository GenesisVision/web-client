//import "./program-details-description.scss";

import React, { Component } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import InvestmentProgramControls from "./investment-program-controls";

interface IProgramControlsProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;

  canCloseProgram: boolean;
  isOwnProgram: boolean;
  programDescription: any;
}

interface IProgramControlsState {}

class ProgramControls extends Component<
  IProgramControlsProps & InjectedTranslateProps,
  IProgramControlsState
> {
  state = {
    isOpenInvestmentPopup: false,
    isOpenCloseProgramPopup: false,
    isOpenEditProgramPopup: false,
    isOpenClosePeriodPopup: false
  };

  render() {
    const {
      canCloseProgram,
      isOwnProgram,
      programDescription,
      isAuthenticated,
      redirectToLogin
    } = this.props;

    const isAvailableFollowingTrades = programDescription.isSignalProgram;

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
        {isAvailableFollowingTrades ? (
          <div className="program-details-description__col program-details-description__col--small-size">
            123
          </div>
        ) : null}
      </div>
    );
  }
}

export default translate()(ProgramControls);
