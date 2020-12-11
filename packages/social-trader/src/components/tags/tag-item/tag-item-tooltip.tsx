import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { Tag } from "gv-api-web";
import * as React from "react";
import styled from "styled-components";
import { $paddingXxsmall } from "utils/style/sizes";

import TagItem from "./tag-item";

interface Props {
  tags: Tag[];
}

const Container = styled(Row)`
  padding: ${$paddingXxsmall / 2}px 0;
`;

const _TagItemTooltip: React.FC<Props> = ({ tags }) => {
  return (
    <TooltipContent>
      <Container wrap>
        {tags
          .filter((tag, idx) => idx > 0)
          .map((tag, idx) => (
            <RowItem size={"small"}>
              <TagItem name={tag.name} color={tag.color} key={idx} />
            </RowItem>
          ))}
      </Container>
    </TooltipContent>
  );
};

const TagItemTooltip = React.memo(_TagItemTooltip);
export default TagItemTooltip;
