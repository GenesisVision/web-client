import { togglePin } from "components/conversation/conversation.service";
import GVButton from "components/gv-button";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

const _ConversationPinButton: React.FC<Props> = ({ id, value, onSuccess }) => {
  const updateMiddleware = () => onSuccess();
  const { sendRequest, isPending } = useApiRequest({
    request: () => togglePin({ id, value }),
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
      {value ? "unpin" : "pin"}
    </GVButton>
  );
};

interface Props {
  id: string;
  value: boolean;
  onSuccess: VoidFunction;
}

export const ConversationPinButton = React.memo(_ConversationPinButton);
