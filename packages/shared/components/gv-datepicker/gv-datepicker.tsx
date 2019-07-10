import "./gv-datepicker.scss";

import moment from "moment";
import * as React from "react";
import { RefObject } from "react";
import Calendar from "react-calendar";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";

export const DATE_FORMAT = "ll";

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
          value: newDate && moment(newDate).format(),
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
      horizontal,
      lng
    } = this.props;
    const innerDate = value ? moment(value).format(DATE_FORMAT) : undefined;

    const innerValue = value ? moment(value).toDate() : undefined;

    const innerMinDate = minDate
      ? minDate instanceof Date
        ? minDate
        : moment(minDate).toDate()
      : undefined;

    const innerMaxDate = maxDate
      ? maxDate instanceof Date
        ? maxDate
        : moment(maxDate).toDate()
      : undefined;

    return (
      <div className="gv-datepicker">
        <button
          type="button"
          ref={this.input}
          name={name}
          value={innerDate}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          className="gv-text-field__input"
          onBlur={this.handleBlur}
          disabled={disabled}
        >
          {innerDate}
        </button>
        <Popover
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          horizontal={horizontal}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
        >
          <Calendar
            className="gv-datepicker__calendar"
            value={innerValue}
            onChange={this.handleChange}
            locale={lng}
            minDate={innerMinDate}
            maxDate={innerMaxDate}
          />
        </Popover>
      </div>
    );
  }
}

export default GVDatePicker;

interface Props {
  value?: Date | string | Object;
  onChange(event: {
    persist(): void;
    target: {
      value: string;
      name: string;
    };
  }): void;
  minDate?: Date | string | Object;
  maxDate?: Date | string | Object;
  horizontal?: HORIZONTAL_POPOVER_POS;
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
}

interface State {
  anchorEl?: EventTarget;
}
