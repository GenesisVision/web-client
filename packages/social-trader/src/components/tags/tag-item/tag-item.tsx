import "./tag-item.scss";

import { Tag } from "gv-api-web";
import * as React from "react";

import TagBubble from "./tag-bubble";

const _TagItem: React.FC<Tag> = ({ color, name }) => (
  <TagBubble color={color} content={name} />
);

const TagItem = React.memo(_TagItem);
export default TagItem;
