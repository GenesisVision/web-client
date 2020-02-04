import "./gv-datepicker.scss";

import * as React from "react";
import { RefObject } from "react";
import { formatDate } from "utils/dates";

class GVDatePicker extends React.PureComponent<Props, State> {
  state: State = {
    anchorEl: undefined
  };

  input: RefObject<HTMLButtonElement> = React.createRef();

  handleChange = (date: Date | Date[]) => {
    if (this.props.onChange) {
      const newDate = Array.isArray(date) ? date[0] : date;
      this.props.onChange({
        persist: () => {},
        target: {
          value: newDate && formatDate(newDate),
          name: this.props.name
        }
      });
      this.handleClose();
    }
  };

  handleBlur = (): void => {
    const { disabled, onBlur, name } = this.props;
    if (disabled || this.state.anchorEl) return;
    if (onBlur) {
      onBlur({
        target: {
          name
        }
      });
    }
  };

  handleOpen = (anchorEl: EventTarget) => {
    this.setState({ anchorEl });
  };

  handleClose = (): void => {
    this.setState({ anchorEl: undefined }, this.handleBlur);
  };

  handleFocus = (
    event:
      | React.FocusEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const { disabled, onFocus } = this.props;
    if (disabled) return;
    if (onFocus) {
      onFocus(event);
    }
  };

  handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    this.handleOpen(event.target);
    this.handleFocus(event);
  };

  render() {
    const {
      value,
      minDate,
      maxDate,
      name,
      disabled,
      className,
      onChange
    } = this.props;
    return (
      <div className="gv-datepicker">
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          className={className}
        />
      </div>
    );
  }
}

export default GVDatePicker;

interface Props {
  value?: string;
  onChange(event: {
    persist(): void;
    target: {
      value: string;
      name: string;
    };
  }): void;
  minDate?: string;
  maxDate?: string;
  disabled: boolean;
  onFocus(
    event:
      | React.FocusEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void;
  onBlur(target: {
    target: {
      name: string;
    };
  }): void;
  name: string;
  lng: string;
  className?: string;
}

interface State {
  anchorEl?: EventTarget;
}
