import { Tag } from "gv-api-web";
import * as React from "react";

import TagBubble from "./tag-bubble";

const _TagItem: React.FC<TagItemProps> = ({ color, name, clickable }) => (
  <TagBubble color={color} content={name} clickable={clickable} />
);

export interface TagItemProps extends Tag {
  clickable?: boolean;
}

const TagItem = React.memo(_TagItem);
export default TagItem;
