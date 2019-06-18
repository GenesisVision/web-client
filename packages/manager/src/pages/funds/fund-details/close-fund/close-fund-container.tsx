import { TwoFactorStatus } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { closeFund } from "shared/components/funds/fund-details/services/fund-details.service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { twoFactorSelector } from "shared/reducers/2fa-reducer";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import CloseFundForm, { ICloseFundFormValues } from "./close-fund-form";

class _CloseFundContainer extends React.PureComponent<Props, State> {
  state = { errorMessage: "" };
  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ errorMessage: "" });
    onClose();
  };
  handleSubmit = (
    data: ICloseFundFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { service, onApply, id } = this.props;
    closeFund(id, data)
      .then(() => {
        this.handleClose();
        service.alertSuccess();
        onApply();
      })
      .catch(e => {
        this.setState({ errorMessage: e.errorMessage });
        setSubmitting(false);
      });
  };

  render() {
    const { open, twoFactorAuth, onClose } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose} className="dialog--wider">
        <CloseFundForm
          condition={!!twoFactorAuth}
          loader={<DialogLoader />}
          onSubmit={this.handleSubmit}
          onCancel={onClose}
          twoFactorEnabled={twoFactorAuth!.twoFactorEnabled}
          errorMessage={errorMessage}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => ({
  twoFactorAuth: twoFactorSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      alertSuccess: () =>
        alertMessageActions.success(
          "fund-details-page.description.close-fund-notification-success",
          true
        )
    },
    dispatch
  )
});

interface Props extends OwnProps, StateProps, DispatchProps {}

interface OwnProps {
  id: string;
  onClose: () => void;
  onApply: () => void;
  open: boolean;
}

interface StateProps {
  twoFactorAuth?: TwoFactorStatus;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  alertSuccess: () => void;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface State {
  errorMessage: string;
}

const CloseFundContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AuthRootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_CloseFundContainer);
export default CloseFundContainer;
