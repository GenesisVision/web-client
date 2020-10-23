import { Center } from "components/center/center";
import Popover, { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { PopoverContent } from "components/popover/popover-content";
import { RowItem } from "components/row-item/row-item";
import {
  SelectContainer,
  SelectIcon,
  SelectText,
  SelectValue
} from "components/select/select.styles";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { Sizeable } from "utils/types";

import SelectItem from "./select-item";

export interface ISelectChangeEvent {
  target: { value: string; name: string };
}

interface ChildOwnProps {
  value: string;
  key: string;
  children: string;
}

interface SelectChild extends React.ReactElement<ChildOwnProps> {}

interface Props extends Sizeable {
  fixedWidth?: boolean;
  bottomLine?: boolean;
  fixedVertical?: boolean;
  className?: string;
  value: string;
  name: string;
  fullWidthPopover?: boolean;
  disabled?: boolean;
  disableIfSingle?: boolean;
  children: SelectChild[];
  onChange: (event: ISelectChangeEvent, child: JSX.Element) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}

const Select: React.FC<Props> = ({
  fixedWidth = true,
  bottomLine,
  size = "middle",
  fixedVertical,
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
    [isDisabled, onBlur]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>): void => {
      if (onFocus && !isDisabled) {
        onFocus(event);
      }
    },
    [isDisabled, onFocus]
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
        isSelected={isSelected}
        onClick={handleChildClick(child)}
        {...child.props}
        key={child.props.value}
        name={name}
      >
        {child.props.children}
      </SelectItem>
    );
  });

  return (
    <SelectContainer className={className} fixedWidth={fixedWidth}>
      <SelectValue
        size={size}
        bottomLine={bottomLine}
        name={name}
        onClick={handleClick}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={input}
        type="button"
      >
        <Center>
          {displayValue && (
            <RowItem size={"small"}>
              <SelectText size={size}>{displayValue}</SelectText>
            </RowItem>
          )}
          <SelectIcon>
            {!isDisabled && <FilterArrowIcon isOpen={Boolean(anchor)} />}
          </SelectIcon>
        </Center>
      </SelectValue>
      <input type="hidden" value={value} name={name} />
      <Popover
        fixedVertical={fixedVertical}
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        noPadding
        anchorEl={anchor}
        onClose={clearAnchor}
      >
        <PopoverContent leftAlign type={"list"}>
          {items}
        </PopoverContent>
      </Popover>
    </SelectContainer>
  );
};

export default Select;
