import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import TagBubble from "components/tags/tag-item/tag-bubble";
import TagItemWithTooltip from "components/tags/tag-item/tag-item-with-tooltip";
import Tooltip from "components/tooltip/tooltip";
import { Tag } from "gv-api-web";
import * as React from "react";
import { $positiveColor } from "utils/style/colors";

import TagItemTooltip from "../tag-item/tag-item-tooltip";

const MAX_VISIBLE_TAGS = 2;

const Remainder: React.FC = ({ children }) => (
  <TagBubble color={$positiveColor}>+ {children}</TagBubble>
);

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
            <div>
              <Remainder>{remainder}</Remainder>
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
