import { AttachToSignalProviderInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { Dispatch, bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { FOLLOW_TYPE } from "shared/constants/constants";
import {
  AlertActionCreator,
  alertMessageActions
} from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";

import FollowPopupForm from "./follow-popup/follow-popup-form";
import {
  attachToSignal,
  getSignalAccounts,
  getSignalInfo,
  updateAttachToSignal
} from "./services/program-follow-service";

class _ProgramFollowContainer extends React.PureComponent<Props, State> {
  state: State = {
    isPending: false,
    accounts: [],
    type: undefined,
    volumeFee: undefined,
    minDeposit: undefined,
    hasActiveSubscription: undefined,
    hasSignalAccount: undefined
  };

  componentDidMount() {
    if (!authService.getAuthArg()) return;
    this.setState({ isPending: true });
    getSignalAccounts()
      .then(CopyTradingAccountsList => {
        const { accounts } = CopyTradingAccountsList;
        this.setState({ accounts });
        return getSignalInfo(this.props.id);
      })
      .then((info: AttachToSignalProviderInfo) => {
        const {
          hasSignalAccount,
          volumeFee,
          minDeposit,
          hasActiveSubscription
        } = info;
        this.setState({
          type: hasActiveSubscription ? FOLLOW_TYPE.EDIT : FOLLOW_TYPE.CREATE,
          hasSignalAccount,
          volumeFee,
          minDeposit,
          hasActiveSubscription,
          isPending: false
        });
      });
  }

  render() {
    const { service, wallets, open, onClose, currency, id } = this.props;
    const {
      isPending,
      type,
      accounts,
      hasSignalAccount,
      minDeposit
    } = this.state;
    const handleClose = () => {
      onClose();
    };
    const handleSubmit = () => {
      onClose();
    };
    const submitMethod =
      type === FOLLOW_TYPE.CREATE ? attachToSignal : updateAttachToSignal;
    return (
      <Dialog open={open} onClose={handleClose}>
        {isPending ? (
          <DialogLoader />
        ) : (
          <FollowPopupForm
            minDeposit={minDeposit!}
            hasSignalAccount={hasSignalAccount!}
            alertError={service.alertError}
            alertSuccess={service.alertSuccess}
            id={id}
            accounts={accounts}
            currency={currency}
            wallets={wallets!}
            submitMethod={submitMethod}
            handleSubmit={handleSubmit}
          />
        )}
      </Dialog>
    );
  }
}

const mapStateToProps = (state: InvestorRootState): StateProps => {
  const { wallet } = state;
  return {
    wallets: wallet.info.data ? wallet.info.data.wallets : undefined
  };
};

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
  wallets?: WalletData[];
}

interface Props extends DispatchProps, StateProps {
  open: boolean;
  onClose(): void;
  onApply(): void;
  currency: string;
  id: string;
}

interface State {
  isPending: boolean;
  accounts: any | null;
  hasSignalAccount?: boolean;
  hasActiveSubscription?: boolean;
  volumeFee?: number;
  minDeposit?: number;
  type?: FOLLOW_TYPE;
}

const ProgramFollowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProgramFollowContainer);
export default ProgramFollowContainer;
