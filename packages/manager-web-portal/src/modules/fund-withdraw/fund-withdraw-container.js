import Dialog from "shared/components/dialog/dialog";
import FundWithdrawPopup from "modules/fund-withdraw/components/fund-withdraw-popup";
import {
  alert,
  getFundWithdrawInfo
} from "modules/fund-withdraw/servives/fund-withdraw.services";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import { managerApiProxy } from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

class FundWithdrawContainer extends PureComponent {
  state = { error: "" };

  handleWithdraw = (id, percent) => {
    return managerApiProxy
      .v10ManagerFundsByIdWithdrawByPercentPost(
        id,
        percent,
        authService.getAuthArg()
      )
      .then(res => {
        this.props.onClose();
        this.props.services.alert(
          "success",
          "withdraw-fund.success-alert-message",
          true
        );
        return res;
      })
      .catch(error => {
        this.setState({ error: error.errorMessage || error.error });
      });
  };

  render() {
    const {
      open,
      onClose,
      fundCurrency,
      accountCurrency,
      services,
      id
    } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <FundWithdrawPopup
          fundCurrency={fundCurrency}
          accountCurrency={accountCurrency}
          fetchInfo={() => services.getFundWithdrawInfo(id)}
          withdraw={percent => this.handleWithdraw(id, percent)}
          error={this.state.error}
        />
      </Dialog>
    );
  }
}

FundWithdrawContainer.propTypes = {
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
      getFundWithdrawInfo,
      alert
    },
    dispatch
  )
});

export default compose(
  translate(),
  connect(mapStateToProps, mapDispathToProps)
)(FundWithdrawContainer);
