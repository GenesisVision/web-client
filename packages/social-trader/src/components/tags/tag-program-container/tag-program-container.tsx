import clsx from "clsx";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import TagItemWithTooltip from "components/tags/tag-item/tag-item-with-tooltip";
import Tooltip from "components/tooltip/tooltip";
import { Tag } from "gv-api-web";
import * as React from "react";

import TagItemTooltip from "../tag-item/tag-item-tooltip";
import styles from "../tag-item/tag-item.module.scss";

const MAX_VISIBLE_TAGS = 2;

const TagProgramContainer: React.FC<Props> = React.memo(({ tags }) => {
  const length = tags.length;
  const remainder = length > MAX_VISIBLE_TAGS ? `${length - 1}` : null;
  return (
    <Row size={"small"}>
      {tags.map(
        (tag, idx) =>
          ((remainder && idx === 0) || !remainder) && (
            <RowItem size={"small"} key={idx}>
              <TagItemWithTooltip name={tag.name} color={tag.color} />
            </RowItem>
          )
      )}
      {remainder && (
        <RowItem>
          <Tooltip render={() => <TagItemTooltip tags={tags} />}>
            <div
              className={clsx(
                styles["tag-item"],
                styles["tag-button"],
                styles["tag-button--remainder"]
              )}
            >
              + {remainder}
            </div>
          </Tooltip>
        </RowItem>
      )}
    </Row>
  );
});

interface Props {
  tags: Tag[];
}

export default TagProgramContainer;
