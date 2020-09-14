import { Button } from "components/button/button";
import { Center } from "components/center/center";
import { CommentInputContainer } from "components/conversation/comment/comment-input/comment-input-container";
import { restorePost } from "components/conversation/conversation.service";
import { ConversationPost } from "components/conversation/conversation.types";
import { PinIcon } from "components/conversation/icons/pin.icon";
import { Message } from "components/conversation/message/message";
import { MessageActions } from "components/conversation/message/message-actions/message-actions";
import { CommentsList } from "components/conversation/post/comments-list/comments-list";
import { PostButtons } from "components/conversation/post/post-buttons/post-buttons";
import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  visibleCommentsCount?: number;
  reduceLargeText?: boolean;
  updateData: VoidFunction;
  post: ConversationPost;
}

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
        <Button size={"xlarge"} variant={"text"} noPadding onClick={handleUndo}>
          {t("Undo")}
        </Button>
      </Center>
    </DefaultBlock>
  );
};

const PinIconContainer = styled(RowItem)`
  width: 15px;
  height: 15px;
`;

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
    personalDetails,
    likesCount,
    author,
    tags
  } = post;
  const [isDeleted, setDeleted, setNotDeleted] = useIsOpen();
  const [isPinnedInner, setPinnedInner] = useState(isPinned);
  if (isDeleted) return <DeletedPost id={id} setNotDeleted={setNotDeleted} />;
  return (
    <DefaultBlock solid wide>
      <Row center={false}>
        <RowItem wide>
          <Message
            reduceLargeText={reduceLargeText}
            settingsBlock={
              <Row>
                {isPinnedInner && (
                  <PinIconContainer>
                    <PinIcon />
                  </PinIconContainer>
                )}
                <RowItem>
                  <MessageActions
                    url={url}
                    actions={personalDetails}
                    id={id}
                    isPinned={isPinnedInner}
                    onApply={updateData}
                    setDeleted={setDeleted}
                    setPinned={setPinnedInner}
                  />
                </RowItem>
              </Row>
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
        liked={personalDetails?.isLiked}
        likesCount={likesCount}
        canLike={!!personalDetails}
      />
      {!!comments.length && (
        <Row size={"large"}>
          <CommentsList
            canReply={personalDetails?.canComment}
            visibleCommentsCount={visibleCommentsCount}
            comments={comments}
            updateData={updateData}
          />
        </Row>
      )}
      {personalDetails && personalDetails.canComment && (
        <Row>
          <CommentInputContainer onSuccess={updateData} id={id} />
        </Row>
      )}
    </DefaultBlock>
  );
};

export const Post = React.memo(_Post);
