import "./fund-deposit.scss";

import FundDepositForm from "modules/fund-deposit/components/fund-deposit-form";
import FundDepositTop from "modules/fund-deposit/components/fund-deposit-top";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

class FundDepositPopup extends Component {
  componentDidMount() {
    this.props.fetchInfo(this.props.id);
  }

  render() {
    return this.props.info ? (
      <Fragment>
        <FundDepositTop info={this.props.info} type={this.props.type} />
        <FundDepositForm
          errorMessage={this.props.submitInfo.errorMessage}
          currency={this.props.currency}
          info={this.props.info}
          disabled={this.props.submitInfo.isPending}
          onSubmit={this.props.invest}
        />
      </Fragment>
    ) : null;
  }
}

FundDepositPopup.propTypes = {
  fetchInfo: PropTypes.func,
  invest: PropTypes.func,
  currency: PropTypes.string,
  info: PropTypes.shape({
    availableInWallet: PropTypes.number,
    availableToInvest: PropTypes.number,
    entryFee: PropTypes.number,
    periodEnds: PropTypes.instanceOf(Date),
    rate: PropTypes.number,
    title: PropTypes.string
  })
};

export default FundDepositPopup;
