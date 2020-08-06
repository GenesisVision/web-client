import { Center } from "components/center/center";
import { togglePin } from "components/conversation/conversation.service";
import { RowItem } from "components/row-item/row-item";
import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { postponeFunc } from "utils/hook-form.helpers";

interface Props {
  setPinned: (value: boolean) => void;
  id: string;
  value: boolean;
  onSuccess: VoidFunction;
}

const _ConversationPinButton: React.FC<Props> = ({
  setPinned,
  id,
  value,
  onSuccess
}) => {
  const [t] = useTranslation();
  const [innerPinned, setInnerPinned] = useState<boolean>(!!value);
  const [isChanged, setChanged, setNotChanged] = useIsOpen();
  const setChangedMiddleware = () => {
    setChanged();
    postponeFunc(setNotChanged);
  };
  const { sendRequest } = useApiRequest({
    request: () => {
      setPinned(!innerPinned);
      setInnerPinned(!innerPinned);
      return togglePin({ id, value });
    },
    middleware: [onSuccess, setChangedMiddleware]
  });

  useEffect(() => {
    setInnerPinned(!!value);
  }, [value]);

  return (
    <Center>
      {false && (
        <RowItem>
          <Center>
            <Text muted size={"small"}>
              {innerPinned ? t("pinned") : t("unpinned")}
            </Text>
          </Center>
        </RowItem>
      )}
      <RowItem>
        <Center>
          <TableCardActionsItem onClick={sendRequest}>
            {innerPinned ? t("Unpin") : t("Pin")}
          </TableCardActionsItem>
        </Center>
      </RowItem>
    </Center>
  );
};

export const ConversationPinButton = React.memo(_ConversationPinButton);
