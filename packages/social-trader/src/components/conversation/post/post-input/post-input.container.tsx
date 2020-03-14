import { PostInput } from "components/conversation/post/post-input/post-input";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

export const PostInputContainer: React.FC = () => {
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
  return <PostInput onSubmit={sendRequest} />;
};
