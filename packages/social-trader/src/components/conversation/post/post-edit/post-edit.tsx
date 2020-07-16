import {
  IEditPostData,
  OnMessageSendFunc
} from "components/conversation/conversation.types";
import { PostInput } from "components/conversation/post/post-input/post-input";
import { IImageValue } from "components/form/input-image/input-image";
import { NewPostImage } from "gv-api-web";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  data: IEditPostData;
  errorMessage?: string;
  handleSubmit: OnMessageSendFunc;
  status: API_REQUEST_STATUS;
}

const _PostEdit: React.FC<Props> = ({
  data,
  errorMessage,
  handleSubmit,
  status
}) => {
  const [t] = useTranslation();
  return (
    <PostInput
      submitLabel={t("Save")}
      text={data.text}
      images={(data.images as unknown) as Array<IImageValue & NewPostImage>}
      allowEmptyMessage
      placeholder={t("conversation:your-message")}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      status={status}
    />
  );
};

export const PostEdit = React.memo(_PostEdit);
