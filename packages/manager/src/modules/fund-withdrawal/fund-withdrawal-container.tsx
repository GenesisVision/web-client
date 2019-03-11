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
  accountCurrency: string;
  onSubmit(): void;
}

const mapDispatchToProps = (
  dispatch: Dispatch<any>,
  ownProps: IFundWithdrawDialogOwnProps
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
    accountCurrency: accountCurrency,
    fetchInfo: getFundWithdrawInfo(id, accountCurrency),
    withdraw: service.withdrawFund
  };
};

const FundWithdrawalContainer = connect(
  null,
  mapDispatchToProps
)(FundWithdrawDialog);

export default FundWithdrawalContainer;
