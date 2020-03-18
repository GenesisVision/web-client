import { Center } from "components/center/center";
import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import { ConversationInputShape } from "components/conversation/conversation-input/conversation-input.helpers";
import { OnMessageSendFunc } from "components/conversation/conversation.types";
import AttachImageButton from "components/conversation/post/post-input/attach-image-button";
import ErrorMessage from "components/error-message/error-message";
import { DropZoneWrapper } from "components/form/input-image/drop-zone-wrapper";
import GVButton from "components/gv-button";
import { RowItem } from "components/row-item/row-item";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object } from "yup";

import "./post-input.scss";

enum FORM_FIELDS {
  TEXT = "text"
}

interface PostInputFormValues {
  [FORM_FIELDS.TEXT]: string;
}

interface Props {
  errorMessage?: string;
  status?: API_REQUEST_STATUS;
  onSubmit: OnMessageSendFunc;
}

const _PostInput: React.FC<Props> = ({ errorMessage, onSubmit, status }) => {
  const [t] = useTranslation();
  const [isFocused, _, __, setFocused] = useIsOpen();
  const form = useForm<PostInputFormValues>({
    validationSchema: object().shape({
      [FORM_FIELDS.TEXT]: ConversationInputShape(t)
    }),
    mode: "onChange"
  });
  const {
    errors,
    watch,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = form;
  const { text } = watch();

  useEffect(() => {
    if (status === API_REQUEST_STATUS.SUCCESS) reset({ text: "" });
  }, [status]);

  const formSubmit = useCallback(
    values => {
      return onSubmit(values);
    },
    [onSubmit, reset]
  );
  const inputSubmit = useCallback(() => {
    return handleSubmit(values => {
      return formSubmit(values);
    });
  }, [onSubmit, handleSubmit]);
  const disabled = isSubmitting || !isValid;
  const isOpenPanel = isFocused || !!text;

  const errorText = errorMessage || errors[FORM_FIELDS.TEXT]?.message;
  return (
    <HookForm form={form} onSubmit={formSubmit}>
      <DropZoneWrapper
        className="post-input__container"
        name={"image"}
        onChange={() => {}}
        content={open => (
          <>
            <div className="post-input__input-container">
              <ConversationInput
                setFocused={setFocused}
                submitForm={inputSubmit()}
                name={"text"}
                placeholder={"What's new?"}
              />
            </div>
            {isOpenPanel && (
              <Center className="post-input__edit-panel-container">
                <RowItem className="post-input__add-buttons">
                  <AttachImageButton
                    onClick={() => {
                      setFocused(true);
                      open();
                    }}
                  />
                </RowItem>
                <RowItem className="post-input__errors">
                  {errorText && <ErrorMessage error={errorText} />}
                </RowItem>
                <RowItem className="post-input__send-buttons">
                  <GVButton type="submit" disabled={disabled}>
                    Send
                  </GVButton>
                </RowItem>
              </Center>
            )}
          </>
        )}
      />
      {/*<div className="post-input__container">

      </div>*/}
    </HookForm>
  );
};

export const PostInput = React.memo(_PostInput);
