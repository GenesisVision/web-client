import classNames from "classnames";
import GVButton from "components/gv-button";
import { PopoverContentListItem } from "components/popover/popover-content";
import React, { useCallback } from "react";

const SelectItem: React.FC<Props> = React.memo(
  ({ isSelected, className, children, name, onClick }) => {
    const handleClick = useCallback(
      (event: SelectItemClick) => onClick({ event, isSelected }),
      [onClick, isSelected]
    );
    return (
      <GVButton
        variant="text"
        color="secondary"
        noPadding
        className={classNames("select__option", className, {
          "select__option--selected": isSelected
        })}
        onClick={handleClick}
        name={name}
      >
        <PopoverContentListItem>{children}</PopoverContentListItem>
      </GVButton>
    );
  }
);

export default SelectItem;

interface Props {
  value: string;
  isSelected: boolean;
  name?: string;
  className?: string;
  onClick(props: { event: SelectItemClick; isSelected: boolean }): void;
  children: string;
}

interface SelectItemClick
  extends React.MouseEvent<HTMLButtonElement, MouseEvent> {}
