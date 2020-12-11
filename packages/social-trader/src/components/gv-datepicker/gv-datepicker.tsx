import * as React from "react";
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  useCallback
} from "react";
import styled from "styled-components";

interface Props {
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  minDate?: string;
  maxDate?: string;
  disabled: boolean;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  name: string;
  lng: string;
  className?: string;
}

const Container = styled.div`
  display: inline-flex;
  width: 100%;

  button {
    text-align: left;
  }

  > div,
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: flex;
    width: 100%;
  }

  & input[type="date"] {
    &::-webkit-calendar-picker-indicator {
      margin: 0;
    }
  }
`;

const _GVDatePicker = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      minDate,
      maxDate,
      name,
      disabled,
      className,
      onChange,
      onBlur,
      onFocus
    },
    ref
  ) => {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event);
        }
      },
      [onChange]
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (onBlur) {
          onBlur(event);
        }
      },
      [onBlur]
    );

    const handleFocus = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (onFocus) {
          onFocus(event);
        }
      },
      [onFocus]
    );
    return (
      <Container>
        <input
          ref={ref}
          onBlur={handleBlur}
          onFocus={handleFocus}
          type="date"
          min={minDate}
          max={maxDate}
          value={value}
          onChange={handleChange}
          name={name}
          disabled={disabled}
          className={className}
        />
      </Container>
    );
  }
);

const GVDatePicker = React.memo(_GVDatePicker);
export default GVDatePicker;
