import classNames from "classnames";
import * as React from "react";
import GVButton from "shared/components/gv-button";

const _TileFilterButton: React.FC<ITagFilterButton> = ({
  title,
  isActive,
  onClick
}) => {
  return (
    <GVButton
      variant="text"
      color="secondary"
      className={classNames("tag-filter__button tag-button", {
        "tag-filter__button--active": isActive
      })}
      onClick={onClick}
    >
      <>
        <span className="tag-filter__button-plus">+</span>
        {title}
      </>
    </GVButton>
  );
};

const TileFilterButton = React.memo(_TileFilterButton);
export default TileFilterButton;

export interface ITagFilterButton {
  title: string;
  isActive: boolean;
  onClick(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
