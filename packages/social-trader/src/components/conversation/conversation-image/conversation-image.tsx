import { getImageUrlBySize } from "components/conversation/conversation-image/conversation-image.helpers";
import {
  ConversationImageEmptyImageContainer,
  ConversationImageImageBaseElement
} from "components/conversation/conversation-image/conversation-image.styles";
import { ConversationImagesFull } from "components/conversation/conversation-image/conversation-images-full";
import { IConversationImage } from "components/conversation/conversation.types";
import { Text } from "components/text/text";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { SizesType } from "utils/types";

interface Props {
  index: number;
  size: SizesType;
  images: IConversationImage[];
}

const EmptyImage: React.FC<{ size: SizesType }> = ({ size }) => {
  return (
    <ConversationImageEmptyImageContainer size={size}>
      <Text muted>Image not found</Text>
    </ConversationImageEmptyImageContainer>
  );
};

const _ConversationImage: React.FC<Props> = ({ images, size, index }) => {
  const [open, setOpen, setClose] = useIsOpen();

  return (
    <>
      <ConversationImageImageBaseElement
        size={size}
        onClick={setOpen}
        DefaultImageComponent={EmptyImage}
        src={getImageUrlBySize(images[index], size)}
      />
      <ConversationImagesFull
        open={open}
        onClose={setClose}
        images={images}
        initIndex={index}
      />
    </>
  );
};

export const ConversationImage = React.memo(_ConversationImage);
