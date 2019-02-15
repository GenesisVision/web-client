import "./follow-popup.scss";

import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

import FollowForm from "./follow-popup-form";
import FollowTop from "./follow-popup-top";

class FollowPopup extends Component {
  componentDidMount() {
    /*const { id, fetchInfo, currency } = this.props;
    fetchInfo(id, currency);*/
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
    return (
      <Fragment>
        <FollowTop
          program
          /*info={info}
        type={type}
        program={program}
        investor={investor}*/
        />
        <FollowForm
        /*entryFee={entryFee}
        program={program}
        investor={investor}
        errorMessage={submitInfo.errorMessage}
        currency={currency}
        info={info}
        disabled={submitInfo.isPending}
        onSubmit={invest}*/
        />
      </Fragment>
    );
  }
}

FollowPopup.propTypes = {
  /*fetchInfo: PropTypes.func,
  invest: PropTypes.func,
  currency: PropTypes.string,
  info: PropTypes.shape({
    availableInWallet: PropTypes.number,
    availableToInvest: PropTypes.number,
    entryFee: PropTypes.number,
    periodEnds: PropTypes.instanceOf(Date),
    rate: PropTypes.number,
    title: PropTypes.string
  })*/
};

export default FollowPopup;
