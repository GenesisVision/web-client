import "./program-deposit.scss";

import ProgramDepositForm from "modules/program-deposit/components/program-deposit-form";
import ProgramDepositTop from "modules/program-deposit/components/program-deposit-top";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

class ProgramDepositPopup extends Component {
  componentDidMount() {
    this.props.fetchInfo(this.props.id);
  }

  render() {
    return this.props.info ? (
      <Fragment>
        <ProgramDepositTop info={this.props.info} />
        <ProgramDepositForm
          errorMessage={this.props.submitInfo.errorMessage}
          currency={this.props.currency}
          info={this.props.info}
          disabled={this.props.submitInfo.isPending}
          onSubmit={this.props.invest}
          type={this.props.type}
        />
      </Fragment>
    ) : null;
  }
}

ProgramDepositPopup.propTypes = {
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

export default ProgramDepositPopup;
