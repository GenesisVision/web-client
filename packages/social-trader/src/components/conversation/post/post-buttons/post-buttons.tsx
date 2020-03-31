import { LikeContainer } from "components/conversation/like/like-container";
import { Share } from "components/conversation/share/share";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

import "./post-buttons.scss";

const _PostButtons: React.FC<Props> = ({
  repostCount,
  onApply,
  id,
  canLike,
  likesCount,
  liked
}) => {
  return (
    <Row large>
      <RowItem>
        <Share onApply={onApply} id={id} count={repostCount} />
      </RowItem>
      <RowItem>
        <LikeContainer
          id={id}
          canLike={canLike}
          count={likesCount}
          liked={liked}
        />
      </RowItem>
    </Row>
  );
};

interface Props {
  repostCount: number;
  onApply: VoidFunction;
  id: string;
  liked?: boolean;
  likesCount: number;
  canLike?: boolean;
}

export const PostButtons = React.memo(_PostButtons);
