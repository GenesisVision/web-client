import {
  CommentInputMessage,
  CommentInputView
} from "components/conversation/comment/comment-input/comment-input.view";
import { OnMessageSendFunc } from "components/conversation/conversation.types";
import { postMessageDefaultOptions } from "components/conversation/conversation-input/conversation-input.helpers";
import { PostContext } from "components/conversation/post/post.context";
import { useSearchPanel } from "components/conversation/search-panel/search-panel.hook";
import ErrorMessage from "components/error-message/error-message";
import { IImageValue } from "components/form/input-image/input-image";
import { HookFormInputImages } from "components/form/input-image/input-images";
import { Text } from "components/text/text";
import { PostTag } from "gv-api-web";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HookForm } from "utils/hook-form.helpers";

const MAX_IMAGES = 1;

enum FORM_FIELDS {
  tags = "tags",
  images = "images",
  text = "text"
}

export interface CommentInputFormValues {
  [FORM_FIELDS.text]: string;
  [FORM_FIELDS.tags]: PostTag[];
  [FORM_FIELDS.images]: IImageValue[];
}

interface Props {
  errorMessage?: string;
  status?: API_REQUEST_STATUS;
  onSubmit: OnMessageSendFunc;
}

const _CommentInput: React.FC<Props> = ({ onSubmit, status, errorMessage }) => {
  const { replyState, setReplyState } = useContext(PostContext);
  const form = useForm<CommentInputFormValues>({
    defaultValues: postMessageDefaultOptions,
    mode: "onChange"
  });
  const {
    setValue,
    watch,
    errors,
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = form;
  const { text, images } = watch();
  const isSuccessful = status === "SUCCESS";

  const {
    isSearchPending,
    fixedCaretPosition,
    handleSearchItemSelect,
    isOpenSearchPanel,
    searchResult,
    onChangeCaret
  } = useSearchPanel({
    text,
    setValue: value => setValue(FORM_FIELDS.text, value, true)
  });

  useEffect(() => {
    if (isSuccessful) reset({ text: "", images: [] });
  }, [isSuccessful]);
  useEffect(() => {
    onChangeCaret(1);
  }, [replyState]);

  const formSubmit = useCallback(
    values => {
      const text = replyState ? replyState.url + values.text : values.text;
      setReplyState(undefined);
      return onSubmit({ ...values, text });
    },
    [replyState, onSubmit, reset, status]
  );
  const inputSubmit = useCallback(() => {
    return handleSubmit(values => {
      return formSubmit(values);
    });
  }, [onSubmit, handleSubmit]);
  const handleRemoveImage = useCallback(
    id => {
      const newImages = images.filter(image => image.id !== id);
      setValue(FORM_FIELDS.images, newImages, true);
    },
    [images, setValue]
  );

  const disabledImages = images?.length >= MAX_IMAGES;
  const disabled = (!text && !images?.length) || isSubmitting;
  const isOpenPanel = !!images?.length || isOpenSearchPanel;
  const errorText = errorMessage || errors[FORM_FIELDS.text]?.message;
  return (
    <HookForm form={form} onSubmit={formSubmit}>
      <HookFormInputImages
        showIndicator={false}
        noDrag
        maxImages={MAX_IMAGES}
        disabled={disabledImages}
        name={FORM_FIELDS.images}
        content={({ open, onPaste }) => {
          const handleOnPaste = (event?: any) => {
            onPaste([...event.clipboardData?.files]);
          };
          return (
            <CommentInputView
              isOpenSearchPanel={isOpenSearchPanel}
              isOpenPanel={isOpenPanel}
              replyState={replyState}
              handleOnPaste={handleOnPaste}
              fixedCaretPosition={fixedCaretPosition}
              onChangeCaret={onChangeCaret}
              inputSubmit={inputSubmit}
              name={FORM_FIELDS.text}
              disabledImages={disabledImages}
              open={open}
              isSearchPending={isSearchPending}
              handleSearchItemSelect={handleSearchItemSelect}
              searchResult={searchResult}
              images={images}
              handleRemoveImage={handleRemoveImage}
              disabled={disabled}
            />
          );
        }}
      />
      <CommentInputMessage disable={disabled || !!errorText}>
        <Text size={"small"} muted>
          Enter to send
        </Text>
      </CommentInputMessage>
      <CommentInputMessage disable={!errorText}>
        {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
      </CommentInputMessage>
    </HookForm>
  );
};

export const CommentInput = React.memo(_CommentInput);
