import * as React from "react";
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  useCallback
} from "react";

import styles from "./gv-datepicker.module.scss";

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
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    }, []);

    const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (onBlur) {
        onBlur(event);
      }
    }, []);

    const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (onFocus) {
        onFocus(event);
      }
    }, []);
    return (
      <div className={styles["gv-datepicker"]}>
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
      </div>
    );
  }
);

const GVDatePicker = React.memo(_GVDatePicker);
export default GVDatePicker;

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
