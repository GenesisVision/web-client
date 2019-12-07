import Dialog, { IDialogProps } from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";

import UnfollowForm, {
  IProgramUnfollowFormValues
} from "./components/unfollow-form";
import {
  detachToSignalExternal,
  detachToSignalInternal
} from "./services/unfollow.service";

const _UnfollowContainer: React.FC<Props> = ({
  tradingAccountId,
  isExternal,
  open,
  onClose,
  onApply,
  id
}) => {
  const { sendRequest } = useApiRequest({
    request: getDetachMethod(isExternal),
    successMessage: "unfollow-program.success-alert-message",
    middleware: [onClose, onApply]
  });
  const handleSubmit = useCallback(
    ({ mode }: IProgramUnfollowFormValues) => {
      sendRequest({ id, model: { mode, tradingAccountId } });
    },
    [id, tradingAccountId]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <UnfollowForm onSubmit={handleSubmit} />
    </Dialog>
  );
};

const getDetachMethod = (isExternal: boolean) =>
  isExternal ? detachToSignalExternal : detachToSignalInternal;

interface Props extends IDialogProps {
  tradingAccountId: string;
  isExternal: boolean;
  id: string;
  onApply: () => void;
}

const UnfollowContainer = React.memo(_UnfollowContainer);
export default UnfollowContainer;
