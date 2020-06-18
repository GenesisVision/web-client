import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import TagItem from "components/tags/tag-item/tag-item";
import TagItemWrapperTooltip from "components/tags/tag-item/tag-item-with-tooltip";
import { Tag } from "gv-api-web";
import * as React from "react";

const _DetailsTags: React.FC<{
  tags: Tag[];
}> = ({ tags }) => (
  <Row wrap>
    {tags.map((tag, idx) => (
      <RowItem small key={idx}>
        <TagItemWrapperTooltip name={tag.name}>
          <TagItem name={tag.name} color={tag.color} />
        </TagItemWrapperTooltip>
      </RowItem>
    ))}
  </Row>
);

export const DetailsTags = React.memo(_DetailsTags);
