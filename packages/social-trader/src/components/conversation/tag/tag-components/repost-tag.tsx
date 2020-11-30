import { Message } from "components/conversation/message/message";
import { RepostTagContainer } from "components/conversation/tag/repost-tag-container";
import React from "react";

import { IRepostTagProps } from "./tag-components.types";

const _RepostTagComponent: React.FC<IRepostTagProps> = ({
  post: { url, tags, images, date, text, author }
}) => {
  return (
    <RepostTagContainer>
      <Message
        row={false}
        tags={tags}
        url={url}
        images={images}
        date={date}
        text={text}
        author={author}
      />
    </RepostTagContainer>
  );
};
export const RepostTagComponent = React.memo(_RepostTagComponent);
