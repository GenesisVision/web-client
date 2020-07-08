import { ConversationPinButton } from "components/conversation/conversation-pin-button/conversation-pin-button";
import { ConversationRemoveButton } from "components/conversation/conversation-remove-button/conversation-remove-button";
import { PostEditButton } from "components/conversation/post/post-edit/post-edit.button";
import { ActionsCircleIcon } from "components/icon/actions-circle-icon";
import { TableCardActions } from "components/table/components/table-card/table-card-actions";
import { PostPersonalDetails } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import React from "react";

import styles from "./message-actions.module.scss";

interface Props {
  setPinned: (value: boolean) => void;
  setDeleted: VoidFunction;
  isPinned?: boolean;
  id: string;
  onApply: VoidFunction;
  actions?: PostPersonalDetails;
}

const hasActions = (actions: PostPersonalDetails) =>
  !!Object.entries(actions)
    .filter(([name]) => name !== "canComment")
    .filter(([name]) => name !== "isLiked")
    .filter(([name, value]) => value).length;

const _MessageActions: React.FC<Props> = ({
  setPinned,
  setDeleted,
  isPinned,
  id,
  onApply,
  actions
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();

  return (
    <div className={styles["message-actions__container"]}>
      <div className={styles["message-actions"]}>
        <div className={styles["message-actions__icon"]}>
          <ActionsCircleIcon primary={!!anchor} onClick={setAnchor} />
        </div>
        <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
          {actions?.canEdit && (
            <PostEditButton
              clearAnchor={clearAnchor}
              id={id}
              onApply={onApply}
            />
          )}
          {actions?.canPin && (
            <ConversationPinButton
              setPinned={setPinned}
              id={id}
              value={!!isPinned}
              onSuccess={onApply}
            />
          )}
          {actions?.canDelete && (
            <ConversationRemoveButton id={id} onSuccess={setDeleted} />
          )}
        </TableCardActions>
      </div>
    </div>
  );
};

export const MessageActions = React.memo(_MessageActions);
