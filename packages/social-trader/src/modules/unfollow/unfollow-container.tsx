import Dialog, { IDialogProps } from "components/dialog/dialog";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import UnfollowForm, {
  IProgramUnfollowFormValues
} from "./components/unfollow-form";
import { detachToSignal } from "./services/unfollow.service";

const _UnfollowContainer: React.FC<Props> = ({
  open,
  onClose,
  onApply,
  id
}) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => onClose(), [onClose]);
  const handleSubmit = useCallback(
    (value: IProgramUnfollowFormValues) => {
      const model = { mode: value.mode, tradingAccountId: id };
      dispatch(detachToSignal(id, onApply, model));
      handleClose();
    },
    [dispatch, handleClose, id, onApply]
  );
  return (
    <Dialog open={open} onClose={handleClose}>
      <UnfollowForm onSubmit={handleSubmit} />
    </Dialog>
  );
};

const UnfollowContainer = React.memo(_UnfollowContainer);
export default UnfollowContainer;

interface Props extends IDialogProps {
  id: string;
  onApply: () => void;
}
