import { remove } from "components/conversation/conversation.service";
import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import useApiRequest from "hooks/api-request.hook";
import React from "react";
import { useTranslation } from "react-i18next";

const _ConversationRemoveButton: React.FC<Props> = ({ id, onSuccess }) => {
  const [t] = useTranslation();
  const updateMiddleware = () => onSuccess();
  const { sendRequest, isPending } = useApiRequest({
    request: () => remove({ id }),
    middleware: [updateMiddleware]
  });
  return (
    <TableCardActionsItem disabled={isPending} onClick={sendRequest}>
      {t("Delete")}
    </TableCardActionsItem>
  );
};

interface Props {
  id: string;
  onSuccess: VoidFunction;
}

export const ConversationRemoveButton = React.memo(_ConversationRemoveButton);
