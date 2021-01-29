import { sendEditEvent } from "components/conversation/conversation.ga";
import { editPost, getPostForEdit } from "components/conversation/conversation.service";
import { PostEdit } from "components/conversation/post/post-edit/post-edit";
import { DefaultBlock } from "components/default.block/default.block";
import { DialogTop } from "components/dialog/dialog-top";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";
import { postponeCallback } from "utils/hook-form.helpers";

import styles from "./post-edit.module.scss";
import { IEditPostData } from "components/conversation/conversation.types";

export interface IPostEditContainerProps {
  onApply?: VoidFunction;
  id: string;
}

const _PostEditContainer: React.FC<IPostEditContainerProps> = ({
  onApply,
  id
}) => {
  const [t] = useTranslation();

  const userId = useSelector(idSelector);

  const onApplyMiddleware = postponeCallback(onApply);

  const {
    sendRequest: submitEditPost,
    errorMessage,
    status
  } = useApiRequest<void>({
    request: editPost,
    middleware: [sendEditEvent, onApplyMiddleware]
  });
  const { data } = useApiRequest<IEditPostData>({
    request: getPostForEdit,
    fetchOnMount: true,
    fetchOnMountData: { id }
  });

  const handleSubmit = useCallback(
    values => {
      return submitEditPost({
        ...values,
        id
      });
    },
    [id, userId]
  );

  return (
    <>
      <DialogTop title={t("conversation:edit")} />
      <DefaultBlock
        className={styles["post-edit__message"]}
        roundedBorder={false}
        solid
        horizontalOffsets={false}
        verticalOffsets={false}
      >
        {!!data && (
          <PostEdit
            data={data!}
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            status={status}
          />
        )}
      </DefaultBlock>
    </>
  );
};

const PostEditContainer = React.memo(_PostEditContainer);
export default PostEditContainer;
