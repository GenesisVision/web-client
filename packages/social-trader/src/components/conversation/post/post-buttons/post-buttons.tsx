import "./post-buttons.scss";

import { LikeButton } from "components/conversation/post/post-buttons/like-button";
import { ShareButton } from "components/conversation/post/post-buttons/share-button";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _PostButtons: React.FC<Props> = ({ canLike }) => {
  return (
    <Row large>
      <RowItem>
        <ShareButton />
      </RowItem>
      {canLike && (
        <RowItem>
          <LikeButton />
        </RowItem>
      )}
    </Row>
  );
};

interface Props {
  canLike?: boolean;
}

export const PostButtons = React.memo(_PostButtons);
