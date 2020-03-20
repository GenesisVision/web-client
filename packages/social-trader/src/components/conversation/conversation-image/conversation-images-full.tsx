import ImageBase from "components/avatar/image-base";
import { IConversationImage } from "components/conversation/conversation.types";
import Modal, { BodyFix } from "components/modal/modal";
import React, { useCallback, useState } from "react";
import EventListener from "react-event-listener";

import "./conversation-image.scss";

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
        className="conversation-images-full__wrapper"
      >
        <BodyFix />
        <div className="conversation-image-full__wrapper">
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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(initIndex);

  const handleNext = useCallback(() => {
    const newIndex =
      currentImageIndex + 1 > images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  }, [currentImageIndex, images]);

  const handlePrev = useCallback(() => {
    const newIndex =
      currentImageIndex - 1 === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  }, [currentImageIndex, images]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent & React.MouseEvent<HTMLElement>) => {
      if (event.keyCode === 39) handleNext();
      if (event.keyCode === 37) handlePrev();
    },
    [handleNext, handlePrev]
  );
  return (
    <EventListener target={"document"} onKeyUp={handleKeyPress}>
      <ImageBase
        onClick={handleNext}
        quality={"High"}
        className="conversation-image-full"
        src={images[currentImageIndex].image}
      />
    </EventListener>
  );
};

interface Props {
  initIndex: number;
  images: IConversationImage[];
  open: boolean;
  onClose?: (event?: any) => void;
}

export const ConversationImagesFull = React.memo(_ConversationImagesFull);
