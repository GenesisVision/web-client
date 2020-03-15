import { Tag } from "gv-api-web";
import * as React from "react";

import TagBubble from "./tag-bubble";

const _TagItem: React.FC<Props> = ({ color, name, clickable }) => (
  <TagBubble color={color} content={name} clickable={clickable} />
);

interface Props extends Tag {
  clickable?: boolean;
}

const TagItem = React.memo(_TagItem);
export default TagItem;
