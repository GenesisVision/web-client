import { $paddingSmall } from "components/gv-styles/gv-sizes";
import { Row } from "components/row/row";
import { withStyles } from "decorators/withStyles";
import React from "react";

const staticStyles = {
  "margin-right": `${$paddingSmall / 2}px`
};

const HeaderIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children
}) => <Row className={className}>{children}</Row>;

export default withStyles({ staticStyles })(HeaderIcon);
