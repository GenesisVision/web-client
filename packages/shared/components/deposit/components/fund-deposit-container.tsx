import { FundInvestInfo } from "gv-api-web";
import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import RootState from "shared/reducers/root-reducer";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import {
  fundInvestCreator,
  getFundInfoCreator
} from "../services/fund-deposit.service";
import DepositPopup from "./deposit-popup";

class _FundDepositContainer extends React.PureComponent<Props, State> {
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
      .fundInvest(id, amount, currency)
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
          hasEntryFee={hasEntryFee}
          asset={ASSET.FUND}
          currency={currency}
          id={id}
          fetchInfo={getFundInfoCreator(fetchInfo)}
          invest={this.handleInvest}
          errorMessage={errorMessage}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  currency: state.accountSettings.currency
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: OwnProps
): DispatchProps => ({
  service: bindActionCreators<any, any>(
    {
      fundInvest: fundInvestCreator(props.fundInvest)
    },
    dispatch
  )
});

const FundDepositContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_FundDepositContainer);
export default FundDepositContainer;

interface OwnProps {
  id: string;
  hasEntryFee?: boolean;
  onApply(): void;
  fetchInfo(
    id: string,
    currency: string,
    authorization: string
  ): Promise<FundInvestInfo>;
  fundInvest(
    id: string,
    amount: number,
    authorization: string,
    opts: {
      currency: string;
    }
  ): Promise<void>;
}

interface StateProps {
  currency: string;
}

interface DispatchProps {
  service: {
    fundInvest(id: string, amount: number, currency: string): Promise<void>;
  };
}

interface Props extends OwnProps, IDialogProps, StateProps, DispatchProps {}

interface State {
  errorMessage: string;
}
