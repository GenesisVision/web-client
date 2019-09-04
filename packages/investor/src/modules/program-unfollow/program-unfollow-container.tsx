import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";

import ProgramUnfollowForm, {
  IProgramUnfollowFormValues
} from "./components/program-unfollow-form";
import { detachToSignal } from "./services/program-unfollow.service";

const _ProgramUnfollowContainer: React.FC<Props> = ({
  open,
  onClose,
  onApply,
  id
}) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => onClose(), [onClose]);
  const handleSubmit = useCallback(
    (value: IProgramUnfollowFormValues) => {
      const model = { mode: value.mode };
      dispatch(detachToSignal(id, onApply, model));
      handleClose();
    },
    [id, onApply]
  );
  return (
    <Dialog open={open} onClose={handleClose}>
      <ProgramUnfollowForm onSubmit={handleSubmit} />
    </Dialog>
  );
};

const ProgramUnfollowContainer = React.memo(_ProgramUnfollowContainer);
export default ProgramUnfollowContainer;

interface Props extends IDialogProps {
  id: string;
  onApply(): void;
}
