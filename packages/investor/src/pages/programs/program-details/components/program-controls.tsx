//import "./program-details-description.scss";

import React, { Component } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import InvestmentProgramControls from "./investment-program-controls";
import SignalProviderControls from "./signal-provider-controls";

interface IProgramControlsProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;

  ProgramDepositContainer: any;
  canInvest: boolean;
  programDescription: any;
}

class ProgramControls extends Component<
  IProgramControlsProps & InjectedTranslateProps
> {
  render() {
    const {
      canInvest,
      programDescription,
      ProgramDepositContainer,
      isAuthenticated,
      redirectToLogin
    } = this.props;

    const isAvailableFollowingTrades = programDescription.isSignalProgram;

    return (
      <div className="program-details-description__controls">
        <div className="program-details-description__col">
          <InvestmentProgramControls
            programDescription={programDescription}
            canInvest={canInvest}
            ProgramDepositContainer={ProgramDepositContainer}
            isAuthenticated={isAuthenticated}
            redirectToLogin={redirectToLogin}
          />
          {isAvailableFollowingTrades ? (
            <div className="program-details-description__col program-details-description__col--small-size">
              <SignalProviderControls
                programDescription={programDescription}
                isAuthenticated={isAuthenticated}
                redirectToLogin={redirectToLogin}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default translate()(ProgramControls);
