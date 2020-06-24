import { remove } from "components/conversation/conversation.service";
import { RemoveIcon } from "components/conversation/icons/remove.icon";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

import styles from "../conversation-pin-button/conversation-pin-button.module.scss";

const _ConversationRemoveButton: React.FC<Props> = ({ id, onSuccess }) => {
  const updateMiddleware = () => onSuccess();
  const { sendRequest, isPending } = useApiRequest({
    request: () => remove({ id }),
    middleware: [updateMiddleware]
  });
  return (
    <div className={styles["conversation-pin-button"]} onClick={sendRequest}>
      <RemoveIcon disabled={isPending} />
    </div>
  );
};

interface Props {
  id: string;
  onSuccess: VoidFunction;
}

export const ConversationRemoveButton = React.memo(_ConversationRemoveButton);
