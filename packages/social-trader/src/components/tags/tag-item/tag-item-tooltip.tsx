import clsx from "clsx";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { Tag } from "gv-api-web";
import * as React from "react";

import TagItem from "./tag-item";
import styles from "./tag-item.module.scss";

interface Props {
  tags: Tag[];
  className?: string;
}

const _TagItemTooltip: React.FC<Props> = ({ tags, className }) => {
  return (
    <TooltipContent>
      <Row wrap className={clsx(styles["tag-item-tooltip"], className)}>
        {tags
          .filter((tag, idx) => idx > 0)
          .map((tag, idx) => (
            <RowItem size={"small"}>
              <TagItem name={tag.name} color={tag.color} key={idx} />
            </RowItem>
          ))}
      </Row>
    </TooltipContent>
  );
};

const TagItemTooltip = React.memo(_TagItemTooltip);
export default TagItemTooltip;
