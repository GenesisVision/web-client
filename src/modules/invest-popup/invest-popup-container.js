import Modal from "components/modal/modal";
import {
  clearInvestInfo,
  clearInvestSubmit
} from "modules/invest-popup/actions/invest-popup.actions";
import {
  getInvestInfoById,
  investServiceInvestById
} from "modules/invest-popup/services/invest-popup.services";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import InvestPopup from "./components/invest-popup";

const InvestPopupContainer = props => {
  const handleClose = () => {
    props.onClose();
    props.service.clearInvestInfo();
    props.service.clearInvestSubmit();
  };
  const handleInvest = amount => {
    props.service.investServiceInvestById(props.id, amount).then(handleClose);
  };
  return (
    <Modal open={props.open} onClose={handleClose}>
      <InvestPopup
        submitInfo={props.submitInfo}
        currency={props.currency}
        info={props.info.data}
        id={props.id}
        fetchInfo={props.service.getInvestInfoById}
        invest={handleInvest}
      />
    </Modal>
  );
};

InvestPopupContainer.propTypes = {
  open: PropTypes.bool,
  id: PropTypes.string.isRequired,
  currency: PropTypes.string,
  onClose: PropTypes.func
};

const mapStateToProps = state => ({
  info: state.investPopup.info,
  submitInfo: state.investPopup.submit,
  currency: state.accountSettings.currentCurrency
});

const mapDispatchToProps = dispath => ({
  service: bindActionCreators(
    {
      getInvestInfoById,
      investServiceInvestById,
      clearInvestInfo,
      clearInvestSubmit
    },
    dispath
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestPopupContainer);
