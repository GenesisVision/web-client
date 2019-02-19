import "./surface.scss";

import classnames from "classnames";
import React from "react";

interface ISurfaceProps {
  className?: string;
}

const Surface: React.FunctionComponent<ISurfaceProps> = ({
  className,
  children
}) => {
  return <div className={classnames("surface", className)}>{children}</div>;
};

export default Surface;
