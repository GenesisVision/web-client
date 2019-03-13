import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import FundWithdrawDialog from "shared/components/fund-withdraw/fund-withdraw-dialog";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import RootState from "shared/reducers/root-reducer";

import {
  getFundWithdrawInfo,
  withdrawFund
} from "./services/fund-withdrawal.services";

interface IDispatchProps {
  fetchInfo: any;
  withdraw: any;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IFundWithdrawalContainerProps
) => {
  const { id, accountCurrency, onSubmit, onClose } = ownProps;
  const onSubmitWithdrawal = () => {
    onClose();
    onSubmit();
  };
  const service = bindActionCreators(
    {
      withdrawFund: withdrawFund(id, onSubmitWithdrawal)
    },
    dispatch
  );
  return {
    fetchInfo: getFundWithdrawInfo(id, accountCurrency),
    withdraw: service.withdrawFund
  };
};

const FundWithdrawalContainer = connect<
  RootState,
  IDispatchProps,
  IFundWithdrawalContainerProps
>(
  null,
  mapDispatchToProps
)(FundWithdrawDialog);

export default FundWithdrawalContainer;
