import "./about-level.scss";

import { CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import React, { Component } from "react";
import rateApiProxy from "services/api-client/rate-api";
import AboutLevelsComponent from "./about-levels";

class AboutLevelsContainerComponent extends Component {
  state = {
    currency: CURRENCY_VALUES.GVT,
    rate: 1
  };
  handlerCurrencyChange = e => {
    this.setState({ currency: e.target.value });
    rateApiProxy
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
