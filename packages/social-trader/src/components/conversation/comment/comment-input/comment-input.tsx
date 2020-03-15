import "./comment-input.scss";

import classNames from "classnames";
import { Center } from "components/center/center";
import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import { ConversationInputShape } from "components/conversation/conversation-input/conversation-input.helpers";
import { OnMessageSendFunc } from "components/conversation/conversation.types";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object } from "yup";

enum FORM_FIELDS {
  TEXT = "text"
}

interface CommentInputFormValues {
  [FORM_FIELDS.TEXT]: string;
}

interface Props {
  onSubmit: OnMessageSendFunc;
}

const _CommentInput: React.FC<Props> = ({ onSubmit }) => {
  const [t] = useTranslation();
  const form = useForm<CommentInputFormValues>({
    validationSchema: object().shape({
      [FORM_FIELDS.TEXT]: ConversationInputShape(t)
    }),
    mode: "onChange"
  });
  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = form;
  const formSubmit = useCallback(
    values => {
      return onSubmit(values).then(value => {
        reset({ text: "" });
        return value;
      });
    },
    [onSubmit, reset]
  );
  const inputSubmit = useCallback(() => {
    return handleSubmit(values => {
      return formSubmit(values);
    });
  }, [onSubmit, handleSubmit]);
  const disabled = isSubmitting || !isValid;
  return (
    <HookForm form={form} onSubmit={formSubmit}>
      <Row className="comment-input__block" center={false}>
        <RowItem className="comment-input__input-container-row-item">
          <Row className="comment-input__input-container">
            <ConversationInput
              submitForm={inputSubmit()}
              name={FORM_FIELDS.TEXT}
            />
          </Row>
        </RowItem>
        <RowItem>
          <button
            type="submit"
            disabled={disabled}
            className={classNames("comment-input__send-button", {
              "comment-input__send-button--disable": disabled
            })}
          >
            >
          </button>
        </RowItem>
      </Row>
      <Row small className="comment-input__send-text-container">
        <Center
          className={classNames("comment-input__send-text", {
            "comment-input__send-text--disable": disabled
          })}
        >
          <MutedText>Enter to send</MutedText>
        </Center>
      </Row>
    </HookForm>
  );
};

export const CommentInput = React.memo(_CommentInput);
