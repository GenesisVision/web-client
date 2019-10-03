import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FundWithdrawDialog from "shared/components/fund-withdraw/fund-withdraw-dialog";
import {
  FundWithdraw,
  FundWithdrawalInfoResponse
} from "shared/components/fund-withdraw/fund-withdraw.types";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import { RootState } from "shared/reducers/root-reducer";
import { MiddlewareDispatch } from "shared/utils/types";

import {
  getFundWithdrawInfo,
  withdrawFund
} from "./services/fund-withdrawal.services";

interface IDispatchProps {
  fetchInfo(): Promise<FundWithdrawalInfoResponse>;
  withdraw(value: FundWithdraw): Promise<void>;
}

const mapDispatchToProps = (
  dispatch: MiddlewareDispatch,
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
    fetchInfo: () => {
      return dispatch(getFundWithdrawInfo(id, accountCurrency))
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
  RootState,
  IDispatchProps,
  IFundWithdrawalContainerProps
>(
  null,
  mapDispatchToProps
)(FundWithdrawDialog);

export default FundWithdrawalContainer;
