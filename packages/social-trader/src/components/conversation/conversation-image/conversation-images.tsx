import { getImageUrlBySize } from "components/conversation/conversation-image/conversation-image.helpers";
import {
  ConversationImageEmptyImageContainer,
  ConversationImageImageBaseElement
} from "components/conversation/conversation-image/conversation-image.styles";
import { ConversationImagesFull } from "components/conversation/conversation-image/conversation-images-full";
import { IConversationImage } from "components/conversation/conversation.types";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React, { useCallback, useState } from "react";
import { SizesType } from "utils/types";

interface Props {
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

const _ConversationImages: React.FC<Props> = ({ images, size }) => {
  const [openedImage, setOpenedImage] = useState<number | undefined>();
  const setClose = useCallback(() => {
    setOpenedImage(undefined);
  }, []);
  const setOpen = useCallback(
    (id: number) => () => {
      setOpenedImage(id);
    },
    []
  );
  return (
    <>
      {images.map((image, index) => (
        <RowItem bottomOffset key={index}>
          <ConversationImageImageBaseElement
            size={size}
            onClick={setOpen(index)}
            DefaultImageComponent={EmptyImage}
            src={getImageUrlBySize(image, size)}
          />
        </RowItem>
      ))}
      <ConversationImagesFull
        open={openedImage !== undefined}
        onClose={setClose}
        images={images}
        initIndex={openedImage || 0}
      />
    </>
  );
};

export const ConversationImages = React.memo(_ConversationImages);
