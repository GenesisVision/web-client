import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Dialog from "shared/components/dialog/dialog";

import ConfirmPopup from "./components/confirm-popup";
import { confirm } from "./services/confirm.services";
import { TwoFactorAuthenticator } from "gv-api-web";
import { IConfirmFormValues } from "./components/confirm-form";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

class _ConfirmContainer extends React.PureComponent<Props, State> {
  state = { serverError: "", info: undefined };

  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ serverError: "" });
    onClose();
  };

  handleConfirm = (
    values: IConfirmFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { service, programId, onApply } = this.props;
    service
      .confirm({ ...values, programId })
      .then(() => {
        this.handleClose();
        if (onApply) {
          onApply();
        }
      })
      .catch((error: ResponseError) => {
        this.setState({ serverError: error.errorMessage });
        setSubmitting(false);
      });
  };
  render() {
    const { open } = this.props;
    const { info } = this.state;
    return (
      info && (
        <Dialog open={open} onClose={this.handleClose}>
          <ConfirmPopup
            info={info}
            edit={this.handleConfirm}
            serverError={this.state.serverError}
          />
        </Dialog>
      )
    );
  }
}

interface State {
  serverError: string;
  info?: TwoFactorAuthenticator;
}
interface Props extends IConfirmProgramProps, OwnProps, DispatchProps {}
interface OwnProps {
  onApply: () => void;
  open: boolean;
  onClose: () => void;
}
export interface IConfirmProgramProps {
  programId: string;
}
interface DispatchProps {
  service: { confirm: Function };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      confirm
    },
    dispatch
  )
});

const ConfirmContainer = React.memo(
  connect(
    undefined,
    mapDispatchToProps
  )(_ConfirmContainer)
);
export default ConfirmContainer;
