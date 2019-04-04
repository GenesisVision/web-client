import { ProgramWithdrawInfo } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import ProgramWithdrawDialog from "shared/components/program-withdraw/program-withdraw-dialog";
import { ProgramWithdrawType } from "shared/components/program-withdraw/program-withdraw.types";
import { IProgramWithdrawalContainerProps } from "shared/components/programs/program-details/program-details.types";
import RootState from "shared/reducers/root-reducer";
import { IntestorThunk } from "shared/utils/types";

import {
  getProgramWithdrawInfo,
  withdrawProgramById
} from "./services/program-withdraw.services";

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IProgramWithdrawalContainerProps
): DispatchProps => {
  const { id, accountCurrency, onSubmit, onClose } = ownProps;
  const onSubmitWithdrawal = () => {
    onClose();
    onSubmit();
  };
  const service = bindActionCreators(
    {
      withdrawProgramById: withdrawProgramById(id, onSubmitWithdrawal)
    },
    dispatch
  );
  return {
    fetchInfo: getProgramWithdrawInfo(id, accountCurrency),
    withdraw: service.withdrawProgramById
  };
};

const ProgramWithdrawContainer = connect<
  RootState,
  DispatchProps,
  IProgramWithdrawalContainerProps
>(
  null,
  mapDispatchToProps
)(ProgramWithdrawDialog);

interface DispatchProps {
  fetchInfo(): Promise<ProgramWithdrawInfo>;
  withdraw(value: ProgramWithdrawType): IntestorThunk<void>;
}

export default ProgramWithdrawContainer;
