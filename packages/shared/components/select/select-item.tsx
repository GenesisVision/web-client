import classNames from "classnames";
import React, { useCallback } from "react";
import GVButton from "shared/components/gv-button";

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
        className={classNames("select__option", className, {
          "select__option--selected": isSelected
        })}
        // @ts-ignore
        onClick={handleClick} // TODO fix GVButton type
        name={name}
      >
        {children}
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
