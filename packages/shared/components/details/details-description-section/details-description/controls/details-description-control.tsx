import "./details-description-control.scss";

import classnames from "classnames";
import React from "react";
import { ToType } from "shared/components/link/link";

interface IDetailsDescriptionControlProps {
  text: string;
  className?: string;
  onClick?(): void;
  to?: ToType;
  disabled?: boolean;
  tag: React.ComponentType<any> | string;
}
const DetailsDescriptionControl: React.SFC<IDetailsDescriptionControlProps> = ({
  children,
  text,
  tag: Tag,
  className,
  onClick,
  to
}) => {
  return (
    <Tag
      className={classnames("details-description-control", className)}
      onClick={onClick}
      to={to}
    >
      <div className="details-description-control__text">{text}</div>
      {children}
    </Tag>
  );
};

export default DetailsDescriptionControl;
