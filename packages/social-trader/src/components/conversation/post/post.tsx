import "./post.scss";

import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Comment } from "components/conversation/comment/comment";
import { CommentInputContainer } from "components/conversation/comment/comment-input/comment-input-container";
import { ConversationPost } from "components/conversation/conversation.types";
import { Message } from "components/conversation/message/message";
import { PostButtons } from "components/conversation/post/post-buttons/post-buttons";
import { PostDetail } from "components/conversation/post/post-detail/post-detail";
import DetailsBlock from "components/details/details-block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _Post: React.FC<Props> = ({ post }) => {
  const {
    id,
    comments,
    personalDetails,
    details,
    avatar,
    name,
    likesCount
  } = post;
  return (
    <DetailsBlock horizontalPaddings wide>
      {details ? (
        <Row>
          <RowItem>
            <ProfileAvatar url={avatar} alt={name} />
          </RowItem>
          {details.map(detail => (
            <RowItem key={String(id + detail.title)} large>
              <PostDetail detail={detail} />
            </RowItem>
          ))}
        </Row>
      ) : (
        <Message message={post} />
      )}
      <PostButtons
        id={id}
        liked={personalDetails?.canLike}
        likesCount={likesCount}
        canLike={personalDetails?.canLike}
      />
      {!!comments.length && (
        <Row large>
          <div className="post__comments">
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </Row>
      )}
      {personalDetails && personalDetails.canComment && (
        <Row>
          <CommentInputContainer id={id} />
        </Row>
      )}
    </DetailsBlock>
  );
};

interface Props {
  post: ConversationPost;
}

export const Post = React.memo(_Post);
