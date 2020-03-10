import "./comment.scss";

import { ConversationMessage } from "components/conversation/conversation.types";
import { Message } from "components/conversation/message/message";
import React from "react";

const _Comment: React.FC<Props> = ({ comment }) => {
  return (
    <div className="comment">
      <Message message={comment} showLike />
    </div>
  );
};

interface Props {
  comment: ConversationMessage;
}

export const Comment = React.memo(_Comment);
