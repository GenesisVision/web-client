import "./deposit.scss";

import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";

class DepositPopup extends Component {
  componentDidMount() {
    const { id, fetchInfo, currency } = this.props;
    fetchInfo(id, currency);
  }

  render() {
    const {
      info,
      type,
      submitInfo,
      currency,
      invest,
      entryFee,
      program,
      investor
    } = this.props;
    return info ? (
      <Fragment>
        <DepositTop
          info={info}
          type={type}
          program={program}
          investor={investor}
        />
        <DepositForm
          entryFee={entryFee}
          program={program}
          investor={investor}
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

DepositPopup.propTypes = {
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

export default DepositPopup;
