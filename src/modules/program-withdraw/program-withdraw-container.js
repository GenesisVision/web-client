import Dialog from "components/dialog/dialog";
import ProgramWithdrawPopup from "modules/program-withdraw/components/program-withdraw-popup";
import {
  getProgramWithdrawInfo,
  withdrawProgramById
} from "modules/program-withdraw/servives/program-withdraw.services";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";

const ProgramWithdrawContainer = props => {
  const { open, onClose, currency, services, id, type } = props;
  const handleWithdraw = (id, amount) => {
    return services.withdrawProgramById(id, amount).then(res => {
      onClose();
      return res;
    });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        currency={currency}
        fetchInfo={() => services.getProgramWithdrawInfo(id)}
        withdraw={amount => handleWithdraw(id, amount)}
        type={type}
      />
    </Dialog>
  );
};

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
