import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import TagItemWithTooltip from "components/tags/tag-item/tag-item-with-tooltip";
import { Tag } from "gv-api-web";
import * as React from "react";

const _DetailsTags: React.FC<{
  tags: Tag[];
}> = ({ tags }) => (
  <Row wrap>
    {tags.map((tag, idx) => (
      <RowItem small key={idx}>
        <TagItemWithTooltip name={tag.name} color={tag.color} />
      </RowItem>
    ))}
  </Row>
);

export const DetailsTags = React.memo(_DetailsTags);
