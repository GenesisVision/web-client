import classNames from "classnames";
import * as React from "react";
import GVButton from "shared/components/gv-button";

export interface ITagFilterButton {
  isActive: boolean;
  onClickHandle?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const TagFilterButton: React.FC<ITagFilterButton> = ({
  isActive,
  onClickHandle
}) => {
  return (
    <GVButton
      variant="text"
      color="secondary"
      className={classNames("tag-filter__button tag-button", {
        "tag-filter__button--active": isActive
      })}
      onClick={onClickHandle as () => void}
    >
      <>
        <span className="tag-filter__button-plus">+</span>Tag
      </>
    </GVButton>
  );
};

export default React.memo(TagFilterButton);
