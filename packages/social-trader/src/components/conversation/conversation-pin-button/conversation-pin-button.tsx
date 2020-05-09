import { Center } from "components/center/center";
import { togglePin } from "components/conversation/conversation.service";
import { PinIcon } from "components/conversation/icons/pin.icon";
import { UnpinIcon } from "components/conversation/icons/unpin.icon";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { postponeFunc } from "utils/hook-form.helpers";

import "./conversation-pin-button.scss";

const _ConversationPinButton: React.FC<Props> = ({ id, value, onSuccess }) => {
  const [t] = useTranslation();
  const [innerPinned, setInnerPinned] = useState<boolean>(!!value);
  const [isChanged, setChanged, setNotChanged] = useIsOpen();
  const setChangedMiddleware = () => {
    setChanged();
    postponeFunc(setNotChanged);
  };
  const { sendRequest } = useApiRequest({
    request: () => {
      setInnerPinned(!innerPinned);
      return togglePin({ id, value });
    },
    middleware: [onSuccess, setChangedMiddleware]
  });
  return (
    <Center>
      {false && (
        <RowItem>
          <Center>
            <MutedText small>
              {innerPinned ? t("pinned") : t("unpinned")}
            </MutedText>
          </Center>
        </RowItem>
      )}
      <RowItem>
        <Center>
          <div className="conversation-pin-button" onClick={sendRequest}>
            {innerPinned ? <UnpinIcon /> : <PinIcon />}
          </div>
        </Center>
      </RowItem>
    </Center>
  );
};

interface Props {
  id: string;
  value: boolean;
  onSuccess: VoidFunction;
}

export const ConversationPinButton = React.memo(_ConversationPinButton);
