import { ProgramPwdUpdate } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { SetSubmittingType } from "shared/utils/types";

import { ManagerRootState } from "../../reducers";
import ChangePasswordTradingAccountForm, {
  IChangePasswordTradingAccountFormValues
} from "./components/change-password-trading-account-form";
import { changePasswordTradingAccount } from "./services/change-password-trading-account.service";

interface IChangePasswordTradingAccountPopupOwnProps extends IDialogProps {
  id: string;
  programName: string;
}

interface IChangePasswordTradingAccountPopupStateProps {
  twoFactorEnabled: boolean;
}

interface IChangePasswordTradingAccountPopupDispatchProps {
  service: {
    changePasswordTradingAccount(
      id: string,
      model?: ProgramPwdUpdate
    ): Promise<void>;
  };
}

type IChangePasswordTradingAccountPopupProps = IChangePasswordTradingAccountPopupOwnProps &
  IChangePasswordTradingAccountPopupStateProps &
  IChangePasswordTradingAccountPopupDispatchProps;

interface IChangePasswordTradingAccountPopupState {
  errorMessage: string;
}

class _ChangePasswordTradingAccountPopup extends React.PureComponent<
  IChangePasswordTradingAccountPopupProps,
  IChangePasswordTradingAccountPopupState
> {
  state = {
    errorMessage: ""
  };

  handleApply = (
    values: IChangePasswordTradingAccountFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { id, service, onClose } = this.props;
    const model = {
      password: values.password,
      twoFactorCode: values.twoFactorCode
    };

    service
      .changePasswordTradingAccount(id, model)
      .then(() => {
        this.setState({ errorMessage: "" });
        onClose();
      })
      .catch((error: any) => {
        setSubmitting(false);
        this.setState({ errorMessage: error.errorMessage });
      });
  };

  handleClose = () => {
    this.setState({ errorMessage: "" });
    this.props.onClose();
  };

  render() {
    const { open, twoFactorEnabled, programName } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <ChangePasswordTradingAccountForm
          programName={programName}
          twoFactorEnabled={twoFactorEnabled}
          errorMessage={errorMessage}
          onSubmit={this.handleApply}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (
  state: ManagerRootState
): IChangePasswordTradingAccountPopupStateProps => {
  const twoFactorEnabled = state.accountSettings.twoFactorAuth.data
    ? state.accountSettings.twoFactorAuth.data.twoFactorEnabled
    : false;
  return { twoFactorEnabled };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): IChangePasswordTradingAccountPopupDispatchProps => ({
  service: bindActionCreators(
    {
      changePasswordTradingAccount
    },
    dispatch
  )
});

const ChangePasswordTradingAccountPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ChangePasswordTradingAccountPopup);
export default ChangePasswordTradingAccountPopup;
