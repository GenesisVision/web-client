import clsx from "clsx";
import { Button } from "components/button/button";
import { PopoverContentListItem } from "components/popover/popover-content";
import React, { useCallback } from "react";

import styles from "./select.module.scss";

export const getSelectItemSelector = (value: string) => `select-item-${value}`;

const SelectItem: React.FC<Props> = React.memo(
  ({ isSelected, className, children, name, onClick, value }) => {
    const handleClick = useCallback(
      (event: SelectItemClick) => onClick({ event, isSelected }),
      [onClick, isSelected]
    );
    return (
      <Button
        testId={getSelectItemSelector(value)}
        variant="text"
        color="secondary"
        noPadding
        className={clsx(styles["select__option"], className, {
          [styles["select__option--selected"]]: isSelected
        })}
        onClick={handleClick}
        name={name}
      >
        <PopoverContentListItem>{children}</PopoverContentListItem>
      </Button>
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
