import "./post-input.scss";

import classNames from "classnames";
import ConversationInput from "components/conversation/conversation-input/conversation-input";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _PostInput: React.FC<Props> = ({ onSubmit, disable }) => {
  return (
    <Row className="post-input__input-container">
      <RowItem className="post-input__input-row-item">
        <ConversationInput />
      </RowItem>
      <RowItem className="post-input__button-row-item">
        <div
          onClick={onSubmit}
          className={classNames("post-input__button", {
            "post-input__button--disable": disable
          })}
        >
          >
        </div>
      </RowItem>
    </Row>
  );
};

interface Props {
  disable?: boolean;
  onSubmit: () => void;
}

export const PostInput = React.memo(_PostInput);
