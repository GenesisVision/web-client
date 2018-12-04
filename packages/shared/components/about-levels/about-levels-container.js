import "./about-level.scss";

import React, { Component } from "react";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";
import rateApi from "shared/services/api-client/rate-api";

import AboutLevelsComponent from "./about-levels";

class AboutLevelsContainerComponent extends Component {
  state = {
    currency: CURRENCY_VALUES.GVT,
    rate: 1
  };
  handlerCurrencyChange = e => {
    this.setState({ currency: e.target.value });
    rateApi
      .v10RateByFromByToGet(e.target.value, CURRENCY_VALUES.GVT)
      .then(value => {
        this.setState({ rate: value });
      });
  };
  render() {
    return (
      <AboutLevelsComponent
        open={this.props.open}
        onClose={this.props.onClose}
        className="about-levels__dialog"
        rate={this.state.rate}
        currency={this.state.currency}
        currencyChange={this.handlerCurrencyChange}
      />
    );
  }
}
export default AboutLevelsContainerComponent;
