import { sendPost } from "components/conversation/conversation.service";
import { PostInput } from "components/conversation/post/post-input/post-input";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

export const PostInputContainer: React.FC = () => {
  const { sendRequest, status } = useApiRequest({
    successMessage: "Success",
    request: sendPost
  });
  return <PostInput onSubmit={sendRequest} status={status} />;
};
