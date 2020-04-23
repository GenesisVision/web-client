import classNames from "classnames";
import React from "react";
import { TagType } from "utils/types";

import "./blur-container.scss";

const _BlurContainer: React.FC<Props> = ({
  children,
  blur,
  className,
  tag: Tag = "div"
}) => (
  <Tag
    className={classNames("blur-container", className, {
      "blur-container--loading": blur,
      "blur-container--loaded": !blur
    })}
    style={{
      filter: `blur(${blur ? 7 : 0}px)`
    }}
  >
    {children}
  </Tag>
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tag?: TagType;
  className?: string;
  blur: boolean;
}

export const BlurContainer = React.memo<React.FunctionComponent<Props>>(
  _BlurContainer
);
