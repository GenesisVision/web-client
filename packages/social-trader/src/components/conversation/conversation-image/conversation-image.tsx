import clsx from "clsx";
import ImageBaseElement from "components/avatar/image-base.element";
import { getImageUrlBySize } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationImagesFull } from "components/conversation/conversation-image/conversation-images-full";
import { IConversationImage } from "components/conversation/conversation.types";
import { Text } from "components/text/text";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./conversation-image.module.scss";

interface Props {
  index: number;
  size: SizesType;
  images: IConversationImage[];
}

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
        className={clsx(styles["conversation-image"], {
          [styles["conversation-image--small"]]: size === "small",
          [styles["conversation-image--middle"]]: size === "middle",
          [styles["conversation-image--large"]]: size === "large"
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

export const ConversationImage = React.memo(_ConversationImage);
