import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { bindActionCreators } from "redux";
import { FundWithdrawDialog } from "shared/components/fund-withdraw/fund-withdraw-dialog";
import { FundWithdraw, FundWithdrawalInfoResponse } from "shared/components/fund-withdraw/fund-withdraw.types";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import { MiddlewareDispatch } from "shared/utils/types";

import { fetchFundWithdrawInfo, withdrawFund } from "./services/fund-withdrawal.services";

interface DispatchState {
  fetchInfo(): Promise<FundWithdrawalInfoResponse>;
  withdraw(value: FundWithdraw): Promise<void>;
}

const mapDispatchToProps = (
  dispatch: MiddlewareDispatch,
  ownProps: IFundWithdrawalContainerProps
): DispatchState => {
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
    fetchInfo: () => {
      return dispatch(fetchFundWithdrawInfo(id, accountCurrency))
        .then(data => data)
        .catch(error => {
          onClose();
          return error;
        });
    },
    withdraw: service.withdrawFund
  };
};

const FundWithdrawalContainer = connect<
  InvestorRootState,
  DispatchState,
  IFundWithdrawalContainerProps
>(
  null,
  mapDispatchToProps
)(FundWithdrawDialog);

export default FundWithdrawalContainer;
