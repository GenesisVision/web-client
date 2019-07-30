import React, { useCallback } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";

import ProgramUnfollowForm, {
  IProgramUnfollowFormValues
} from "./components/program-unfollow-form";
import { detachToSignal } from "./services/program-unfollow.service";

const _ProgramUnfollowContainer: React.FC<Props> = ({
  open,
  onClose,
  service,
  onApply,
  id
}) => {
  const handleClose = useCallback(() => onClose(), [onClose]);
  const handleSubmit = useCallback(
    (value: IProgramUnfollowFormValues) => {
      const model = { mode: value.mode };
      service.detachToSignal(id, onApply, model);
      handleClose();
    },
    [service, id, onApply, handleClose]
  );
  return (
    <Dialog open={open} onClose={handleClose}>
      <ProgramUnfollowForm onSubmit={handleSubmit} />
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { detachToSignal },
    dispatch
  )
});

const ProgramUnfollowContainer = compose<React.ComponentType<OwnProps>>(
  connect<null, DispatchProps, OwnProps>(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramUnfollowContainer);
export default ProgramUnfollowContainer;

interface ServiceThunks extends ActionCreatorsMapObject {
  detachToSignal: typeof detachToSignal;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps extends IDialogProps {
  id: string;
  onApply(): void;
}

interface Props extends OwnProps, DispatchProps {}
