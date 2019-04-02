import {
  getProgramWithdrawInfo,
  withdrawProgramById
} from "modules/program-withdraw/servives/program-withdraw.services";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import ProgramWithdrawPopup from "shared/components/program-withdraw/program-withdraw-popup";

class ProgramWithdrawContainer extends PureComponent {
  state = { errorMessage: null };

  handleWithdraw = (id, percent) => {
    return this.props.services
      .withdrawProgramById(id, percent)
      .then(() => {
        this.props.onClose();
        this.props.onSubmit();
      })
      .catch(error => {
        this.setState(error);
      });
  };

  render() {
    const {
      open,
      onClose,
      services,
      id,
      assetCurrency,
      accountCurrency
    } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <ProgramWithdrawPopup
          assetCurrency={assetCurrency}
          accountCurrency={accountCurrency}
          fetchInfo={() => services.getProgramWithdrawInfo(id)}
          withdraw={amount => this.handleWithdraw(id, amount)}
          errorMessage={this.state.errorMessage}
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
  accountCurrency: state.accountSettings.currency
});

const mapDispathToProps = dispatch => ({
  services: bindActionCreators(
    {
      getProgramWithdrawInfo,
      withdrawProgramById
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
