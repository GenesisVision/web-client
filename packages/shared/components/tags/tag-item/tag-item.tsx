import "./tag-item.scss";

import { ProgramTag } from "gv-api-web";
import * as React from "react";

const _TagItem: React.FC<ProgramTag> = ({ color, name }) => {
  const styleTag = { color, backgroundColor: `${color}1a` };
  return (
    <div className="tag-item tag-button" style={styleTag}>
      {name}
    </div>
  );
};

const TagItem = React.memo(_TagItem);
export default TagItem;
