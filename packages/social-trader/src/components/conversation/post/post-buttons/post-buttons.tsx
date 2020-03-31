import { LikeContainer } from "components/conversation/like/like-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

import "./post-buttons.scss";

const _PostButtons: React.FC<Props> = ({ id, canLike, likesCount, liked }) => {
  return (
    <Row large>
      {/*<RowItem>
          <ShareContainer id={id} />
      </RowItem>*/}
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
  id: string;
  liked?: boolean;
  likesCount: number;
  canLike?: boolean;
}

export const PostButtons = React.memo(_PostButtons);
