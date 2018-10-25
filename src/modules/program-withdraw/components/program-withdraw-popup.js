import ProgramWithdrawForm from "modules/program-withdraw/components/program-withdraw-form";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

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
        this.setState({ ...data });
      })
      .catch(data => this.setState({ ...data }));
  }

  handleSumbit = amount => {
    this.setState({ isPending: true });
    return this.props
      .withdraw(amount)
      .then(data => this.setState({ ...data }))
      .catch(data => this.setState({ ...data }));
  };

  render() {
    if (!this.state.data) return null;
    const { currency } = this.props;
    const { title, availableToWithdraw, periodEnds, rate } = this.state.data;
    return (
      <Fragment>
        <ProgramWithdrawTop
          title={title}
          availableToWithdraw={availableToWithdraw}
          currency={currency}
        />
        <ProgramWithdrawForm
          currency={currency}
          availableToWithdraw={availableToWithdraw}
          periodEnds={periodEnds}
          rate={rate}
          onSubmit={this.handleSumbit}
          errorMessage={this.state.errorMessage}
          disabled={this.state.isPending}
        />
      </Fragment>
    );
  }
}

ProgramWithdrawPopup.propTypes = {
  fetchInfo: PropTypes.func,
  withdraw: PropTypes.func,
  currency: PropTypes.string.isRequired
};

export default ProgramWithdrawPopup;
