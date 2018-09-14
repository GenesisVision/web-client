import "./invest-popup.scss";

import Dialog from "components/dialog/dialog";
import PropTypes from "prop-types";
import React, { Component } from "react";

import InvestForm from "./invest-form";
import InvestTop from "./invest-top";

class InvestPopup extends Component {
  componentDidMount() {
    this.props.fetchInfo(this.props.id);
  }

  render() {
    return this.props.info ? (
      <Dialog
        className="invest-dialog"
        top={<InvestTop info={this.props.info} />}
        bottom={
          <InvestForm
            errorMessage={this.props.submitInfo.errorMessage}
            currency={this.props.currency}
            info={this.props.info}
            disabled={this.props.submitInfo.isPending}
            onSubmit={this.props.invest}
          />
        }
      />
    ) : null;
  }
}

InvestPopup.propTypes = {
  fetchInfo: PropTypes.func,
  invest: PropTypes.func,
  currency: PropTypes.string,
  info: PropTypes.shape({
    availableInWallet: PropTypes.number,
    availableToInvest: PropTypes.number,
    entryFee: PropTypes.number,
    periodEnds: PropTypes.string,
    rate: PropTypes.number,
    title: PropTypes.string
  })
};

export default InvestPopup;
