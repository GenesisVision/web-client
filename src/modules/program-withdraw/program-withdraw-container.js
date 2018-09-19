import Dialog from "components/dialog/dialog";
import ProgramWithdrawPopup from "modules/program-withdraw/components/program-withdraw-popup";
import { getProgramWithdrawInfo } from "modules/program-withdraw/servives/program-withdraw.services";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const ProgramWithdrawContainer = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <ProgramWithdrawPopup
        fetchInfo={() => props.services.getProgramWithdrawInfo(props.id)}
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
  // "title": "string",
  // "availableToWithdraw": 0,
  // "periodEnds": "2018-09-19T09:41:16.940Z",
  // "rate": 0
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
