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
    const { info, submitInfo, currency, invest, type } = this.props;
    return this.props.info ? (
      <Fragment>
        <ProgramDepositTop info={info.data} type={type} />
        <ProgramDepositForm
          errorMessage={submitInfo.errorMessage}
          currency={currency}
          info={info.data}
          disabled={submitInfo.isPending}
          onSubmit={invest}
          type={type}
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
