import { TwoFactorStatus } from "gv-api-web";
import React, { useCallback } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { closeFund } from "shared/components/funds/fund-details/services/fund-details.service";
import useErrorMessage from "shared/hooks/error-message.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { twoFactorSelector } from "shared/reducers/2fa-reducer";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import CloseFundForm, { ICloseFundFormValues } from "./close-fund-form";

const _CloseFundContainer: React.FC<Props> = ({
  open,
  twoFactorAuth,
  onClose,
  service,
  onApply,
  id
}) => {
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const handleClose = useCallback(
    () => {
      cleanErrorMessage();
      onClose();
    },
    [onClose]
  );
  const handleSubmit = useCallback(
    (data: ICloseFundFormValues, setSubmitting: SetSubmittingType) => {
      closeFund(id, data)
        .then(() => {
          handleClose();
          service.alertSuccess();
          onApply();
        })
        .catch(error => {
          setErrorMessage(error);
          setSubmitting(false);
        });
    },
    [id]
  );
  return (
    <Dialog open={open} onClose={handleClose} className="dialog--wider">
      <CloseFundForm
        condition={!!twoFactorAuth}
        loader={<DialogLoader />}
        onSubmit={handleSubmit}
        onCancel={onClose}
        twoFactorEnabled={twoFactorAuth!.twoFactorEnabled}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

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

const CloseFundContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_CloseFundContainer);
export default CloseFundContainer;
