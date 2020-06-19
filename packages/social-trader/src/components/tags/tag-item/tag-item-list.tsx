import TagItemWithTooltip from "components/tags/tag-item/tag-item-with-tooltip";
import { Tag } from "gv-api-web";
import React from "react";

import styles from "./tag-item.module.scss";

const _TagItemList: React.FC<Props> = ({ tags }) => {
  return (
    <div className={styles["tag-item-list"]}>
      {tags.map((tag, idx) => (
        <TagItemWithTooltip name={tag.name} color={tag.color} key={idx} />
      ))}
    </div>
  );
};

interface Props {
  tags: Tag[];
}
const TagItemList = React.memo(_TagItemList);
export default TagItemList;
