import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import ImageBaseElement from "components/avatar/image-base.element";
import { ConversationImageFull } from "components/conversation/conversation-image/conversation-image-full";
import { ConversationImagesFull } from "components/conversation/conversation-image/conversation-images-full";
import { IConversationImage } from "components/conversation/conversation.types";
import { MutedText } from "components/muted-text/muted-text";
import { SIZES } from "constants/constants";
import useIsOpen from "hooks/is-open.hook";
import { ImageQualityType } from "hooks/url.hook";
import React from "react";

import "./conversation-image.scss";

export const getImageSize = (count: number): SIZES => {
  switch (count) {
    case 1:
      return SIZES.LARGE;
    case 2:
      return SIZES.MIDDLE;
    default:
      return SIZES.SMALL;
  }
};

const getImageQuality = (size: SIZES): ImageQualityType => {
  switch (size) {
    case SIZES.LARGE:
      return "High";
    case SIZES.MIDDLE:
      return "Medium";
    case SIZES.SMALL:
      return "Low";
  }
};

const EmptyImage: React.FC<{ imageClassName: string }> = ({
  imageClassName
}) => {
  return (
    <div className={imageClassName}>
      <MutedText>Image not found</MutedText>
    </div>
  );
};

const _ConversationImage: React.FC<Props> = ({ images, size, index }) => {
  const [open, setOpen, setClose] = useIsOpen();

  return (
    <>
      <ImageBase
        quality={getImageQuality(size)}
        onClick={setOpen}
        DefaultImageComponent={EmptyImage}
        defaultImageClassName={"conversation-image__empty"}
        className={classNames("conversation-image", {
          "conversation-image--small": size === SIZES.SMALL,
          "conversation-image--middle": size === SIZES.MIDDLE,
          "conversation-image--large": size === SIZES.LARGE
        })}
        src={images[index].image}
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

interface Props {
  index: number;
  size: SIZES;
  images: IConversationImage[];
}

export const ConversationImage = React.memo(_ConversationImage);
