import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

import ProgramWithdrawForm from "./program-withdraw-form";
import ProgramWithdrawTop from "./program-withdraw-top";

class ProgramWithdrawPopup extends Component {
  state = {
    data: undefined,
    isPending: false,
    errorMessage: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    this.props
      .fetchInfo()
      .then(data => {
        this.setState({ data, isPending: false });
      })
      .catch(data => this.setState({ data, isPending: false }));
  }

  handleSubmit = amount => {
    this.setState({ isPending: true });
    return this.props
      .withdraw(amount)
      .then(data => this.setState({ data, isPending: false }))
      .catch(data => this.setState({ data, isPending: false }));
  };

  render() {
    if (!this.state.data) return null;
    const { programCurrency, accountCurrency, error } = this.props;
    const { title, availableToWithdraw, periodEnds, rate } = this.state.data;
    return (
      <Fragment>
        <ProgramWithdrawTop
          title={title}
          availableToWithdraw={availableToWithdraw}
          programCurrency={programCurrency}
        />
        <ProgramWithdrawForm
          programCurrency={programCurrency}
          accountCurrency={accountCurrency}
          availableToWithdraw={availableToWithdraw}
          periodEnds={periodEnds}
          rate={rate}
          onSubmit={this.handleSubmit}
          errorMessage={error}
          disabled={this.state.isPending}
        />
      </Fragment>
    );
  }
}

ProgramWithdrawPopup.propTypes = {
  fetchInfo: PropTypes.func,
  withdraw: PropTypes.func,
  accountCurrency: PropTypes.string.isRequired,
  programCurrency: PropTypes.string.isRequired
};

export default ProgramWithdrawPopup;
