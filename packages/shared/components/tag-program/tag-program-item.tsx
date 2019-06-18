import "./tag-program.scss";

import { ProgramTag } from "gv-api-web";
import * as React from "react";

const TagProgramItem: React.FC<ProgramTag> = ({ color, name }) => {
  const styleTag = { color, backgroundColor: `${color}1a` };
  return (
    <div className="tag-program tag-button" style={styleTag}>
      {name}
    </div>
  );
};

export default React.memo(TagProgramItem);
