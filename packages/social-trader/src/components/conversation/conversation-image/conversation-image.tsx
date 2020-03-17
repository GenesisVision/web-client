import "./conversation-image.scss";

import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { ConversationImageFull } from "components/conversation/conversation-image/conversation-image-full";
import { IConversationImage } from "components/conversation/conversation.types";
import { MutedText } from "components/muted-text/muted-text";
import { SIZES } from "constants/constants";
import useIsOpen from "hooks/is-open.hook";
import React from "react";

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

const EmptyImage: React.FC<{ imageClassName: string }> = ({
  imageClassName
}) => {
  return (
    <div className={imageClassName}>
      <MutedText>Image not found</MutedText>
    </div>
  );
};

const _ConversationImage: React.FC<Props> = ({ image, size }) => {
  const [open, setOpen, setClose] = useIsOpen();

  return (
    <>
      <ImageBaseElement
        onClick={setOpen}
        DefaultImageComponent={EmptyImage}
        defaultImageClassName={"conversation-image__empty"}
        className={classNames("conversation-image", {
          "conversation-image--small": size === SIZES.SMALL,
          "conversation-image--middle": size === SIZES.MIDDLE,
          "conversation-image--large": size === SIZES.LARGE
        })}
        src={image.url}
      />
      <ConversationImageFull open={open} onClose={setClose} image={image} />
    </>
  );
};

interface Props {
  size: SIZES;
  image: IConversationImage;
}

export const ConversationImage = React.memo(_ConversationImage);
