import { sendShareEvent } from "components/conversation/conversation.ga";
import { rePost } from "components/conversation/conversation.service";
import { PostInput } from "components/conversation/post/post-input/post-input";
import styles from "components/conversation/repost/repost.module.scss";
import { RepostTagComponent } from "components/conversation/tag/tag-components";
import { DefaultBlock } from "components/default.block/default.block";
import { DialogTop } from "components/dialog/dialog-top";
import { Row } from "components/row/row";
import { Post as PostType } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";

export interface IRePostContainerProps {
  post: PostType;
  onApply?: VoidFunction;
  id: string;
}

const _RePostContainer: React.FC<IRePostContainerProps> = ({
  post,
  onApply,
  id
}) => {
  const [t] = useTranslation();
  const onApplyMiddleware = postponeCallback(onApply);
  const { sendRequest, errorMessage, status } = useApiRequest({
    request: rePost,
    middleware: [sendShareEvent, onApplyMiddleware]
  });
  const handleSubmit = useCallback(values => {
    return sendRequest({ ...values, id });
  }, []);

  return (
    <>
      <DialogTop title={t("conversation:repost")} />
      <DefaultBlock
        roundedBorder={false}
        solid
        horizontalOffsets={false}
        verticalOffsets={false}
      >
        <DefaultBlock
          className={styles["repost__message"]}
          size={"large"}
          roundedBorder={false}
        >
          <RepostTagComponent post={post} />
        </DefaultBlock>
        <Row>
          <PostInput
            allowEmptyMessage
            placeholder={t("conversation:your-message")}
            errorMessage={errorMessage}
            onSubmit={handleSubmit}
            status={status}
          />
        </Row>
      </DefaultBlock>
    </>
  );
};

const RePostContainer = React.memo(_RePostContainer);
export default RePostContainer;
