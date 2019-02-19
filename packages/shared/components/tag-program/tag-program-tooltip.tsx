import { ProgramTag } from "gv-api-web";
import * as React from "react";

import TagProgramItem from "./tag-program-item";

interface ITagProgramTooltip {
  tags: ProgramTag[];
}

const TagProgramTooltip: React.FC<ITagProgramTooltip> = ({ tags }) => {
  return (
    <div className="tag-program-tooltip">
      {tags.map(
        (tag, idx) =>
          idx > 0 && (
            <TagProgramItem name={tag.name} color={tag.color} key={idx} />
          )
      )}
    </div>
  );
};

export default TagProgramTooltip;
