import FundWithdrawForm from "modules/fund-withdraw/components/fund-withdraw-form";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

import FundWithdrawTop from "./fund-withdraw-top";

class FundWithdrawPopup extends Component {
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

  handleSumbit = percent => {
    this.setState({ isPending: true });
    return this.props
      .withdraw(percent)
      .then(data => this.setState({ ...data }))
      .catch(data => this.setState({ ...data }));
  };

  render() {
    if (!this.state.data) return null;
    const { currency, type } = this.props;
    const { title, availableToWithdraw, periodEnds, rate } = this.state.data;
    return (
      <Fragment>
        <FundWithdrawTop
          title={title}
          availableToWithdraw={availableToWithdraw}
          type={type}
        />
        <FundWithdrawForm
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

FundWithdrawPopup.propTypes = {
  fetchInfo: PropTypes.func,
  withdraw: PropTypes.func,
  currency: PropTypes.string.isRequired
};

export default FundWithdrawPopup;
