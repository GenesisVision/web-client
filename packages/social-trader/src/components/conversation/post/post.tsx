import { Center } from "components/center/center";
import { CommentInputContainer } from "components/conversation/comment/comment-input/comment-input-container";
import { ConversationPinButton } from "components/conversation/conversation-pin-button/conversation-pin-button";
import { ConversationRemoveButton } from "components/conversation/conversation-remove-button/conversation-remove-button";
import { restorePost } from "components/conversation/conversation.service";
import { ConversationPost } from "components/conversation/conversation.types";
import { Message } from "components/conversation/message/message";
import { CommentsList } from "components/conversation/post/comments-list/comments-list";
import { PostButtons } from "components/conversation/post/post-buttons/post-buttons";
import { DefaultBlock } from "components/default.block/default.block";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
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
        <MutedText big>{t("Post is deleted")}</MutedText>&nbsp;
        <GVButton
          size={GV_BTN_SIZE.BIG}
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

const _Post: React.FC<Props> = ({ reduceLargeText, updateData, post }) => {
  const {
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
              actions?.canDelete || actions?.canPin ? (
                <RowItem>
                  <Center>
                    {actions?.canPin && (
                      <RowItem>
                        <ConversationPinButton
                          id={id}
                          value={isPinned}
                          onSuccess={updateData}
                        />
                      </RowItem>
                    )}
                    {actions?.canDelete && (
                      <RowItem>
                        <ConversationRemoveButton
                          id={id}
                          onSuccess={setDeleted}
                        />
                      </RowItem>
                    )}
                  </Center>
                </RowItem>
              ) : (
                undefined
              )
            }
            row={false}
            tags={tags}
            postId={id}
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
        <Row large>
          <CommentsList comments={comments} updateData={updateData} />
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
  reduceLargeText?: boolean;
  updateData: VoidFunction;
  post: ConversationPost;
}

export const Post = React.memo(_Post);
