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
    const { info, submitInfo, currency, invest, type } = this.props;
    return this.props.info ? (
      <Fragment>
        <FundDepositTop info={info.data} type={type} />
        <FundDepositForm
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
