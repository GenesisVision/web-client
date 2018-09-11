import "./currency-select.scss";

import Select from "components/select/select";
import { CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import { updateCurrency } from "modules/currency-select/services/currency-select.service";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CurrencySelectContainer extends Component {
  render() {
    return (
      <Select
        className={"currency-select"}
        value={this.props.currency}
        onSelect={this.props.service.updateCurrency}
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
  currency: PropTypes.oneOf(Object.keys(CURRENCY_VALUES)),
  service: PropTypes.shape({
    updateCurrency: PropTypes.func
  })
};

const mapStateToProps = ({ accountSettings }) => ({
  currency: accountSettings.currency
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ updateCurrency }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySelectContainer);
