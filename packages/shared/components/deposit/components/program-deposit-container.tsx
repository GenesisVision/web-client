import { FundInvestInfo } from "gv-api-web";
import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import RootState from "shared/reducers/root-reducer";
import { ResponseError } from "shared/utils/types";

import {
  getProgramInfoCreator,
  programInvestCreator
} from "../services/program-deposit.service";
import DepositPopup from "./deposit-popup";

class _ProgramDepositContainer extends React.Component<Props, State> {
  state = {
    errorMessage: ""
  };

  handleInvest = (
    amount: number,
    currency: string,
    setSubmitting: (isSubmitting: boolean) => void
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
  service: bindActionCreators<any, any>(
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

interface DispatchProps {
  service: {
    programInvest(id: string, amount: number, currency: string): Promise<void>;
  };
}

interface Props extends OwnProps, IDialogProps, DispatchProps {}

interface State {
  errorMessage: string;
}
