import classnames from "classnames";
import { GVButton } from "gv-react-components";
import * as React from "react";

export interface ITagFilterButton {
  isActive: boolean;
  onClickHandle?(name: string): void;
}

const TagFilterButton: React.FC<ITagFilterButton> = ({
  isActive,
  onClickHandle
}) => {
  return (
    <GVButton
      variant="text"
      color="secondary"
      className={classnames("tag-filter__button tag-button", {
        "tag-filter__button--active": isActive
      })}
      onClick={onClickHandle}
    >
      <span className="tag-filter__button-plus">+</span>Tag
    </GVButton>
  );
};

export default TagFilterButton;
