import TagItemWrapperTooltip from "components/tags/tag-item/tag-item-with-tooltip";
import { Tag } from "gv-api-web";
import React from "react";

import TagItem from "./tag-item";
import styles from "./tag-item.module.scss";

const _TagItemList: React.FC<Props> = ({ tags }) => {
  return (
    <div className={styles["tag-item-list"]}>
      {tags.map((tag, idx) => (
        <TagItemWrapperTooltip name={tag.name} key={idx}>
          <TagItem name={tag.name} color={tag.color} />
        </TagItemWrapperTooltip>
      ))}
    </div>
  );
};

interface Props {
  tags: Tag[];
}
const TagItemList = React.memo(_TagItemList);
export default TagItemList;
