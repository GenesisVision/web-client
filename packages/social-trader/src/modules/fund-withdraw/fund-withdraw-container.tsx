import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { FundWithdrawDialog } from "shared/components/fund-withdraw/fund-withdraw-dialog";
import {
  FundWithdraw,
  FundWithdrawInfoResponse
} from "shared/components/fund-withdraw/fund-withdraw.types";
import { IFundWithdrawContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import {
  getFundWithdrawInfo,
  withdrawFund
} from "./services/fund-withdraw.services";

interface IDispatchProps {
  fetchInfo(): Promise<FundWithdrawInfoResponse>;
  withdraw(value: FundWithdraw): Promise<void>;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IFundWithdrawContainerProps
) => {
  const { id, accountCurrency, onSubmit, onClose } = ownProps;
  const onSubmitWithdraw = () => {
    onClose();
    onSubmit && onSubmit();
  };
  const service = bindActionCreators(
    {
      withdrawFund: withdrawFund(id, onSubmitWithdraw)
    },
    dispatch
  );
  return {
    fetchInfo: getFundWithdrawInfo(id, accountCurrency),
    withdraw: service.withdrawFund
  };
};

const FundWithdrawContainer = connect<
  RootState,
  IDispatchProps,
  IFundWithdrawContainerProps
>(
  null,
  mapDispatchToProps
)(FundWithdrawDialog);
export default FundWithdrawContainer;
