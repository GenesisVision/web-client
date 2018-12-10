import "./about-level.scss";

import React, { Component } from "react";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";
import platformApi from "shared/services/api-client/platform-api";

import AboutLevelsComponent from "./about-levels";

const CURRENCY_FILTER_VALUES = Object.keys(CURRENCY_VALUES);

class AboutLevelsContainerComponent extends Component {
  state = {
    currency: CURRENCY_FILTER_VALUES[0],
    investmentsLimits: {}
  };
  getInvestmentsLimits() {
    platformApi.v10PlatformLevelsGet(this.state.currency).then(data => {
      this.setState({ investmentsLimits: data.levels });
    });
  }
  componentDidMount() {
    this.getInvestmentsLimits();
  }
  handlerCurrencyChange = e => {
    this.setState({ currency: e.target.value });
    this.getInvestmentsLimits();
  };
  render() {
    return (
      <AboutLevelsComponent
        open={this.props.open}
        onClose={this.props.onClose}
        className="about-levels__dialog"
        investmentsLimits={this.state.investmentsLimits}
        currency={this.state.currency}
        currencyChange={this.handlerCurrencyChange}
      />
    );
  }
}
export default AboutLevelsContainerComponent;
