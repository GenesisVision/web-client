import "./about-level.scss";

import * as React from "react";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";
import platformApi from "shared/services/api-client/platform-api";
import AboutLevelsComponent from "./about-levels";
import { LevelInfo } from "gv-api-web";

const CURRENCY_FILTER_VALUES = Object.keys(CURRENCY_VALUES);

interface IAboutLevelsContainerComponentProps {
  open: boolean;
  onClose(param?: any): void;
  currency?: string;
}

interface IAboutLevelsContainerComponentState {
  currency: string;
  investmentsLimits: LevelInfo[];
}

class AboutLevelsContainerComponent extends React.Component<
  IAboutLevelsContainerComponentProps,
  IAboutLevelsContainerComponentState
> {
  state = {
    currency: this.props.currency || CURRENCY_FILTER_VALUES[0],
    investmentsLimits: []
  };

  getInvestmentsLimits = () => {
    platformApi
      .v10PlatformLevelsGet({ currency: this.state.currency })
      .then(data => {
        this.setState({ investmentsLimits: data.levels });
      });
  };

  componentDidMount = () => {
    this.getInvestmentsLimits();
  };

  render() {
    return (
      <AboutLevelsComponent
        open={this.props.open}
        onClose={this.props.onClose}
        investmentsLimits={this.state.investmentsLimits}
        currency={this.state.currency}
      />
    );
  }
}
export default AboutLevelsContainerComponent;
