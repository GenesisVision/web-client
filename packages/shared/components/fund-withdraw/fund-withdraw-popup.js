import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

import { ENTER_AMOUNT_STEP } from "./fund-withdraw-form";
import FundWithdrawForm, { CONFIRM_STEP } from "./fund-withdraw-form";
import FundWithdrawTop from "./fund-withdraw-top";

class FundWithdrawPopup extends Component {
  state = {
    data: undefined,
    isPending: false,
    errorMessage: null,
    step: ENTER_AMOUNT_STEP
  };

  componentDidMount() {
    this.setState({ isPending: true });
    this.props
      .fetchInfo()
      .then(data => {
        this.setState({ data });
      })
      .catch(data => this.setState({ data }));
  }

  handleSumbit = percent => {
    this.setState({ isPending: true });
    return this.props
      .withdraw(percent)
      .then(data => {
        this.setState({ isPending: false });
      })
      .catch(data => {
        this.setState({ isPending: false, errorMessage: data.errorMessage });
      });
  };

  goToConfirmStep = () => {
    this.setState({ step: CONFIRM_STEP });
  };
  goToEnterAmountStep = () => {
    this.setState({ step: ENTER_AMOUNT_STEP, errorMessage: null });
  };

  render() {
    if (!this.state.data) return null;
    const { fundCurrency, accountCurrency } = this.props;
    const { data, errorMessage, isPending, step } = this.state;
    const { title, availableToWithdraw, periodEnds, rate, exitFee } = data;
    return (
      <Fragment>
        <FundWithdrawTop
          title={title}
          availableToWithdraw={availableToWithdraw}
          fundCurrency={fundCurrency}
        />
        <FundWithdrawForm
          exitFee={exitFee}
          fundCurrency={fundCurrency}
          accountCurrency={accountCurrency}
          availableToWithdraw={availableToWithdraw}
          periodEnds={periodEnds}
          rate={rate}
          onSubmit={this.handleSumbit}
          errorMessage={errorMessage}
          disabled={isPending}
          step={step}
          goToConfirmStep={this.goToConfirmStep}
          goToEnterAmountStep={this.goToEnterAmountStep}
        />
      </Fragment>
    );
  }
}

FundWithdrawPopup.propTypes = {
  fetchInfo: PropTypes.func,
  withdraw: PropTypes.func,
  currency: PropTypes.string
};

export default FundWithdrawPopup;
