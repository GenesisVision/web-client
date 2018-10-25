import Dialog from "components/dialog/dialog";
import ProgramWithdrawPopup from "modules/program-withdraw/components/program-withdraw-popup";
import {
  getProgramWithdrawInfo,
  withdrawProgramById,
  alert
} from "modules/program-withdraw/servives/program-withdraw.services";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import authService from "services/auth-service";
import { investorApiProxy } from "services/api-client/investor-api";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

const ProgramWithdrawContainer = props => {
  const { open, onClose, currency, services, id, type, programCurrency } = props;
  const handleWithdraw = (id, percent) => {
    return investorApiProxy
      .v10InvestorFundsByIdWithdrawByPercentPost(
        id,
        percent,
        authService.getAuthArg()
      )
      .then(() => {
        onClose();
        services.alert(
          "success",
          "withdraw-program.success-alert-message",
          true
        );
      })
      .catch(error => {
        onClose();
        services.alert("error", error.errorMessage || error.message);
      });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        currency={programCurrency}
        fetchInfo={() => services.getProgramWithdrawInfo(id)}
        withdraw={amount => handleWithdraw(id, amount)}
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
      withdrawProgramById,
      alert
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
