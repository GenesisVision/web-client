import "./tag-item.scss";

import classNames from "classnames";
import * as React from "react";

const _TagBubble: React.FC<Props> = ({ color, content, clickable }) => {
  const styleTag = { color, backgroundColor: `${color}1a` };
  return (
    <div
      className={classNames("tag-item tag-button", {
        "tag-button--clickable": clickable
      })}
      style={styleTag}
    >
      {content}
    </div>
  );
};

interface Props {
  clickable?: boolean;
  color: string;
  content: JSX.Element | string;
}

const TagBubble = React.memo(_TagBubble);
export default TagBubble;
