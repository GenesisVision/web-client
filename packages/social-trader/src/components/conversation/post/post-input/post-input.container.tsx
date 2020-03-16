import { sendPost } from "components/conversation/conversation.service";
import { PostInput } from "components/conversation/post/post-input/post-input";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

export const PostInputContainer: React.FC<Props> = ({ onSuccess }) => {
  const successMiddleware = () => onSuccess();
  const { sendRequest, status } = useApiRequest({
    middleware: [successMiddleware],
    successMessage: "Success",
    request: sendPost
  });
  return <PostInput onSubmit={sendRequest} status={status} />;
};

interface Props {
  onSuccess: VoidFunction;
}
