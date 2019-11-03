import "./details-description.scss";

import { ProgramTag } from "gv-api-web";
import * as React from "react";
import TagItem from "shared/components/tags/tag-item/tag-item";

const _DetailsTags: React.FC<{
  tags: ProgramTag[];
}> = ({ tags }) => {
  return (
    <div className="asset-details-description__tag">
      {tags.map((tag, idx) => (
        <TagItem name={tag.name} color={tag.color} key={idx} />
      ))}
    </div>
  );
};

export const DetailsTags = React.memo(_DetailsTags);
