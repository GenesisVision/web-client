import clsx from "clsx";
import ImageBase from "components/avatar/image-base";
import { getImageUrlByQuality } from "components/conversation/conversation-image/conversation-image.helpers";
import { IConversationImage } from "components/conversation/conversation.types";
import { GalleryLeftIcon } from "components/conversation/icons/gallery-left.icon";
import { GalleryRightIcon } from "components/conversation/icons/gallery-right.icon";
import Modal, { BodyFix } from "components/modal/modal";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useState } from "react";
import EventListener from "react-event-listener";

import styles from "./conversation-image.module.scss";

interface Props {
  initIndex: number;
  images: IConversationImage[];
  open: boolean;
  onClose?: (event?: any) => void;
}

const _ConversationImagesFull: React.FC<Props> = ({
  initIndex,
  open,
  onClose,
  images
}) => {
  const [target, setTarget] = useState<EventTarget | null>(null);

  const handleBackdropClick = useCallback(
    event => {
      if (target === event.currentTarget && onClose) {
        onClose(event);
      }
    },
    [onClose, target]
  );

  const handleMouseDown = useCallback(event => {
    setTarget(event.target);
  }, []);

  return (
    <Modal open={open} onClose={onClose} fixed>
      <div
        onClick={handleBackdropClick}
        onMouseDown={handleMouseDown}
        className={styles["conversation-images-full__wrapper"]}
      >
        <BodyFix />
        <div className={styles["conversation-image-full__wrapper"]}>
          <ConversationImagesFullContent
            initIndex={initIndex}
            images={images}
          />
        </div>
      </div>
    </Modal>
  );
};

const ConversationImagesFullContent: React.FC<{
  initIndex: number;
  images: IConversationImage[];
}> = ({ initIndex, images }) => {
  const [isOver, setOver, setLeave] = useIsOpen();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(initIndex);

  const handleNext = useCallback(() => {
    const newIndex =
      currentImageIndex + 1 > images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  }, [currentImageIndex, images]);

  const handlePrev = useCallback(() => {
    const newIndex =
      currentImageIndex - 1 < 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  }, [currentImageIndex, images]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent & React.MouseEvent<HTMLElement>) => {
      if (event.keyCode === 39) handleNext();
      if (event.keyCode === 37) handlePrev();
    },
    [handleNext, handlePrev]
  );

  const isButtonsShow = isOver && images.length > 1;
  return (
    <EventListener target={"document"} onKeyUp={handleKeyPress}>
      <div
        className={styles["conversation-image-full__container"]}
        onMouseEnter={setOver}
        onMouseLeave={setLeave}
      >
        <ImageBase
          onClick={handleNext}
          quality={"High"}
          className={styles["conversation-image-full"]}
          src={getImageUrlByQuality(
            images[currentImageIndex].resizes,
            "Original"
          )}
        />
        <div
          onClick={handlePrev}
          className={clsx(
            styles["conversation-image-full__button--left"],
            styles["conversation-image-full__button"],
            {
              [styles["conversation-image-full__button--show"]]: isButtonsShow
            }
          )}
        >
          <GalleryLeftIcon />
        </div>
        <div
          onClick={handleNext}
          className={clsx(
            styles["conversation-image-full__button--right"],
            styles["conversation-image-full__button"],
            { [styles["conversation-image-full__button--show"]]: isButtonsShow }
          )}
        >
          <GalleryRightIcon />
        </div>
      </div>
    </EventListener>
  );
};

export const ConversationImagesFull = React.memo(_ConversationImagesFull);
