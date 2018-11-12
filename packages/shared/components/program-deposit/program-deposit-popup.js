import "./program-deposit.scss";

import ProgramDepositForm from "./program-deposit-form";
import ProgramDepositTop from "./program-deposit-top";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

class ProgramDepositPopup extends Component {
  componentDidMount() {
    this.props.fetchInfo(this.props.id);
  }
  render() {
    const { info, entryFee, submitInfo, currency, invest } = this.props;
    return info ? (
      <Fragment>
        <ProgramDepositTop info={info} />
        <ProgramDepositForm
          entryFee={entryFee}
          errorMessage={submitInfo.errorMessage}
          currency={currency}
          info={info}
          disabled={submitInfo.isPending}
          onSubmit={invest}
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
