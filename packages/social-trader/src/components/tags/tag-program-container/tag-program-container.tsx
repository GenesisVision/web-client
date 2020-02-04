import "./tag-program-container.scss";

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
    <div className="tag-program-container">
      {tags.map(
        (tag, idx) =>
          ((remainder && idx === 0) || !remainder) && (
            <TagItem name={tag.name} color={tag.color} key={idx} />
          )
      )}
      {remainder && (
        <Tooltip render={() => <TagItemTooltip tags={tags} />}>
          <div className="tag-program-container__others">
            <div className="tag-button tag-button--remainder">
              + {remainder}
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  );
});

interface Props {
  tags: Tag[];
}

export default TagProgramContainer;
