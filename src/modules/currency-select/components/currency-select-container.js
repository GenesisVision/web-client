import "./currency-select.scss";

import classnames from "classnames";
import Select from "components/select/select";
import { CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import { updateCurrentCurrency } from "modules/currency-select/services/currency-select.service";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CurrencySelectContainer extends Component {
  render() {
    return (
      <Select
        className={classnames("currency-select", this.props.className)}
        value={this.props.currentCurrency}
        onSelect={this.props.service.updateCurrentCurrency}
      >
        {Object.keys(CURRENCY_VALUES).map(currency => {
          return (
            <option value={currency} key={currency}>
              {CURRENCY_VALUES[currency]}
            </option>
          );
        })}
      </Select>
    );
  }
}

CurrencySelectContainer.propTypes = {
  currentCurrency: PropTypes.oneOf(Object.keys(CURRENCY_VALUES)),
  service: PropTypes.shape({
    updateCurrentCurrency: PropTypes.func
  })
};

const mapStateToProps = ({ accountSettings }) => ({
  currentCurrency: accountSettings.currentCurrency
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ updateCurrentCurrency }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySelectContainer);
