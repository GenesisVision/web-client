import "./blur-container.scss";

import classNames from "classnames";
import React from "react";

const _BlurContainer: React.FC<Props> = ({ children, blur, className }) => (
  <div
    className={classNames("blur-container", className)}
    style={{
      filter: `blur(${blur ? 7 : 0}px)`
    }}
  >
    {children}
  </div>
);

interface Props {
  className?: string;
  blur: boolean;
}

export const BlurContainer = React.memo(_BlurContainer);
