import "./post-input.scss";

import classNames from "classnames";
import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import { ConversationInputShape } from "components/conversation/conversation-input/conversation-input.helpers";
import { OnMessageSendFunc } from "components/conversation/conversation.types";
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

interface PostInputFormValues {
  [FORM_FIELDS.TEXT]: string;
}

interface Props {
  onSubmit: OnMessageSendFunc;
}

const _PostInput: React.FC<Props> = ({ onSubmit }) => {
  const [t] = useTranslation();
  const form = useForm<PostInputFormValues>({
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
      <Row className="post-input__input-container">
        <RowItem className="post-input__input-row-item">
          <ConversationInput
            submitForm={inputSubmit()}
            name={"text"}
            placeholder={"What's new?"}
          />
        </RowItem>
        <RowItem className="post-input__button-row-item">
          <button
            type="submit"
            disabled={disabled}
            className={classNames("post-input__button", {
              "post-input__button--disable": disabled
            })}
          >
            >
          </button>
        </RowItem>
      </Row>
    </HookForm>
  );
};

export const PostInput = React.memo(_PostInput);
