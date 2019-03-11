import React, { Component } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import InvestmentFundControls from "./investment-fund-controls";

interface IProgramControlsProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;

  fundDescription: any;
}

class ProgramControls extends Component<
  IProgramControlsProps & InjectedTranslateProps
> {
  render() {
    const { fundDescription, isAuthenticated, redirectToLogin } = this.props;

    return (
      <div className="program-details-description__controls">
        <div className="program-details-description__col">
          <InvestmentFundControls
            fundDescription={fundDescription}
            isAuthenticated={isAuthenticated}
            redirectToLogin={redirectToLogin}
          />
        </div>
      </div>
    );
  }
}

export default translate()(ProgramControls);
