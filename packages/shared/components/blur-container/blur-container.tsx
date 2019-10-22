import "./blur-container.scss";

import classNames from "classnames";
import React from "react";
import { TagType } from "shared/utils/types";

const _BlurContainer: React.FC<Props> = ({
  children,
  blur,
  className,
  tag: Tag = "div"
}) => (
  <Tag
    className={classNames("blur-container", className)}
    style={{
      filter: `blur(${blur ? 5 : 0}px)`
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

export const BlurContainer = React.memo(_BlurContainer);
