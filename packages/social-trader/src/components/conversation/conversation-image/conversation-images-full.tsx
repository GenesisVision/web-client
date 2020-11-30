import { getImageByQuality } from "components/conversation/conversation-image/conversation-image.helpers";
import {
  ConversationImagesFullButton,
  ConversationImagesFullContainer,
  ConversationImagesFullImage,
  ConversationImagesFullWrapper
} from "components/conversation/conversation-image/conversation-image.styles";
import { IConversationImage } from "components/conversation/conversation.types";
import { GalleryLeftIcon } from "components/conversation/icons/gallery-left.icon";
import { GalleryRightIcon } from "components/conversation/icons/gallery-right.icon";
import Modal, { BodyFix } from "components/modal/modal";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useState } from "react";
import EventListener from "react-event-listener";

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
      <ConversationImagesFullContainer
        onClick={handleBackdropClick}
        onMouseDown={handleMouseDown}
      >
        <BodyFix />
        <ConversationImagesFullWrapper>
          <ConversationImagesFullContent
            initIndex={initIndex}
            images={images}
          />
        </ConversationImagesFullWrapper>
      </ConversationImagesFullContainer>
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
      <div onMouseEnter={setOver} onMouseLeave={setLeave}>
        <ConversationImagesFullImage
          onClick={handleNext}
          quality={"High"}
          src={
            getImageByQuality(images[currentImageIndex].resizes, "Original")
              .logoUrl
          }
        />
        <ConversationImagesFullButton
          left
          show={isButtonsShow}
          onClick={handlePrev}
        >
          <GalleryLeftIcon />
        </ConversationImagesFullButton>
        <ConversationImagesFullButton
          right
          show={isButtonsShow}
          onClick={handleNext}
        >
          <GalleryRightIcon />
        </ConversationImagesFullButton>
      </div>
    </EventListener>
  );
};

export const ConversationImagesFull = React.memo(_ConversationImagesFull);
