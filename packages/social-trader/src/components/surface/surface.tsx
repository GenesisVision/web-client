import "./surface.scss";

import classNames from "classnames";
import * as React from "react";

export const _Surface: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={classNames("surface", className)} {...props}>
      {children}
    </div>
  );
};

const Surface = React.memo(_Surface);
export default Surface;
