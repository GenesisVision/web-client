import "./tag-program.scss";

import { ProgramTag } from "gv-api-web";
import { GVButton } from "gv-react-components";
import React from "react";

import { CloseIcon } from "../icon/close-icon";

export interface IProgramTag {
  removeBtn?: boolean;
}

const TagProgramItem: React.FC<ProgramTag & IProgramTag> = ({
  color,
  name,
  removeBtn
}) => {
  const styleTag = { color, backgroundColor: `${color}1a` };
  return (
    <div className="tag-program tag-button" style={styleTag}>
      {removeBtn && (
        <GVButton
          variant="text"
          color="secondary"
          className="tag-program__button-remove"
          // onClick={onRemove}
        >
          <CloseIcon />
        </GVButton>
      )}
      {name}
    </div>
  );
};

export default TagProgramItem;
