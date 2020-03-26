import classNames from "classnames";
import { Center } from "components/center/center";
import { AttachImageCommentButton } from "components/conversation/comment/comment-input/attach-image-comment-button";
import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import {
  ConversationInputShape,
  postMessageDefaultOptions
} from "components/conversation/conversation-input/conversation-input.helpers";
import { OnMessageSendFunc } from "components/conversation/conversation.types";
import { PostInputImagePreview } from "components/conversation/post/post-input/post-input-image-preview";
import { SearchPanel } from "components/conversation/search-panel/search-panel";
import { useSearchPanel } from "components/conversation/search-panel/search-panel.hook";
import ErrorMessage from "components/error-message/error-message";
import { IImageValue } from "components/form/input-image/input-image";
import { HookFormInputImages } from "components/form/input-image/input-images";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { PostTag } from "gv-api-web";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object } from "yup";

import "./comment-input.scss";

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
  const [t] = useTranslation();
  const form = useForm<CommentInputFormValues>({
    defaultValues: postMessageDefaultOptions,
    validationSchema: object().shape({
      [FORM_FIELDS.text]: ConversationInputShape(t)
    }),
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
  const isSuccessful = status === API_REQUEST_STATUS.SUCCESS;

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
    <HookForm form={form} onSubmit={formSubmit} className="comment-input__form">
      <HookFormInputImages
        showIndicator={false}
        noDrag
        maxImages={MAX_IMAGES}
        disabled={disabledImages}
        className="comment-input__drop-zone"
        name={FORM_FIELDS.images}
        content={open => (
          <Row className="comment-input__block" center={false}>
            <RowItem className="comment-input__input-container-row-item">
              <div
                className={classNames(
                  "comment-input__input-and-panel-container",
                  {
                    "comment-input__input-and-panel-container--open": isOpenPanel
                  }
                )}
              >
                <Center className="comment-input__input-container">
                  <ConversationInput
                    outerCaret={fixedCaretPosition}
                    onChangeCaret={onChangeCaret}
                    submitForm={inputSubmit()}
                    name={FORM_FIELDS.text}
                  />
                  {!disabledImages && (
                    <AttachImageCommentButton onClick={open} />
                  )}
                </Center>
                {isOpenPanel && (
                  <div>
                    {isOpenSearchPanel && (
                      <SearchPanel
                        isSearchPending={isSearchPending}
                        onClick={handleSearchItemSelect}
                        searchResult={searchResult}
                      />
                    )}
                    {!!images?.length && (
                      <Center wrap className="comment-input__panel-container">
                        {images.map(image => (
                          <RowItem key={image.id}>
                            <PostInputImagePreview
                              onRemove={handleRemoveImage}
                              image={image}
                            />
                          </RowItem>
                        ))}
                      </Center>
                    )}
                  </div>
                )}
              </div>
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
        )}
      />
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
