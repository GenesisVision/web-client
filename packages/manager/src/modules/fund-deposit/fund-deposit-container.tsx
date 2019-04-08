import * as React from "react";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { Dispatch, bindActionCreators } from "redux";
import DepositPopup from "shared/components/deposit/deposit-popup";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import { ResponseError, RootThunk } from "shared/utils/types";

import {
  fundInvest,
  getDepositFundInfo
} from "./services/fund-deposit.services";

class _FundDepositContainer extends React.Component<Props, State> {
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
    const { id, open, onClose, currency } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={onClose}>
        <DepositPopup
          asset={ASSET.FUND}
          currency={currency}
          id={id}
          fetchInfo={getDepositFundInfo}
          invest={this.handleInvest}
          errorMessage={errorMessage}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state: ManagerRootState): StateProps => ({
  currency: state.accountSettings.currency
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<
    {
      fundInvest: (
        id: string,
        amount: number,
        currency: string
      ) => RootThunk<Promise<void>>;
    },
    {
      fundInvest: (
        id: string,
        amount: number,
        currency: string
      ) => Promise<void>;
    }
  >(
    {
      fundInvest
    },
    dispatch
  )
});

const FundDepositContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  ManagerRootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_FundDepositContainer);

export default FundDepositContainer;

interface OwnProps {
  id: string;
  onApply(): void;
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
