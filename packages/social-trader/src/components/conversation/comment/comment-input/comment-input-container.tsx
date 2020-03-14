import { CommentInput } from "components/conversation/comment/comment-input/comment-input";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

const _CommentInputContainer: React.FC<Props> = ({}) => {
  const { sendRequest } = useApiRequest({
    request: values => {
      return new Promise(resolve =>
        setTimeout(() => {
          console.log(values);
          resolve();
        }, 1000)
      );
    }
  });
  return <CommentInput onSubmit={sendRequest} />;
};

interface Props {}

export const CommentInputContainer = React.memo(_CommentInputContainer);
