import Dialog from "components/dialog/dialog";
import FundWithdrawPopup from "modules/fund-withdraw/components/fund-withdraw-popup";
import {
  getFundWithdrawInfo,
  withdrawFundById
} from "modules/fund-withdraw/servives/fund-withdraw.services";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";

const FundWithdrawContainer = props => {
  const { open, onClose, currency, services, id, type } = props;
  const handleWithdraw = (id, percent) => {
    return services.withdrawFundById(id, percent)
      .then(res => {
        debugger;
        onClose();
        return res;
      })
      .catch(error => {
        debugger;
        onClose();
        return error;
      });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <FundWithdrawPopup
        currency={currency}
        fetchInfo={() => services.getFundWithdrawInfo(id)}
        withdraw={percent => handleWithdraw(id, percent)}
        type={type}
      />
    </Dialog>
  );
};

FundWithdrawContainer.propTypes = {
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
      getFundWithdrawInfo,
      withdrawFundById,
      getFundWithdrawInfo,
      withdrawFundById
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
)(FundWithdrawContainer);
