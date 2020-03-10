import "./comment-input.scss";

import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _CommentInput: React.FC<Props> = ({}) => {
  return (
    <Row className="comment-input__container">
      <RowItem className="comment-input__input-row-item">
        <input className="comment-input__input" type="text" />
      </RowItem>
      <MutedText>Enter to send</MutedText>
    </Row>
  );
};

interface Props {}

export const CommentInput = React.memo(_CommentInput);
