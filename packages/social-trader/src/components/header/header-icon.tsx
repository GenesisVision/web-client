import { Row } from "components/row/row";
import React from "react";

const HeaderIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <Row className="header__icon">{children}</Row>;

export default HeaderIcon;
