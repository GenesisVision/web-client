import React, { Component } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { IFundControlsProps } from "shared/components/funds/fund-details/fund-details.types";

import InvestmentFundControls from "./investment-fund-controls";

class FundControls extends React.PureComponent<
  IFundControlsProps & InjectedTranslateProps
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

export default translate()(FundControls);
