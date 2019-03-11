import { ProgramPwdUpdate } from "gv-api-web";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import RootState from "shared/reducers/root-reducer";

import ChangePasswordTradingAccountForm, {
  IChangePasswordTradingAccountFormValues
} from "./components/change-password-trading-account-form";
import { changePasswordTradingAccount } from "./services/change-password-trading-account.service";

interface IChangePasswordTradingAccountPopupOwnProps extends IDialogProps {
  id: string;
}

interface IChangePasswordTradingAccountPopupOtherProps {
  twoFactorEnabled: boolean;
  service: {
    changePasswordTradingAccount(
      id: string,
      model?: ProgramPwdUpdate
    ): Promise<void>;
  };
}

type IChangePasswordTradingAccountPopupProps = IChangePasswordTradingAccountPopupOwnProps &
  IChangePasswordTradingAccountPopupOtherProps;

interface IChangePasswordTradingAccountPopupState {
  errorMessage: string;
}

class ChangePasswordTradingAccountPopup extends Component<
  IChangePasswordTradingAccountPopupProps,
  IChangePasswordTradingAccountPopupState
> {
  state = {
    errorMessage: ""
  };

  handleApply = (
    values: IChangePasswordTradingAccountFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { id, service, onClose } = this.props;
    const model = {
      password: values.password,
      twoFactorCode: values.twoFactorCode
    };

    service
      .changePasswordTradingAccount(id, model)
      .then(() => {
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
    const { open, twoFactorEnabled } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <ChangePasswordTradingAccountForm
          twoFactorEnabled={twoFactorEnabled}
          errorMessage={errorMessage}
          onSubmit={this.handleApply}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  if (!state.accountSettings) return;
  const twoFactorEnabled = state.accountSettings.twoFactorAuth.data
    ? state.accountSettings.twoFactorAuth.data.twoFactorEnabled
    : false;
  return { twoFactorEnabled };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    {
      changePasswordTradingAccount
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordTradingAccountPopup);
