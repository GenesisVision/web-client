import { remove } from "components/conversation/conversation.service";
import GVButton from "components/gv-button";
import { CloseIcon } from "components/icon/close-icon";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

const _ConversationRemoveButton: React.FC<Props> = ({ id, onSuccess }) => {
  const updateMiddleware = () => onSuccess();
  const { sendRequest, isPending } = useApiRequest({
    request: () => remove({ id }),
    middleware: [updateMiddleware]
  });
  return (
    <GVButton
      onClick={sendRequest}
      noPadding
      variant="text"
      color="secondary"
      disabled={isPending}
    >
      <CloseIcon />
    </GVButton>
  );
};

interface Props {
  id: string;
  onSuccess: VoidFunction;
}

export const ConversationRemoveButton = React.memo(_ConversationRemoveButton);
