import "./comment-input.scss";

import classNames from "classnames";
import { Center } from "components/center/center";
import ConversationInput from "components/conversation/conversation-input/conversation-input";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _CommentInput: React.FC<Props> = ({ onSend, disable }) => {
  return (
    <Row className="comment-input__block" center={false}>
      <RowItem className="comment-input__input-container-row-item">
        <Row className="comment-input__input-container">
          <RowItem className="comment-input__input-row-item">
            <ConversationInput />
          </RowItem>
          <RowItem>
            <Center
              className={classNames("comment-input__send-text", {
                "comment-input__send-text--disable": disable
              })}
            >
              <MutedText>Enter to send</MutedText>
            </Center>
          </RowItem>
        </Row>
      </RowItem>
      <RowItem>
        <div
          onClick={onSend}
          className={classNames("comment-input__send-button", {
            "comment-input__send-button--disable": disable
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
  onSend: VoidFunction;
}

export const CommentInput = React.memo(_CommentInput);
