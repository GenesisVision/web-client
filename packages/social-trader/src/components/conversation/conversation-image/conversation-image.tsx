import {
  ConversationImageEmptyImageContainer,
  ConversationImageImageBaseElement
} from "components/conversation/conversation-image/conversation-image.styles";
import { Text } from "components/text/text";
import React from "react";
import { SizesType } from "utils/types";

export interface IConversationImageProps {
  width?: number;
  height?: number;
  size: SizesType;
  onClick: VoidFunction;
  src: string;
}

const EmptyImage: React.FC<{ size: SizesType }> = ({ size }) => {
  return (
    <ConversationImageEmptyImageContainer size={size}>
      <Text muted>Image not found</Text>
    </ConversationImageEmptyImageContainer>
  );
};

const _ConversationImage: React.FC<IConversationImageProps> = ({
  width,
  height,
  size,
  onClick,
  src
}) => {
  return (
    <ConversationImageImageBaseElement
      width={width}
      height={height}
      size={size}
      onClick={onClick}
      DefaultImageComponent={EmptyImage}
      src={src}
    />
  );
};

export const ConversationImage = React.memo(_ConversationImage);
