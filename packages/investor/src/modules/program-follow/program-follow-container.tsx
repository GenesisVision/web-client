import {
  AttachToSignalProvider,
  AttachToSignalProviderInfo,
  SignalSubscription,
  WalletData
} from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { Dispatch, bindActionCreators, compose } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { FOLLOW_TYPE } from "shared/constants/constants";
import {
  AlertActionCreator,
  alertMessageActions
} from "shared/modules/alert-message/actions/alert-message-actions";
import { rateApi } from "shared/services/api-client/rate-api";
import authService from "shared/services/auth-service";
import {
  CurrencyEnum,
  ResponseError,
  SetSubmittingType
} from "shared/utils/types";

import FollowPopupForm from "./follow-popup/follow-popup-form";
import {
  attachToSignal,
  getSignalInfo,
  updateAttachToSignal
} from "./services/program-follow-service";

class _ProgramFollowContainer extends React.PureComponent<Props, State> {
  state: State = {
    rate: 1,
    isPending: false,
    type: undefined,
    volumeFee: undefined,
    minDeposit: undefined
  };

  componentDidMount() {
    if (!authService.getAuthArg()) return; // TODO change to HOC
    const { id, signalSubscription, currency } = this.props;
    this.setState({ isPending: true });
    getSignalInfo(id)
      .then((info: AttachToSignalProviderInfo) => {
        const { volumeFee, minDeposit } = info;
        this.setState({
          type: signalSubscription.hasActiveSubscription
            ? FOLLOW_TYPE.EDIT
            : FOLLOW_TYPE.CREATE,
          volumeFee,
          minDeposit,
          isPending: false
        });
        return rateApi.v10RateByFromByToGet("USD", currency);
      })
      .then(rate => this.setState({ rate }));
  }

  componentDidUpdate() {
    this.setState({
      type: this.props.signalSubscription.hasActiveSubscription
        ? FOLLOW_TYPE.EDIT
        : FOLLOW_TYPE.CREATE
    });
  }

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = (
    programId: string,
    requestParams: AttachToSignalProvider,
    setSubmitting: SetSubmittingType
  ) => {
    const { type } = this.state;
    const { service, t, onApply, onClose } = this.props;
    const method =
      type === FOLLOW_TYPE.CREATE ? attachToSignal : updateAttachToSignal;
    const message =
      type === FOLLOW_TYPE.CREATE
        ? "follow-program.create-success-alert-message"
        : "follow-program.edit-success-alert-message";
    method(programId, requestParams)
      .then(() => {
        service.alertSuccess(t(message));
        onApply();
        onClose();
      })
      .catch((errors: ResponseError) => {
        service.alertError(errors.errorMessage);
        setSubmitting(false);
      });
  };

  render() {
    const { wallets, open, currency, id, signalSubscription } = this.props;
    const { isPending, minDeposit, rate } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <FollowPopupForm
          rate={rate}
          condition={!isPending && !!wallets.length}
          loader={<DialogLoader />}
          signalSubscription={signalSubscription}
          minDeposit={minDeposit!}
          id={id}
          currency={currency}
          wallets={wallets}
          submitMethod={this.handleSubmit}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state: InvestorRootState): StateProps => ({
  wallets: walletsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      alertError: alertMessageActions.error,
      alertSuccess: alertMessageActions.success
    },
    dispatch
  )
});

interface DispatchProps {
  service: { alertError: AlertActionCreator; alertSuccess: AlertActionCreator };
}

interface StateProps {
  wallets: WalletData[];
}

interface OwnProps {
  open: boolean;
  onClose(): void;
  onApply(): void;
  currency: CurrencyEnum;
  id: string;
  signalSubscription: SignalSubscription;
}

interface Props extends DispatchProps, StateProps, OwnProps, WithTranslation {}

interface State {
  isPending: boolean;
  volumeFee?: number;
  minDeposit?: number;
  type?: FOLLOW_TYPE;
  rate: number;
}

const ProgramFollowContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_ProgramFollowContainer);
export default ProgramFollowContainer;
