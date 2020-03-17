import "./conversation-image.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import { ConversationImageFull } from "components/conversation/conversation-image/conversation-image-full";
import { IConversationImage } from "components/conversation/conversation.types";
import { MutedText } from "components/muted-text/muted-text";
import useIsOpen from "hooks/is-open.hook";
import React from "react";

const _ConversationImage: React.FC<Props> = ({ image }) => {
  const [open, setOpen, setClose] = useIsOpen();

  return (
    <>
      <ImageBaseElement
        onClick={setOpen}
        DefaultImageComponent={EmptyImage}
        className="conversation-image"
        src={image.url}
      />
      <ConversationImageFull open={open} onClose={setClose} image={image} />
    </>
  );
};

const EmptyImage = () => {
  return (
    <div className="conversation-image__empty">
      <MutedText>Image not found</MutedText>
    </div>
  );
};

interface Props {
  image: IConversationImage;
}

export const ConversationImage = React.memo(_ConversationImage);
