import "./comment-input.scss";

import classNames from "classnames";
import { Center } from "components/center/center";
import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import { ConversationInputShape } from "components/conversation/conversation-input/conversation-input.helpers";
import { OnMessageSendFunc } from "components/conversation/conversation.types";
import ErrorMessage from "components/error-message/error-message";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { useCallback, useEffect } from "react";
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
  errorMessage?: string;
  status?: API_REQUEST_STATUS;
  onSubmit: OnMessageSendFunc;
}

const _CommentInput: React.FC<Props> = ({ onSubmit, status, errorMessage }) => {
  const [t] = useTranslation();
  const form = useForm<CommentInputFormValues>({
    validationSchema: object().shape({
      [FORM_FIELDS.TEXT]: ConversationInputShape(t)
    }),
    mode: "onChange"
  });
  const {
    errors,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting, touched, dirty }
  } = form;

  useEffect(() => {
    if (status === API_REQUEST_STATUS.SUCCESS) reset({ text: "" });
  }, [status]);

  const formSubmit = useCallback(
    values => {
      return onSubmit(values);
    },
    [onSubmit, reset, status]
  );
  const inputSubmit = useCallback(() => {
    return handleSubmit(values => {
      return formSubmit(values);
    });
  }, [onSubmit, handleSubmit]);
  const disabled = isSubmitting || !isValid;
  const errorText = errorMessage || errors[FORM_FIELDS.TEXT]?.message;
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
      <CommentInputMessage disable={disabled || !!errorText}>
        <MutedText>Enter to send</MutedText>
      </CommentInputMessage>
      <CommentInputMessage disable={!errorText}>
        {errorText && <ErrorMessage error={errorText} />}
      </CommentInputMessage>
    </HookForm>
  );
};

const CommentInputMessage: React.FC<{ disable: boolean }> = ({
  children,
  disable
}) => {
  return (
    <div className="comment-input__send-text-container">
      <Center
        className={classNames("comment-input__send-text", {
          "comment-input__send-text--disable": disable
        })}
      >
        {children}
      </Center>
    </div>
  );
};

export const CommentInput = React.memo(_CommentInput);
