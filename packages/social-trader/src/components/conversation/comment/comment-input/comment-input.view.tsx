import { Center } from "components/center/center";
import { AttachImageCommentButton } from "components/conversation/comment/comment-input/attach-image-comment-button";
import { CommentInputReply } from "components/conversation/comment/comment-input/comment-input-reply";
import {
  $inputHeight,
  $sendButtonSize
} from "components/conversation/comment/comment-input/comment-input.styles";
import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import { AssetSearchResult } from "components/conversation/conversation.types";
import { SendIcon } from "components/conversation/icons/send.icon";
import { PostInputImagePreview } from "components/conversation/post/post-input/post-input-image-preview";
import { IPostContextReplyState } from "components/conversation/post/post.context";
import { SearchPanel } from "components/conversation/search-panel/search-panel";
import { IImageValue } from "components/form/input-image/input-image";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";
import styled from "styled-components";
import {
  $borderColor,
  $panelBackgroundColor,
  $separatorColor
} from "utils/style/colors";
import {
  adaptiveMargin,
  horizontalPaddings,
  transition,
  verticalPaddings
} from "utils/style/mixins";
import {
  $borderRadiusMiddle,
  $paddingSmall,
  $paddingXsmall,
  $paddingXxxsmall
} from "utils/style/sizes";

interface Props {
  isOpenSearchPanel?: boolean;
  isOpenPanel?: boolean;
  replyState?: IPostContextReplyState;
  handleOnPaste: (event?: any) => void;
  fixedCaretPosition: number;
  onChangeCaret: (position: number) => void;
  inputSubmit: () => (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  name: string;
  disabledImages: boolean;
  open: VoidFunction;
  isSearchPending: boolean;
  handleSearchItemSelect: (result: AssetSearchResult) => void;
  searchResult?: AssetSearchResult[];
  images: IImageValue[];
  handleRemoveImage: (id: any) => void;
  disabled: boolean;
}

const CommonContainer = styled.div`
  width: 100%;
`;

const StyledRowItem = styled(RowItem)`
  width: 100%;
`;

const InputAndPanelContainer = styled.div<{ open?: boolean }>`
  border-radius: ${({ open }) =>
    open
      ? `${$inputHeight / 2}px ${$inputHeight / 2}px
      ${$borderRadiusMiddle}px ${$borderRadiusMiddle}px`
      : `${$inputHeight / 2}px`};
  background-color: ${$borderColor};
`;

const InputContainer = styled(Center)`
  background: ${$panelBackgroundColor};
  padding: 4px ${$paddingXsmall}px;
  border-radius: ${$inputHeight / 2}px;
  border: 1px solid ${$borderColor};
`;

const PanelContainer = styled(Center)`
  ${verticalPaddings($paddingXsmall)};
  ${horizontalPaddings($paddingSmall)};
`;

const SearchPanelContainer = styled.div`
  ${verticalPaddings($paddingXsmall)};
  ${horizontalPaddings($paddingSmall)};
`;

const SendButton = styled.button`
  padding: 0;
  outline: none;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${$inputHeight}px;
  height: ${$inputHeight}px;
  border-radius: 50%;
  background: ${$separatorColor};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const StyledSendIcon = styled(SendIcon)`
  padding: ${($inputHeight - $sendButtonSize) / 2}px;
`;

const _CommentInputView: React.FC<Props> = ({
  isOpenSearchPanel,
  isOpenPanel,
  replyState,
  handleOnPaste,
  fixedCaretPosition,
  onChangeCaret,
  inputSubmit,
  name,
  disabledImages,
  open,
  isSearchPending,
  handleSearchItemSelect,
  searchResult,
  images,
  handleRemoveImage,
  disabled
}) => {
  return (
    <CommonContainer>
      <CommentInputReply />
      <Row wide size={"small"}>
        <StyledRowItem>
          <InputAndPanelContainer open={isOpenPanel}>
            <InputContainer>
              <ConversationInput
                focusTrigger={replyState}
                onPaste={handleOnPaste}
                outerCaret={fixedCaretPosition}
                onChangeCaret={onChangeCaret}
                submitForm={inputSubmit()}
                name={name}
              />
              {!disabledImages && <AttachImageCommentButton onClick={open} />}
            </InputContainer>
            {isOpenPanel && (
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
                {!!images?.length && (
                  <PanelContainer wrap>
                    {images.map(image => (
                      <RowItem key={image.id}>
                        <PostInputImagePreview
                          onRemove={handleRemoveImage}
                          image={image}
                        />
                      </RowItem>
                    ))}
                  </PanelContainer>
                )}
              </div>
            )}
          </InputAndPanelContainer>
        </StyledRowItem>
        <RowItem>
          <SendButton type="submit" disabled={disabled}>
            <StyledSendIcon disabled={disabled} />
          </SendButton>
        </RowItem>
      </Row>
    </CommonContainer>
  );
};

const CommentInputMessageContainer = styled.div`
  ${adaptiveMargin("top", $paddingXxxsmall)};
  padding-left: ${$paddingXsmall}px;
  position: absolute;
  line-height: 1;
`;

const SendText = styled(Center)<{ disabled?: boolean }>`
  ${transition("opacity")};
  opacity: ${({ disabled }) => (disabled ? 0 : 1)};
`;

export const CommentInputMessage: React.FC<{ disable: boolean }> = ({
  children,
  disable
}) => {
  return (
    <CommentInputMessageContainer>
      <SendText disabled={disable}>
        <Text size={"small"}>{children}</Text>
      </SendText>
    </CommentInputMessageContainer>
  );
};

export const CommentInputView = React.memo(_CommentInputView);
