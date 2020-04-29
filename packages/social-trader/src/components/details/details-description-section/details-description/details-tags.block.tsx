import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import TagItem from "components/tags/tag-item/tag-item";
import { Tag } from "gv-api-web";
import * as React from "react";

const _DetailsTags: React.FC<{
  tags: Tag[];
}> = ({ tags }) => {
  return (
    <Row wrap>
      {tags.map((tag, idx) => (
        <RowItem small key={idx}>
          <TagItem name={tag.name} color={tag.color} />
        </RowItem>
      ))}
    </Row>
  );
};

export const DetailsTags = React.memo(_DetailsTags);
