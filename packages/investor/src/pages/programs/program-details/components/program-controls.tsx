import React, { Component } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import InvestmentProgramControls from "./investment-program-controls";
import SignalProviderControls from "./signal-provider-controls";

interface IProgramControlsProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;

  programDescription: any;
}

class ProgramControls extends Component<
  IProgramControlsProps & InjectedTranslateProps
> {
  render() {
    const { programDescription, isAuthenticated, redirectToLogin } = this.props;

    const isAvailableFollowingTrades = programDescription.isSignalProgram;

    return (
      <div className="program-details-description__controls">
        <div className="program-details-description__col">
          <InvestmentProgramControls
            programDescription={programDescription}
            isAuthenticated={isAuthenticated}
            redirectToLogin={redirectToLogin}
          />
        </div>
        {/*{isAvailableFollowingTrades ? (
          <div className="program-details-description__col program-details-description__col--small-size">
            <SignalProviderControls
              programDescription={programDescription}
              isAuthenticated={isAuthenticated}
              redirectToLogin={redirectToLogin}
            />
          </div>
        ) : null}*/}
      </div>
    );
  }
}

export default translate()(ProgramControls);
