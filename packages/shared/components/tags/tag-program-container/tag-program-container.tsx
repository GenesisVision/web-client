import "./tag-program-container.scss";

import { ProgramTag } from "gv-api-web";
import * as React from "react";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_VARIANT } from "shared/components/profitability/profitability.helper";
import Tooltip from "shared/components/tooltip/tooltip";

import TagItem from "../tag-item/tag-item";
import TagItemTooltip from "../tag-item/tag-item-tooltip";

const MAX_VISIBLE_TAGS = 2;

const TagProgramContainer: React.FC<Props> = React.memo(({ tags }) => {
  const length = tags.length;
  const reminder = length > MAX_VISIBLE_TAGS ? `${length - 1}` : null;
  return (
    <div className="tag-program-container">
      {tags.map(
        (tag, idx) =>
          ((reminder && idx === 0) || !reminder) && (
            <TagItem name={tag.name} color={tag.color} key={idx} />
          )
      )}
      {reminder && (
        <Tooltip render={() => <TagItemTooltip tags={tags} />}>
          <div className="tag-program-container__others">
            <Profitability
              className="tag-button"
              value={reminder}
              variant={PROFITABILITY_VARIANT.CHIPS}
            >
              + {reminder}
            </Profitability>
          </div>
        </Tooltip>
      )}
    </div>
  );
});

interface Props {
  tags: ProgramTag[];
}

export default TagProgramContainer;
