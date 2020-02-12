import "./select.scss";

import classNames from "classnames";
import Popover, { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { PopoverContent } from "components/popover/popover-content";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";

import SelectItem from "./select-item";

const Select: React.FC<Props> = ({
  className,
  name,
  onBlur,
  onFocus,
  onChange,
  value,
  children,
  disabled,
  disableIfSingle
}) => {
  const isDisabled = (disableIfSingle && children.length === 1) || disabled;
  const { anchor, setAnchor, clearAnchor } = useAnchor();

  const input = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (value !== undefined) return;
    const child = children[0];
    if (child && children.length === 1) {
      const event: ISelectChangeEvent = {
        target: { value: child.props.value, name }
      };
      onChange(event, child);
    }
  }, [value, children, name, onChange]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      event.preventDefault();
      if (isDisabled) return;
      input.current && input.current.focus();
      setAnchor(event);
    },
    [isDisabled, input.current]
  );

  const handleChildClick = useCallback(
    (child: SelectChild) => ({
      event,
      isSelected
    }: {
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
      isSelected: boolean;
    }): void => {
      const { value } = child.props;
      if (!isSelected) {
        event.persist();
        const ChangeEvent: ISelectChangeEvent = {
          target: { value, name }
        };
        if (onChange) {
          onChange(ChangeEvent, child);
        }
      }

      clearAnchor();
      input.current && input.current.focus();
    },
    [input.current, onChange]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>): void => {
      if (onBlur && !isDisabled) {
        onBlur(event);
      }
    },
    [isDisabled]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>): void => {
      if (onFocus && !isDisabled) {
        onFocus(event);
      }
    },
    [isDisabled]
  );

  let displayValue = value;

  const items = children.map(child => {
    const isSelected =
      value !== undefined &&
      child.props.value.toString().toLowerCase() ===
        value.toString().toLowerCase();
    if (isSelected) displayValue = child.props.children;
    return (
      <SelectItem
        key={child.props.value}
        isSelected={isSelected}
        onClick={handleChildClick(child)}
        {...child.props}
        name={name}
      >
        {child.props.children}
      </SelectItem>
    );
  });

  return (
    <div
      className={classNames("select", className, {
        "select--disabled": isDisabled
      })}
    >
      <button
        name={name}
        onClick={handleClick}
        className="select__value"
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={input}
        type="button"
      >
        {displayValue && <span className="select__text">{displayValue}</span>}
        <span className="select__icon">
          {!isDisabled && <FilterArrowIcon isOpen={Boolean(anchor)} />}
        </span>
      </button>
      <input type="hidden" value={value} name={name} />
      <Popover
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        noPadding
        anchorEl={anchor}
        onClose={clearAnchor}
      >
        <PopoverContent leftAlign type={"list"}>
          {items}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export interface ISelectChangeEvent {
  target: { value: string; name: string };
}

interface ChildOwnProps {
  value: string;
  key: string;
  children: string;
}

interface SelectChild extends React.ReactElement<ChildOwnProps> {}

interface Props {
  value: string;
  name: string;
  className?: string;
  fullWidthPopover?: boolean;
  disabled?: boolean;
  disableIfSingle?: boolean;
  children: SelectChild[];
  onChange(event: ISelectChangeEvent, child: JSX.Element): void;
  onFocus?(event: React.FocusEvent<HTMLButtonElement>): void;
  onBlur?(event: React.FocusEvent<HTMLButtonElement>): void;
}

export default Select;
