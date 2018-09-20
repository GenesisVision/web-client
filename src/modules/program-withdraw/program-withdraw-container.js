import Dialog from "components/dialog/dialog";
import ProgramWithdrawPopup from "modules/program-withdraw/components/program-withdraw-popup";
import {
  getProgramWithdrawInfo,
  withdrawProgramById
} from "modules/program-withdraw/servives/program-withdraw.services";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const ProgramWithdrawContainer = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <ProgramWithdrawPopup
        currency={props.currency}
        fetchInfo={() => props.services.getProgramWithdrawInfo(props.id)}
        withdraw={amount =>
          console.info(amount) || withdrawProgramById(props.id, amount)
        }
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
      getProgramWithdrawInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(ProgramWithdrawContainer);
