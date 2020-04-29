import "./details-description-control.scss";

import classNames from "classnames";
import Link, { ToType } from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

interface IDetailsDescriptionControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
  onClick?(): void;
  to?: ToType;
}
const DetailsDescriptionControl: React.FC<IDetailsDescriptionControlProps> = ({
  children,
  text,
  className,
  onClick,
  to
}) => {
  return (
    <Link
      className={classNames("details-description-control--button", className)}
      onClick={onClick}
      to={to}
    >
      <Row className="details-description-control">
        <RowItem className="details-description-control__text">{text}</RowItem>
        {children}
      </Row>
    </Link>
  );
};

export default DetailsDescriptionControl;
