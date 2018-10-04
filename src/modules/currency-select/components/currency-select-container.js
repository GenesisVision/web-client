import "./currency-select.scss";

import classnames from "classnames";
import Select from "components/select/select";
import { HEADER_CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import { updateCurrency } from "modules/currency-select/services/currency-select.service";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CurrencySelect from "modules/currency-select/components/currency-select";

class CurrencySelectContainer extends Component {
  handleChange = event => {
    this.props.service.updateCurrency(event.target.value);
  };
  render() {
    return (
      <CurrencySelect
        className={classnames("currency-select", this.props.className)}
        value={this.props.currency}
        onChange={this.handleChange}
        currencyValues={this.props.currencyValues}
      />
    );
  }
}

CurrencySelectContainer.propTypes = {
  currency: PropTypes.string,
  service: PropTypes.shape({
    updateCurrency: PropTypes.func
  })
};

CurrencySelectContainer.defaultProps = {
  currencyValues: HEADER_CURRENCY_VALUES
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
