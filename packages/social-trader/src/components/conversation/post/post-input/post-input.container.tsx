import { sendPostEvent } from "components/conversation/conversation.ga";
import { sendPost } from "components/conversation/conversation.service";
import { PostInput } from "components/conversation/post/post-input/post-input";
import useApiRequest from "hooks/api-request.hook";
import React from "react";
import { postponeCallback } from "utils/hook-form.helpers";

interface Props {
  placeholder?: string;
  userId?: string;
  onSuccess: VoidFunction;
}

export const PostInputContainer: React.FC<Props> = ({
  placeholder,
  userId,
  onSuccess
}) => {
  const successMiddleware = postponeCallback(onSuccess);
  const { sendRequest, status, errorMessage } = useApiRequest({
    middleware: [sendPostEvent, successMiddleware],
    request: values => sendPost({ ...values, userId })
  });
  return (
    <PostInput
      placeholder={placeholder}
      errorMessage={errorMessage}
      onSubmit={sendRequest}
      status={status}
    />
  );
};
