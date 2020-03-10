import "./post-input.scss";

import React from "react";

const _PostInput: React.FC<Props> = ({}) => {
  return (
    <div>
      <input className="post-input" type="text" />
    </div>
  );
};

interface Props {}

export const PostInput = React.memo(_PostInput);
