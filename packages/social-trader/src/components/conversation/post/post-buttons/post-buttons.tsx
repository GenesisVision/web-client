import "./post-buttons.scss";

import { LikeContainer } from "components/conversation/like/like-container";
import { ShareButton } from "components/conversation/post/post-buttons/share-button";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _PostButtons: React.FC<Props> = ({ canLike, likesCount, liked }) => {
  return (
    <Row large>
      <RowItem>
        <ShareButton />
      </RowItem>
      <RowItem>
        <LikeContainer canLike={canLike} count={likesCount} liked={liked} />
      </RowItem>
    </Row>
  );
};

interface Props {
  liked?: boolean;
  likesCount: number;
  canLike?: boolean;
}

export const PostButtons = React.memo(_PostButtons);
