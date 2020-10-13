import { Center } from "components/center/center";
import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import { AssetSearchResult } from "components/conversation/conversation.types";
import { AttachImagePostButton } from "components/conversation/post/post-input/attach-image-post-button";
import { PostInputImagePreview } from "components/conversation/post/post-input/post-input-image-preview";
import { SearchPanel } from "components/conversation/search-panel/search-panel";
import ErrorMessage from "components/error-message/error-message";
import { IImageValue } from "components/form/input-image/input-image";
import { RowItem } from "components/row-item/row-item";
import { SubmitButton } from "components/submit-button/submit-button";
import React from "react";
import styled from "styled-components";
import {
  adaptiveBorderRadius,
  horizontalPaddings,
  verticalPaddings
} from "utils/style/mixins";
import {
  $borderRadiusMiddle,
  $paddingSmall,
  $paddingXsmall
} from "utils/style/sizes";

interface Props {
  name: string;
  handleOnPaste: (event?: any) => void;
  isSubmitted: boolean;
  fixedCaretPosition: number;
  onChangeCaret: (position: number) => void;
  setFocused: (value: boolean) => void;
  inputSubmit: () => (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  placeholder: string;
  disabledImages: boolean;
  open: VoidFunction;
  isOpenEditPanel: boolean;
  isOpenSearchPanel: boolean;
  isSearchPending: boolean;
  handleSearchItemSelect: (result: AssetSearchResult) => void;
  searchResult?: AssetSearchResult[];
  images: IImageValue[];
  handleRemoveImage: (id: any) => void;
  errorText?: string;
  text: string;
  isSuccessful: boolean;
  disabled: boolean;
  submitLabel: string;
}

const Container = styled(Center)`
  ${adaptiveBorderRadius($borderRadiusMiddle)};
  ${verticalPaddings($paddingXsmall)};
  ${horizontalPaddings($paddingSmall)};
  background-color: #19232b;
  justify-content: space-between;
`;

const EditPanelContainer = styled(Center)`
  ${verticalPaddings($paddingXsmall)};
  ${horizontalPaddings($paddingSmall)};
`;

const SearchPanelContainer = styled.div`
  ${verticalPaddings($paddingXsmall)};
  ${horizontalPaddings($paddingSmall)};
`;

const _PostInputView: React.FC<Props> = ({
  name,
  handleOnPaste,
  isSubmitted,
  fixedCaretPosition,
  onChangeCaret,
  setFocused,
  inputSubmit,
  placeholder,
  disabledImages,
  open,
  isOpenEditPanel,
  isOpenSearchPanel,
  isSearchPending,
  handleSearchItemSelect,
  searchResult,
  images,
  handleRemoveImage,
  errorText,
  text,
  isSuccessful,
  disabled,
  submitLabel
}) => {
  return (
    <>
      <Container>
        <ConversationInput
          onPaste={handleOnPaste}
          disabled={isSubmitted}
          outerCaret={fixedCaretPosition}
          onChangeCaret={onChangeCaret}
          setFocused={setFocused}
          submitForm={inputSubmit()}
          name={name}
          placeholder={placeholder}
        />
        {!text.length && !disabledImages && (
          <AttachImagePostButton onClick={open} />
        )}
      </Container>
      {isOpenEditPanel && (
        <div>
          {isOpenSearchPanel && (
            <SearchPanelContainer>
              <SearchPanel
                isSearchPending={isSearchPending}
                onClick={handleSearchItemSelect}
                searchResult={searchResult}
              />
            </SearchPanelContainer>
          )}
          <EditPanelContainer>
            <RowItem wide>
              <Center wrap>
                {images &&
                  images.map(image => (
                    <RowItem key={image.id} bottomOffset>
                      <PostInputImagePreview
                        onRemove={handleRemoveImage}
                        image={image}
                      />
                    </RowItem>
                  ))}
              </Center>
            </RowItem>
            <RowItem>
              {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
            </RowItem>
            {!!text.length && (
              <RowItem>
                <AttachImagePostButton size={"small"} onClick={open} />
              </RowItem>
            )}
            <RowItem>
              <SubmitButton
                isSuccessful={isSuccessful}
                checkDirty={false}
                checkValid={false}
                disabled={disabled}
              >
                {submitLabel}
              </SubmitButton>
            </RowItem>
          </EditPanelContainer>
        </div>
      )}
    </>
  );
};

export const PostInputView = React.memo(_PostInputView);
