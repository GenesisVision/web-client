import "./fund-deposit.scss";

import FundDepositForm from "./fund-deposit-form";
import FundDepositTop from "./fund-deposit-top";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

class FundDepositPopup extends Component {
  componentDidMount() {
    this.props.fetchInfo(this.props.id);
  }

  render() {
    const { info, type, submitInfo, currency, invest, entryFee } = this.props;
    return info ? (
      <Fragment>
        <FundDepositTop info={info} type={type} />
        <FundDepositForm
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
