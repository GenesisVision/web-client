import { Tag } from "gv-api-web";
import React from "react";

import TagItem from "./tag-item";

const _TagItemList: React.FC<Props> = ({ tags }) => {
  return (
    <div className="tag-item-list">
      {tags.map((tag, idx) => (
        <TagItem name={tag.name} color={tag.color} key={idx} />
      ))}
    </div>
  );
};

interface Props {
  tags: Tag[];
}
const TagItemList = React.memo(_TagItemList);
export default TagItemList;
