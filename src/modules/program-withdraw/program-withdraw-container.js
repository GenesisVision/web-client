import Dialog from "components/dialog/dialog";
import ProgramWithdrawPopup from "modules/program-withdraw/components/program-withdraw-popup";
import {
  getProgramWithdrawInfo,
  withdrawProgramById
} from "modules/program-withdraw/servives/program-withdraw.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";

class ProgramWithdrawContainer extends Component {
  handleWithdraw = amount => {
    return withdrawProgramById(this.props.id, amount).then(() => {
      this.props.onClose();
    });
  };
  render() {
    const { open, onClose, currency, services, id } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <ProgramWithdrawPopup
          currency={currency}
          fetchInfo={() => services.getProgramWithdrawInfo(id)}
          withdraw={this.handleWithdraw}
        />
      </Dialog>
    );
  }
}

ProgramWithdrawContainer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string
};

const mapStateToProps = state => ({
  currency: state.accountSettings.currency
});

const mapDispathToProps = dispatch => ({
  services: bindActionCreators(
    {
      getProgramWithdrawInfo
    },
    dispatch
  )
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispathToProps
  )
)(ProgramWithdrawContainer);
