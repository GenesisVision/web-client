import "./blur-container.scss";

import classNames from "classnames";
import React from "react";

const _BlurContainer: React.FC<Props> = ({
  children,
  blur,
  show,
  className
}) => (
  <div
    className={classNames("blur-container", className)}
    style={{
      position: show ? "relative" : "absolute",
      opacity: show ? 1 : 0,
      filter: `blur(${blur ? 5 : 0}px)`
    }}
  >
    {children}
  </div>
);

interface Props {
  className?: string;
  blur: boolean;
  show: boolean;
  loader?: boolean;
}

const BlurContainer = React.memo(_BlurContainer);
export default BlurContainer;

const _BlurContainer_: React.FC<Props_> = ({
                                           children,
                                           blur,
                                           className
                                         }) => (
  <div
    className={classNames("blur-container", className)}
    style={{
      filter: `blur(${blur ? 5 : 0}px)`
    }}
  >
    {children}
  </div>
);

interface Props_ {
  className?: string;
  blur: boolean;
}

export const BlurContainer_ = React.memo(_BlurContainer_);
