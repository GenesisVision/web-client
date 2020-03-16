import "./conversation-image.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import { ConversationImageFull } from "components/conversation/conversation-image/conversation-image-full";
import { IConversationImage } from "components/conversation/conversation.types";
import useIsOpen from "hooks/is-open.hook";
import React from "react";

const _ConversationImage: React.FC<Props> = ({ image }) => {
  const [open, setOpen, setClose] = useIsOpen();

  return (
    <>
      <div onClick={setOpen}>
        <ImageBaseElement className="conversation-image" src={image.url} />
      </div>
      <ConversationImageFull open={open} onClose={setClose} image={image} />
    </>
  );
};

interface Props {
  image: IConversationImage;
}

export const ConversationImage = React.memo(_ConversationImage);
