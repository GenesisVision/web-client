import { CommentInput } from "components/conversation/comment/comment-input/comment-input";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

const _CommentInputContainer: React.FC<Props> = ({}) => {
  const { sendRequest, isPending } = useApiRequest({
    request: () => {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 1000)
      );
    }
  });
  return <CommentInput onSend={sendRequest} disable={isPending} />;
};

interface Props {}

export const CommentInputContainer = React.memo(_CommentInputContainer);
