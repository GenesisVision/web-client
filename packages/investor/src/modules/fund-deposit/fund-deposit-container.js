import Dialog from "shared/components/dialog/dialog";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  clearDepositFundInfo,
  clearInvestSubmitFund
} from "./actions/fund-deposit.actions";
import DepositPopup from "shared/components/deposit/deposit-popup";
import {
  getDepositFundInfoById,
  investServiceInvestById
} from "./services/fund-deposit.services";

const FundDepositContainer = props => {
  const { service, id, onInvest } = props;
  const handleClose = () => {
    props.onClose();
    props.service.clearDepositFundInfo();
    props.service.clearInvestSubmitFund();
  };
  const handleInvest = amount => {
    service
      .investServiceInvestById({
        id,
        amount
      })
      .then(() => {
        handleClose();
        if (onInvest) {
          onInvest();
        }
      });
  };
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DepositPopup
        entryFee
        submitInfo={props.submitInfo}
        currency={props.currency}
        info={props.info.data}
        id={props.id}
        fetchInfo={props.service.getDepositFundInfoById}
        invest={handleInvest}
      />
    </Dialog>
  );
};

FundDepositContainer.propTypes = {
  open: PropTypes.bool,
  id: PropTypes.string.isRequired,
  currency: PropTypes.string,
  onClose: PropTypes.func,
  onInvest: PropTypes.func,
  service: PropTypes.shape({
    getDepositFundInfoById: PropTypes.func,
    investServiceInvestById: PropTypes.func,
    clearInvestSubmit: PropTypes.func
  })
};

const mapStateToProps = state => ({
  info: state.fundDeposit.info,
  submitInfo: state.fundDeposit.submit,
  currency: state.accountSettings.currency
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      getDepositFundInfoById,
      clearDepositFundInfo,
      investServiceInvestById,
      clearInvestSubmitFund
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundDepositContainer);
