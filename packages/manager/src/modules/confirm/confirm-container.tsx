import * as React from "react";
import * as service from "./services/confirm.services";
import { TwoFactorAuthenticator } from "gv-api-web";
import { IConfirmFormValues } from "./components/confirm-form";
import { ResponseError, SetSubmittingType } from "shared/utils/types";
import GoogleAuthStepsContainer from "shared/modules/2fa/google-auth/google-auth-steps/google-auth-steps";

class _ConfirmContainer extends React.PureComponent<Props, State> {
  state = { serverError: "", data: undefined, twoFactorCode: undefined };
  componentDidMount() {
    const { programId } = this.props;
    service.get2faInfo({ programId }).then((data: TwoFactorAuthenticator) => {
      this.setState({ data });
    });
  }

  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ serverError: "" });
    onClose();
  };

  handleConfirm = (
    values: IConfirmFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { programId, onApply } = this.props;
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
    const { data, serverError } = this.state;
    if (!data) return null;
    const { authenticatorUri, sharedKey } = data;
    return (
      data && (
        <GoogleAuthStepsContainer
          authenticatorUri={authenticatorUri}
          sharedKey={sharedKey}
          onSubmit={this.handleConfirm}
          errorMessage={serverError}
        />
      )
    );
  }
}

interface State {
  serverError: string;
  data?: TwoFactorAuthenticator;
  twoFactorCode?: string;
}
interface Props extends IConfirmProgramProps, OwnProps {}
interface OwnProps {
  onApply: () => void;
  open: boolean;
  onClose: () => void;
}
export interface IConfirmProgramProps {
  programId: string;
}

const ConfirmContainer = React.memo(_ConfirmContainer);
export default ConfirmContainer;
