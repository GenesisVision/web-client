import { FundInvestInfo } from "gv-api-web";
import React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import {
  getProgramInfoCreator,
  programInvestCreator
} from "../services/program-deposit.service";
import DepositPopup from "./deposit-popup";

class _ProgramDepositContainer extends React.PureComponent<Props, State> {
  state = {
    errorMessage: ""
  };

  handleInvest = (
    amount: number,
    currency: string,
    setSubmitting: SetSubmittingType
  ) => {
    const { id, service } = this.props;
    service
      .programInvest(id, amount, currency)
      .then(() => {
        this.props.onApply();
        this.props.onClose();
      })
      .catch((error: ResponseError) => {
        this.setState({ errorMessage: error.errorMessage });
        setSubmitting(false);
      });
  };

  render() {
    const { id, open, hasEntryFee, onClose, currency, fetchInfo } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={onClose}>
        <DepositPopup
          asset={ASSET.PROGRAM}
          hasEntryFee={hasEntryFee}
          currency={currency}
          id={id}
          fetchInfo={getProgramInfoCreator(fetchInfo)}
          invest={this.handleInvest}
          errorMessage={errorMessage}
        />
      </Dialog>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      programInvest: programInvestCreator(props.programInvest)
    },
    dispatch
  )
});

const ProgramDepositContainer = connect<
  null,
  DispatchProps,
  OwnProps,
  RootState
>(
  null,
  mapDispatchToProps
)(_ProgramDepositContainer);
export default ProgramDepositContainer;

interface OwnProps {
  id: string;
  hasEntryFee?: boolean;
  currency: string;
  onApply(): void;
  fetchInfo(
    id: string,
    currency: string,
    authorization: string
  ): Promise<FundInvestInfo>;
  programInvest(
    id: string,
    amount: number,
    authorization: string,
    opts: {
      currency: string;
    }
  ): Promise<void>;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  programInvest: ReturnType<typeof programInvestCreator>;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, IDialogProps, DispatchProps {}

interface State {
  errorMessage: string;
}
