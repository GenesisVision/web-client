import { ConversationImage } from "components/conversation/conversation-image/conversation-image";
import { getImageBySize } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationImagesFull } from "components/conversation/conversation-image/conversation-images-full";
import { IConversationImage } from "components/conversation/conversation.types";
import { RowItem } from "components/row-item/row-item";
import React, { useCallback, useState } from "react";
import { SizesType } from "utils/types";

interface Props {
  size: SizesType;
  images: IConversationImage[];
  bottomOffset?: boolean;
}

const _ConversationImages: React.FC<Props> = ({
  images,
  size,
  bottomOffset = true
}) => {
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
      {images.map((image, index) => {
        const { height, width, logoUrl } = getImageBySize(image, size);
        return (
          <RowItem bottomOffset={bottomOffset} key={index}>
            <ConversationImage
              height={height}
              width={width}
              size={size}
              onClick={setOpen(index)}
              src={logoUrl}
            />
          </RowItem>
        );
      })}
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
