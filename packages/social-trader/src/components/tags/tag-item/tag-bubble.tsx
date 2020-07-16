import clsx from "clsx";
import * as React from "react";

import styles from "./tag-item.module.scss";

const _TagBubble: React.FC<Props> = ({ color, content, clickable }) => {
  const styleTag = { color, backgroundColor: `${color}1a` };
  return (
    <div
      className={clsx(styles["tag-item"], styles["tag-button"], {
        [styles["tag-button--clickable"]]: clickable
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
