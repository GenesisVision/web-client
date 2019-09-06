import classNames from "classnames";
import { ProgramTag } from "gv-api-web";
import * as React from "react";

import TagItem from "./tag-item";

interface Props {
  tags: ProgramTag[];
  className?: string;
}

const _TagItemTooltip: React.FC<Props> = ({ tags, className }) => {
  return (
    <div className={classNames("tag-item-tooltip", className)}>
      {tags
        .filter((tag, idx) => idx > 0)
        .map((tag, idx) => (
          <TagItem name={tag.name} color={tag.color} key={idx} />
        ))}
    </div>
  );
};

const TagItemTooltip = React.memo(_TagItemTooltip);
export default TagItemTooltip;
