import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Tooltip from "components/tooltip/tooltip";
import { Tag } from "gv-api-web";
import * as React from "react";

import TagItem from "../tag-item/tag-item";
import TagItemTooltip from "../tag-item/tag-item-tooltip";

const MAX_VISIBLE_TAGS = 2;

const TagProgramContainer: React.FC<Props> = React.memo(({ tags }) => {
  const length = tags.length;
  const remainder = length > MAX_VISIBLE_TAGS ? `${length - 1}` : null;
  return (
    <Row small>
      {tags.map(
        (tag, idx) =>
          ((remainder && idx === 0) || !remainder) && (
            <RowItem small>
              <TagItem name={tag.name} color={tag.color} key={idx} />
            </RowItem>
          )
      )}
      {remainder && (
        <RowItem>
          <Tooltip render={() => <TagItemTooltip tags={tags} />}>
            <div className="tag-item tag-button tag-button--remainder">
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
