import classNames from "classnames";
import { Center } from "components/center/center";
import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import {
  ConversationInputShape,
  postMessageDefaultOptions
} from "components/conversation/conversation-input/conversation-input.helpers";
import { OnMessageSendFunc } from "components/conversation/conversation.types";
import ErrorMessage from "components/error-message/error-message";
import { IImageValue } from "components/form/input-image/input-image";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { NewPostTag } from "gv-api-web";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object } from "yup";

import "./comment-input.scss";

enum FORM_FIELDS {
  tags = "tags",
  images = "images",
  text = "text"
}

interface CommentInputFormValues {
  [FORM_FIELDS.text]: string;
  [FORM_FIELDS.tags]: NewPostTag[];
  [FORM_FIELDS.images]: IImageValue[];
}

interface Props {
  errorMessage?: string;
  status?: API_REQUEST_STATUS;
  onSubmit: OnMessageSendFunc;
}

const _CommentInput: React.FC<Props> = ({ onSubmit, status, errorMessage }) => {
  const [t] = useTranslation();
  const form = useForm<CommentInputFormValues>({
    defaultValues: postMessageDefaultOptions,
    validationSchema: object().shape({
      [FORM_FIELDS.text]: ConversationInputShape(t)
    }),
    mode: "onChange"
  });
  const {
    errors,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting, touched, dirty }
  } = form;
  const isSuccessful = status === API_REQUEST_STATUS.SUCCESS;

  useEffect(() => {
    if (isSuccessful) reset({ text: "", images: [] });
  }, [isSuccessful]);

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
  const errorText = errorMessage || errors[FORM_FIELDS.text]?.message;
  return (
    <HookForm form={form} onSubmit={formSubmit}>
      <Row className="comment-input__block" center={false}>
        <RowItem className="comment-input__input-container-row-item">
          <Row className="comment-input__input-container">
            <ConversationInput
              submitForm={inputSubmit()}
              name={FORM_FIELDS.text}
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
