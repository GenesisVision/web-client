import { PostInput } from "components/conversation/post/post-input/post-input";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

export const PostInputContainer: React.FC = () => {
  const { sendRequest, isPending } = useApiRequest({
    request: () => {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 1000)
      );
    }
  });
  return <PostInput onSubmit={sendRequest} disable={isPending} />;
};
