import {
  ConversationInputShape,
  getPostMessageDefaultOptions
} from "components/conversation/conversation-input/conversation-input.helpers";
import { OnMessageSendFunc } from "components/conversation/conversation.types";
import { PostInputView } from "components/conversation/post/post-input/post-input.view";
import { useSearchPanel } from "components/conversation/search-panel/search-panel.hook";
import { IImageValue } from "components/form/input-image/input-image";
import { HookFormInputImages } from "components/form/input-image/input-images";
import { NewPostImage } from "gv-api-web";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { HookForm, postponeFunc } from "utils/hook-form.helpers";
import { $panelBackgroundColor } from "utils/style/colors";
import { adaptiveBorderRadius } from "utils/style/mixins";
import { $borderRadiusMiddle } from "utils/style/sizes";
import { object } from "yup";

const MAX_IMAGES = 10;

enum FORM_FIELDS {
  tags = "tags",
  images = "images",
  text = "text"
}

export interface PostInputFormValues {
  [FORM_FIELDS.text]: string;
  [FORM_FIELDS.images]: IImageValue[];
}

interface Props {
  submitLabel?: string;
  text?: string;
  images?: Array<IImageValue & NewPostImage>;
  allowEmptyMessage?: boolean;
  placeholder?: string;
  errorMessage?: string;
  status?: API_REQUEST_STATUS;
  onSubmit: OnMessageSendFunc;
}

const Container = styled.div`
  width: 100%;
  position: relative;
  ${adaptiveBorderRadius($borderRadiusMiddle)};
  background-color: ${$panelBackgroundColor};
`;

const _PostInput: React.FC<Props> = ({
  submitLabel = "Send",
  text: propText,
  images: propImages,
  allowEmptyMessage,
  placeholder = "What's new?",
  errorMessage,
  onSubmit,
  status
}) => {
  const [t] = useTranslation();
  const [isFocused, _, __, setFocused] = useIsOpen();
  const form = useForm<PostInputFormValues>({
    defaultValues: getPostMessageDefaultOptions({
      text: propText,
      images: propImages
    }),
    validationSchema: object().shape({
      [FORM_FIELDS.text]: ConversationInputShape(t)
    }),
    mode: "onChange"
  });
  const {
    setValue,
    errors,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitted }
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
    if (isSuccessful) postponeFunc(() => reset({ text: "", images: [] }));
  }, [isSuccessful]);

  const inputSubmit = useCallback(() => {
    return handleSubmit(values => {
      return onSubmit(values);
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
  const disabled = allowEmptyMessage ? false : !text && !images?.length;
  const isOpenEditPanel =
    allowEmptyMessage ||
    isFocused ||
    !!text ||
    !!images?.length ||
    isOpenSearchPanel;
  const errorText = errorMessage || errors[FORM_FIELDS.text]?.message;
  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Container>
        <HookFormInputImages
          maxImages={MAX_IMAGES}
          disabled={disabledImages}
          name={FORM_FIELDS.images}
          content={({ open, onPaste }) => {
            const handleOnPaste = (event?: any) => {
              onPaste([...event.clipboardData?.files]);
            };
            return (
              <PostInputView
                name={FORM_FIELDS.text}
                handleOnPaste={handleOnPaste}
                isSubmitted={isSubmitted}
                fixedCaretPosition={fixedCaretPosition}
                onChangeCaret={onChangeCaret}
                setFocused={setFocused}
                inputSubmit={inputSubmit}
                placeholder={placeholder}
                disabledImages={disabledImages}
                open={open}
                isOpenEditPanel={isOpenEditPanel}
                isOpenSearchPanel={isOpenSearchPanel}
                isSearchPending={isSearchPending}
                handleSearchItemSelect={handleSearchItemSelect}
                searchResult={searchResult}
                images={images}
                handleRemoveImage={handleRemoveImage}
                errorText={errorText}
                text={text}
                isSuccessful={isSuccessful}
                disabled={disabled}
                submitLabel={submitLabel}
              />
            );
          }}
        />
      </Container>
    </HookForm>
  );
};

export const PostInput = React.memo(_PostInput);
