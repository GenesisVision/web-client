import "./surface.scss";

import classnames from "classnames";
import * as React from "react";

const Surface: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={classnames("surface", className)} {...props}>
      {children}
    </div>
  );
};

export default Surface;
