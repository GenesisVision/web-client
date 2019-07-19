import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { closeProgram } from "shared/components/programs/program-details/services/program-details.service";
import { twoFactorEnabledSelector } from "shared/reducers/2fa-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import CloseProgramForm, {
  ICloseProgramFormValues
} from "./close-program-form";

const _ConfirmCloseProgramContainer: React.FC<Props> = ({
  open,
  twoFactorEnabled,
  onClose,
  service,
  onApply,
  id
}) => {
  const handleSubmit = useCallback(
    (
      { twoFactorCode }: ICloseProgramFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      const applyFn = () => {
        onApply();
        onClose();
      };
      const errorFn = () => {
        setSubmitting(false);
      };
      service.closeProgram(applyFn, errorFn, id, {
        twoFactorCode
      });
    },
    [id]
  );
  return (
    <Dialog open={open} onClose={onClose} className="dialog--wider">
      <CloseProgramForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        twoFactorEnabled={twoFactorEnabled}
      />
    </Dialog>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  twoFactorEnabled: twoFactorEnabledSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      closeProgram
    },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, StateProps {}

interface OwnProps {
  open: boolean;
  onClose(): void;
  onApply(): void;
  id: string;
}

interface StateProps {
  twoFactorEnabled: boolean;
}

interface DispatchProps {
  service: {
    closeProgram(
      onSuccess: () => void,
      onError: () => void,
      programId: string,
      opts?: {
        twoFactorCode?: string | undefined;
      }
    ): void;
  };
}

const ConfirmCloseProgramContainer = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ConfirmCloseProgramContainer);
export default ConfirmCloseProgramContainer;
