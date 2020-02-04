import "./tag-item.scss";

import * as React from "react";

const _TagBubble: React.FC<Props> = ({ color, content }) => {
  const styleTag = { color, backgroundColor: `${color}1a` };
  return (
    <div className="tag-item tag-button" style={styleTag}>
      {content}
    </div>
  );
};

interface Props {
  color: string;
  content: JSX.Element | string;
}

const TagBubble = React.memo(_TagBubble);
export default TagBubble;
