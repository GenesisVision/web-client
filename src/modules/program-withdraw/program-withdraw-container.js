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

import { alertMessageActions } from "../../shared/modules/alert-message/actions/alert-message-actions";

const ProgramWithdrawContainer = props => {
  const { t, open, onClose, currency, services, id } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        currency={currency}
        fetchInfo={() => services.getProgramWithdrawInfo(id)}
        withdraw={amount => {
          withdrawProgramById(id, amount).then(response => {
            services.notifySuccess(t("program-withdraw.success-alert-message"));
            return response;
          });
        }}
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
      notifySuccess: alertMessageActions.success
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
