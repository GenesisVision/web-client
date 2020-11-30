import { LikeContainer } from "components/conversation/like/like-container";
import { Share } from "components/conversation/share/share";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Post as PostType } from "gv-api-web";
import React from "react";

interface Props {
  post: PostType;
  rePostsCount: number;
  onApply: VoidFunction;
  id: string;
  liked?: boolean;
  likesCount: number;
  canLike?: boolean;
}

const _PostButtons: React.FC<Props> = ({
  post,
  rePostsCount,
  onApply,
  id,
  canLike,
  likesCount,
  liked
}) => {
  return (
    <Row size={"large"}>
      <RowItem>
        <Share
          disable={!canLike}
          post={post}
          onApply={onApply}
          id={id}
          count={rePostsCount}
        />
      </RowItem>
      <RowItem>
        <LikeContainer
          likesUsers={post.likesUsers}
          id={id}
          canLike={canLike}
          count={likesCount}
          liked={liked}
        />
      </RowItem>
    </Row>
  );
};

export const PostButtons = React.memo(_PostButtons);
