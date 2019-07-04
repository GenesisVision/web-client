import { ProgramTag } from "gv-api-web";
import * as React from "react";

import TagItem from "./tag-item";

interface Props {
  tags: ProgramTag[];
}

const _TagItemTooltip: React.FC<Props> = ({ tags }) => {
  return (
    <div className="tag-item-tooltip">
      {tags.map(
        (tag, idx) =>
          idx > 0 && <TagItem name={tag.name} color={tag.color} key={idx} />
      )}
    </div>
  );
};

const TagItemTooltip = React.memo(_TagItemTooltip);
export default TagItemTooltip;
