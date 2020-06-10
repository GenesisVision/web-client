import { sendPostEvent } from "components/conversation/conversation.ga";
import { sendPost } from "components/conversation/conversation.service";
import { PostInput } from "components/conversation/post/post-input/post-input";
import useApiRequest from "hooks/api-request.hook";
import React from "react";
import { postponeCallback } from "utils/hook-form.helpers";

export const PostInputContainer: React.FC<Props> = ({ userId, onSuccess }) => {
  const successMiddleware = postponeCallback(onSuccess);
  const { sendRequest, status, errorMessage } = useApiRequest({
    middleware: [sendPostEvent, successMiddleware],
    successMessage: "Success",
    request: values => sendPost({ ...values, userId })
  });
  return (
    <PostInput
      errorMessage={errorMessage}
      onSubmit={sendRequest}
      status={status}
    />
  );
};

interface Props {
  userId?: string;
  onSuccess: VoidFunction;
}
