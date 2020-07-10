import { getConversationDate } from "components/conversation/conversation.helpers";
import { Text } from "components/text/text";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import React from "react";
import { diffDateRaw, formatDate } from "utils/dates";

export interface IConversationUserDateProps {
  date: string | Date;
}

export const ConversationUserDate: React.FC<IConversationUserDateProps> = ({
  date
}) => {
  const showTooltip = diffDateRaw(date, new Date(), "day") < 1;
  const renderDate = () => <Text muted>{getConversationDate(date)}</Text>;
  return showTooltip ? (
    <Tooltip
      render={() => (
        <TooltipContent>
          <Text muted>{formatDate(date)}</Text>
        </TooltipContent>
      )}
    >
      <div>{renderDate()}</div>
    </Tooltip>
  ) : (
    renderDate()
  );
};
