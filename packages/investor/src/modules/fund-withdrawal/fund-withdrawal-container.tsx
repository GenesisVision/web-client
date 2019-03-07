import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { IDialogProps } from "shared/components/dialog/dialog";
import FundWithdrawDialog from "shared/components/fund-withdraw/fund-withdraw-dialog";

import {
  getFundWithdrawInfo,
  withdrawFund
} from "./services/fund-withdrawal.services";

interface IFundWithdrawDialogOwnProps extends IDialogProps {
  id: string;
  assetCurrency: string;
}

const mapDispatchToProps = (
  dispatch: Dispatch<any>,
  ownProps: IFundWithdrawDialogOwnProps
) => {
  const { id, assetCurrency, onClose } = ownProps;
  const service = bindActionCreators(
    {
      withdrawFund: withdrawFund(id, onClose)
    },
    dispatch
  );
  return {
    accountCurrency: assetCurrency,
    fetchInfo: getFundWithdrawInfo(id, assetCurrency),
    withdraw: service.withdrawFund
  };
};

const FundWithdrawalContainer = connect(
  null,
  mapDispatchToProps
)(FundWithdrawDialog);

export default FundWithdrawalContainer;
