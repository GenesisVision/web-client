import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DepositPopup from "shared/components/deposit/deposit-popup";
import Dialog from "shared/components/dialog/dialog";
import FollowPopup from "./follow-popup/follow-popup";
import FollowCreateAccount from "./follow-popup/follow-popup-create-account";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

/*import {
  clearDepositProgramInfo,
  clearInvestSubmit
} from "./actions/program-deposit.actions";
import {
  getDepositProgramInfoById,
  investServiceInvestById
} from "./services/program-deposit.services";*/

class ProgramFollowContainer extends Component {
  state = {
    isPending: false,
    walletsAddresses: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    walletApi
      .v10WalletAddressesGet(authService.getAuthArg())
      .then(wallets =>
        this.setState({ walletsAddresses: wallets.wallets, isPending: false })
      );
  }

  render() {
    const {
      service,
      id,
      onInvest,
      open,
      submitInfo,
      currency,
      info,
      onClose
    } = this.props;
    const { isPending, walletsAddresses } = this.state;
    if (!walletsAddresses || isPending) return null;
    const handleClose = () => {
      onClose();
      /* service.clearDepositProgramInfo();
       service.clearInvestSubmit();*/
    };
    const handleFollow = amount => {
      /*service
      .investServiceInvestById({
        id,
        amount
      })
      .then(() => {
        handleClose();
        if (onInvest) {
          onInvest();
        }
      });*/
    };
    return (
      <Dialog open={open} onClose={handleClose}>
        <FollowCreateAccount
          walletsAddresses={walletsAddresses}
          currency={"ETH"}
          /*investor
        program
        entryFee
        submitInfo={submitInfo}
        currency={currency}
        info={info.data}
        id={id}
        fetchInfo={service.getDepositProgramInfoById}
        invest={handleFollow}*/
        />
      </Dialog>
    );
  }
}

ProgramFollowContainer.propTypes = {
  /*open: PropTypes.bool,
  id: PropTypes.string.isRequired,
  currency: PropTypes.string,
  onClose: PropTypes.func,
  onInvest: PropTypes.func,
  service: PropTypes.shape({
    getDepositProgramInfoById: PropTypes.func,
    clearDepositProgramInfo: PropTypes.func,
    investServiceInvestById: PropTypes.func,
    clearInvestSubmit: PropTypes.func
  })*/
};

const mapStateToProps = state => {
  const { programDeposit, wallet } = state;
  return {
    wallets: wallet.info.data ? wallet.info.data.wallets : null,
    info: programDeposit.info,
    submitInfo: programDeposit.submit
  };
};
/*
const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      getDepositProgramInfoById,
      clearDepositProgramInfo,
      investServiceInvestById,
      clearInvestSubmit
    },
    dispatch
  )
});*/

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(ProgramFollowContainer);
