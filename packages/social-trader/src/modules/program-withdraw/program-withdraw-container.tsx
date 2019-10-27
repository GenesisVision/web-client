import { ProgramWithdrawInfo } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ProgramWithdrawDialog from "shared/components/program-withdraw/program-withdraw-dialog";
import { ProgramWithdrawType } from "shared/components/program-withdraw/program-withdraw-popup";
import { IProgramWithdrawalContainerProps } from "shared/components/programs/program-details/program-details.types";
import { RootState } from "shared/reducers/root-reducer";
import { MiddlewareDispatch } from "shared/utils/types";

import {
  getProgramWithdrawInfo,
  withdrawProgramById
} from "./services/program-withdraw.services";

const mapDispatchToProps = (
  dispatch: MiddlewareDispatch,
  ownProps: IProgramWithdrawalContainerProps
): DispatchProps => {
  const { id, accountCurrency, onSubmit, onClose } = ownProps;
  const onSubmitWithdrawal = () => {
    onClose();
    onSubmit();
  };

  const withdrawProgram = withdrawProgramById(id, onSubmitWithdrawal);

  return {
    fetchInfo: getProgramWithdrawInfo(id, accountCurrency),
    withdraw: value => dispatch(withdrawProgram(value))
  };
};

const ProgramWithdrawContainer = compose<
  React.ComponentType<IProgramWithdrawalContainerProps>
>(
  connect<RootState, DispatchProps, IProgramWithdrawalContainerProps>(
    null,
    mapDispatchToProps
  )
)(ProgramWithdrawDialog);
export default ProgramWithdrawContainer;

interface DispatchProps {
  fetchInfo(): Promise<ProgramWithdrawInfo>;
  withdraw(value: ProgramWithdrawType): Promise<void>;
}
