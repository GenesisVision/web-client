import { ProgramTag } from "gv-api-web";
import * as React from "react";

import TagItem from "./tag-item";
import classnames from "classnames";

interface Props {
  tags: ProgramTag[];
  color?: string;
  className?: string;
}

const _TagItemTooltip: React.FC<Props> = ({ tags, color, className }) => {
  return (
    <div className={classnames("tag-item-tooltip", className)}>
      {tags.map(
        (tag, idx) =>
          idx > 0 && (
            <TagItem
              name={tag.name}
              color={color ? color : tag.color}
              key={idx}
            />
          )
      )}
    </div>
  );
};

const TagItemTooltip = React.memo(_TagItemTooltip);
export default TagItemTooltip;
