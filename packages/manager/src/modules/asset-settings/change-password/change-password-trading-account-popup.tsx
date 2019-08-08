import { ProgramPwdUpdate } from "gv-api-web";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { Dispatch, bindActionCreators, compose } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import useErrorMessage from "shared/hooks/error-message.hook";
import { twoFactorEnabledSelector } from "shared/reducers/2fa-reducer";
import { SetSubmittingType } from "shared/utils/types";

import ChangePasswordTradingAccountForm, {
  IChangePasswordTradingAccountFormValues
} from "./components/change-password-trading-account-form";
import { changePasswordTradingAccount } from "./services/change-password-trading-account.service";

const _ChangePasswordTradingAccountPopup: React.FC<Props> = ({
  open,
  twoFactorEnabled,
  assetName,
  id,
  service,
  onClose
}) => {
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const handleApply = useCallback(
    (
      values: IChangePasswordTradingAccountFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      const model = {
        password: values.password,
        twoFactorCode: values.twoFactorCode
      };
      service
        .changePasswordTradingAccount(id, model)
        .then(handleClose)
        .catch(setErrorMessage)
        .finally(() => {
          setSubmitting(false);
        });
    },
    [id]
  );
  const handleClose = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, []);
  return (
    <Dialog open={open} onClose={handleClose}>
      <ChangePasswordTradingAccountForm
        assetName={assetName}
        twoFactorEnabled={twoFactorEnabled}
        errorMessage={errorMessage}
        onSubmit={handleApply}
      />
    </Dialog>
  );
};

const mapStateToProps = (state: ManagerRootState): StateProps => ({
  twoFactorEnabled: twoFactorEnabledSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      changePasswordTradingAccount
    },
    dispatch
  )
});

interface OwnProps extends IDialogProps {
  id: string;
  assetName: string;
}

interface StateProps {
  twoFactorEnabled: boolean;
}

interface DispatchProps {
  service: {
    changePasswordTradingAccount(
      id: string,
      model?: ProgramPwdUpdate
    ): Promise<void>;
  };
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const ChangePasswordTradingAccountPopup = compose<
  React.ComponentType<OwnProps>
>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ChangePasswordTradingAccountPopup);
export default ChangePasswordTradingAccountPopup;
