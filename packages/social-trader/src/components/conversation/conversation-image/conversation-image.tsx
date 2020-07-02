import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { getImageUrlBySize } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationImagesFull } from "components/conversation/conversation-image/conversation-images-full";
import { IConversationImage } from "components/conversation/conversation.types";
import { Text } from "components/text/text";
import { SIZES } from "constants/constants";
import useIsOpen from "hooks/is-open.hook";
import React from "react";

import styles from "./conversation-image.module.scss";

const EmptyImage: React.FC<{ imageClassName: string }> = ({
  imageClassName
}) => {
  return (
    <div className={imageClassName}>
      <Text muted>Image not found</Text>
    </div>
  );
};

const _ConversationImage: React.FC<Props> = ({ images, size, index }) => {
  const [open, setOpen, setClose] = useIsOpen();

  return (
    <>
      <ImageBaseElement
        onClick={setOpen}
        DefaultImageComponent={EmptyImage}
        defaultImageClassName={styles["conversation-image__empty"]}
        className={classNames(styles["conversation-image"], {
          [styles["conversation-image--small"]]: size === SIZES.SMALL,
          [styles["conversation-image--middle"]]: size === SIZES.MIDDLE,
          [styles["conversation-image--large"]]: size === SIZES.LARGE
        })}
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

interface Props {
  index: number;
  size: SIZES;
  images: IConversationImage[];
}

export const ConversationImage = React.memo(_ConversationImage);
