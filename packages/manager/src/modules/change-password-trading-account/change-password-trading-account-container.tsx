import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import RootState from "shared/reducers/root-reducer";

import ChangePasswordTradingAccountForm, {
  IChangePasswordTradingAccountFormValues
} from "./components/change-password-trading-account-form";
import {
  IchangePasswordTradingAccount,
  changePasswordTradingAccount
} from "./services/change-password-trading-account.service";

interface IChangePasswordTradingAccountOwnProps extends IDialogProps {
  id: string;
}

interface IChangePasswordTradingAccountDispatchProps {
  service: {
    changePasswordTradingAccount({
       id,
       opts
     }: IchangePasswordTradingAccount): Promise<void>;
  };
}

interface IChangePasswordTradingAccountStateProps {
  twoFactorEnabled: boolean;
}

type IChangePasswordTradingAccountProps = IChangePasswordTradingAccountOwnProps &
  IChangePasswordTradingAccountDispatchProps & IChangePasswordTradingAccountStateProps;

interface IChangePasswordTradingAccountState {
  errorMessage: string;
}

class ChangePasswordTradingAccountContainer extends Component<
  IChangePasswordTradingAccountProps,
  IChangePasswordTradingAccountState
> {
  state = {
    errorMessage: ""
  };

  handleApply = (
    values: IChangePasswordTradingAccountFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { id, service, onClose } = this.props;
    const {password} = values;

    const opts = values.twoFactorCode ? {
      password,
      twoFactorCode: values.twoFactorCode
    } : {
      password
    };

    // @ts-ignore
    service
      .changePasswordTradingAccount(id, opts)
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
  // @ts-ignore
  const { twoFactorEnabled } = state.accountSettings.twoFactorAuth.data;
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
)(ChangePasswordTradingAccountContainer);
