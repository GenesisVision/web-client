import "./details-description-control.scss";

import classnames from "classnames";
import { ToType } from "components/link/link";
import React from "react";

interface IDetailsDescriptionControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
  onClick?(): void;
  to?: ToType;
  tag: React.ComponentType<any> | string;
}
const DetailsDescriptionControl: React.FC<IDetailsDescriptionControlProps> = ({
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
