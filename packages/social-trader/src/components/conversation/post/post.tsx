import { Center } from "components/center/center";
import { CommentInputContainer } from "components/conversation/comment/comment-input/comment-input-container";
import { restorePost } from "components/conversation/conversation.service";
import { ConversationPost } from "components/conversation/conversation.types";
import { Message } from "components/conversation/message/message";
import { MessageActions } from "components/conversation/message/message-actions/message-actions";
import { CommentsList } from "components/conversation/post/comments-list/comments-list";
import { PostButtons } from "components/conversation/post/post-buttons/post-buttons";
import { DefaultBlock } from "components/default.block/default.block";
import GVButton from "components/gv-button";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const DeletedPost: React.FC<{
  id: string;
  setNotDeleted: VoidFunction;
}> = ({ id, setNotDeleted }) => {
  const [t] = useTranslation();
  const { sendRequest } = useApiRequest({ request: () => restorePost({ id }) });
  const handleUndo = useCallback(() => {
    setNotDeleted();
    sendRequest();
  }, []);
  return (
    <DefaultBlock solid wide>
      <Center>
        <Text muted size={"large"}>
          {t("Post is deleted")}
        </Text>
        &nbsp;
        <GVButton
          size={"xlarge"}
          variant={"text"}
          noPadding
          onClick={handleUndo}
        >
          {t("Undo")}
        </GVButton>
      </Center>
    </DefaultBlock>
  );
};

const _Post: React.FC<Props> = ({
  visibleCommentsCount,
  reduceLargeText,
  updateData,
  post
}) => {
  const {
    url,
    rePostsCount,
    isPinned,
    images,
    date,
    text,
    id,
    comments,
    actions,
    likesCount,
    author,
    tags
  } = post;
  const [isDeleted, setDeleted, setNotDeleted] = useIsOpen();
  if (isDeleted) return <DeletedPost id={id} setNotDeleted={setNotDeleted} />;
  return (
    <DefaultBlock solid wide>
      <Row center={false}>
        <RowItem wide>
          <Message
            reduceLargeText={reduceLargeText}
            settingsBlock={
              <MessageActions
                actions={actions}
                id={id}
                isPinned={isPinned}
                onApply={updateData}
                setDeleted={setDeleted}
              />
            }
            row={false}
            tags={tags}
            url={url}
            images={images}
            date={date}
            text={text}
            author={author}
          />
        </RowItem>
      </Row>
      <PostButtons
        post={post}
        rePostsCount={rePostsCount}
        onApply={updateData}
        id={id}
        liked={actions?.isLiked}
        likesCount={likesCount}
        canLike={!!actions}
      />
      {!!comments.length && (
        <Row size={"large"}>
          <CommentsList
            visibleCommentsCount={visibleCommentsCount}
            comments={comments}
            updateData={updateData}
          />
        </Row>
      )}
      {actions && actions.canComment && (
        <Row>
          <CommentInputContainer onSuccess={updateData} id={id} />
        </Row>
      )}
    </DefaultBlock>
  );
};

interface Props {
  visibleCommentsCount?: number;
  reduceLargeText?: boolean;
  updateData: VoidFunction;
  post: ConversationPost;
}

export const Post = React.memo(_Post);
