import { CommentInput } from "components/conversation/comment/comment-input/comment-input";
import { sendCommentEvent } from "components/conversation/conversation.ga";
import { sendComment } from "components/conversation/conversation.service";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

interface Props {
  onSuccess: VoidFunction;
  id: string;
}

const _CommentInputContainer: React.FC<Props> = ({ onSuccess, id }) => {
  const successMiddleware = () => onSuccess();
  const { sendRequest, status, errorMessage } = useApiRequest({
    middleware: [sendCommentEvent, successMiddleware],
    request: values => sendComment({ ...values, postId: id })
  });
  return (
    <CommentInput
      onSubmit={sendRequest}
      status={status}
      errorMessage={errorMessage}
    />
  );
};

export const CommentInputContainer = React.memo(_CommentInputContainer);
