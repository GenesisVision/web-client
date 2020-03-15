import "./comment.scss";

import { ConversationComment } from "components/conversation/conversation.types";
import { Message } from "components/conversation/message/message";
import React from "react";

const _Comment: React.FC<Props> = ({ comment }) => {
  return (
    <div className="comment">
      <Message id={comment.id} message={comment.message} showLike />
    </div>
  );
};

interface Props {
  comment: ConversationComment;
}

export const Comment = React.memo(_Comment);
