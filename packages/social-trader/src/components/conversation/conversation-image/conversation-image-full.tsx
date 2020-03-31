import ImageBase from "components/avatar/image-base";
import ImageBaseElement from "components/avatar/image-base.element";
import { IConversationImage } from "components/conversation/conversation.types";
import Modal, { BodyFix } from "components/modal/modal";
import React from "react";

import "./conversation-image.scss";

const _ConversationImageFull: React.FC<Props> = ({ open, onClose, image }) => {
  return (
    <Modal open={open} onClose={onClose} fixed>
      <BodyFix />
      <div className="conversation-image-full__wrapper" onClick={onClose}>
        <ImageBase
          quality={"High"}
          className="conversation-image-full"
          src={image.image}
        />
      </div>
    </Modal>
  );
};

interface Props {
  image: IConversationImage;
  open: boolean;
  onClose?: VoidFunction;
}

export const ConversationImageFull = React.memo(_ConversationImageFull);
