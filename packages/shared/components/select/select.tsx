import "./select.scss";

import classNames from "classnames";
import * as React from "react";
import { RefObject } from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";
import GVScroll from "shared/components/scroll/gvscroll";
import FilterArrowIcon from "shared/components/table/components/filtering/filter-arrow-icon";
import { Nullable } from "shared/utils/types";

import SelectItem from "./select-item";

export interface OnChangeEvent {
  target: { value: string; name: string };
}

interface ChildOwnProps {
  value: string;
  key: string;
  children: string;
}

interface SelectChild extends React.ReactElement<ChildOwnProps> {}

interface ISelectProps {
  value: string;
  onChange(event: OnChangeEvent, child: JSX.Element): void;
  name: string;
  className?: string;
  fullWidthPopover?: boolean;
  onFocus?(event: React.FocusEvent<HTMLButtonElement>): void;
  onBlur?(event: React.FocusEvent<HTMLButtonElement>): void;
  disabled?: boolean;
  children: SelectChild[];
}
interface ISelectState {
  anchor: Nullable<EventTarget>;
}

class Select extends React.Component<ISelectProps, ISelectState> {
  state = {
    anchor: null
  };

  input: RefObject<HTMLButtonElement> = React.createRef();

  componentDidMount() {
    this.setDefaultValue();
  }

  componentDidUpdate() {
    this.setDefaultValue();
  }
  handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    if (this.props.disabled) return;
    this.input.current && this.input.current.focus();
    this.setState({ anchor: event.currentTarget });
  };

  handleChildClick = (child: SelectChild) => ({
    event,
    isSelected
  }: {
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    isSelected: boolean;
  }): void => {
    const { onChange, name } = this.props;
    const { value } = child.props;
    if (!isSelected) {
      event.persist();
      const ChangeEvent: OnChangeEvent = {
        target: { value, name }
      };
      if (onChange) {
        onChange(ChangeEvent, child);
      }
    }

    this.handleClose();
  };

  handleBlur = (event: React.FocusEvent<HTMLButtonElement>): void => {
    const { disabled, onBlur } = this.props;
    if (disabled) return;
    if (onBlur) {
      onBlur(event);
    }
  };

  handleFocus = (event: React.FocusEvent<HTMLButtonElement>): void => {
    const { disabled, onFocus } = this.props;
    if (disabled) return;
    if (onFocus) {
      onFocus(event);
    }
  };

  handleClose = (): void => {
    this.setState({ anchor: null });
  };

  setDefaultValue(): void {
    const { name, onChange, value } = this.props;
    if (value && value.length) return;
    const children = this.props.children;
    const child = children[0];
    if (child && children.length === 1) {
      const event: OnChangeEvent = {
        target: { value: child.props.value, name }
      };
      onChange(event, child);
    }
  }

  render() {
    let displayValue = this.props.value;

    const items = this.props.children.map(child => {
      const isSelected =
        child.props.value.toString().toLowerCase() ===
        this.props.value.toString().toLowerCase();
      if (isSelected) displayValue = child.props.children;
      const { name } = this.props;
      return (
        <SelectItem
          key={child.props.value}
          isSelected={isSelected}
          onClick={this.handleChildClick(child)}
          {...child.props}
          name={name}
        >
          {child.props.children}
        </SelectItem>
      );
    });
    return (
      <div
        className={classNames("select", this.props.className, {
          "select--disabled": this.props.disabled
        })}
      >
        <button
          name={this.props.name}
          onClick={this.handleClick}
          className="select__value"
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          ref={this.input}
        >
          {displayValue && <span className="select__text">{displayValue}</span>}
          <span className="select__icon">
            <FilterArrowIcon isOpen={Boolean(this.state.anchor)} />
          </span>
        </button>

        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.LEFT}
          noPadding
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
        >
          <GVScroll autoHeight autoHeightMax="300px">
            <div className="select__options">{items}</div>
          </GVScroll>
        </Popover>
      </div>
    );
  }
}

export default Select;
