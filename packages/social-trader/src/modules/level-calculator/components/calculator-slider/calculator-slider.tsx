import classNames from "classnames";
import GVTextField from "components/gv-text-field";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Slider from "rc-slider";
import * as React from "react";
import NumberFormat from "react-number-format";

import styles from "./calculator-slider.module.scss";

class _CalculatorSlider extends React.PureComponent<Props> {
  marks = {
    [this.props.min]: {
      style: {
        transform: "none"
      },
      label: this.props.minLabel ? (
        this.props.minLabel
      ) : (
        <NumberFormat value={this.props.min} displayType="text" />
      )
    },
    [this.props.max]: {
      style: {
        transform: "translateX(-100%)"
      },
      label: this.props.maxLabel ? (
        this.props.maxLabel
      ) : (
        <NumberFormat value={this.props.max} displayType="text" />
      )
    }
  };

  handleChange = (value: number) => {
    this.props.onChange(this.props.name, value);
  };

  handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChangeValue) {
      this.props.onChangeValue(this.props.name, +event.target.value);
    } else {
      let val = parseFloat(event.target.value);
      if (Number.isNaN(val)) val = 0;
      if (val < this.props.min) val = this.props.min;
      if (val > this.props.max) val = this.props.max;
      this.handleChange(val);
    }
  };

  render() {
    const {
      name,
      value,
      min,
      max,
      title,
      formattedValue,
      valueAdornment,
      step = 1,
      className,
      valueClassName,
      tooltipContent,
      editableValue = false
    } = this.props;
    return (
      <div className={classNames(styles["calculator-slider"], className)}>
        <div
          className={classNames(styles["calculator-slider__heading"], {
            [styles[
              "calculator-slider__heading--editable-value"
            ]]: editableValue
          })}
        >
          <div className={styles["calculator-slider__title"]}>
            <span>{title}</span>
            {tooltipContent && <TooltipLabel tooltipContent={tooltipContent} />}
          </div>
          <div className={styles["calculator-slider__value"]}>
            {editableValue ? (
              <GVTextField
                name={name}
                autoComplete="off"
                value={formattedValue || value}
                onChange={this.handleValueChange}
                adornment={valueAdornment}
                adornmentPosition="end"
                wrapperClassName={classNames(
                  styles["calculator-slider__editable-value-wrapper"],
                  valueClassName
                )}
                className={styles["calculator-slider__editable-value"]}
                inputClassName={
                  styles["calculator-slider__editable-value-input"]
                }
                InputComponent={NumberFormat}
              />
            ) : (
              <NumberFormat
                className={valueClassName}
                value={formattedValue || value}
                displayType="text"
                suffix={valueAdornment}
              />
            )}
          </div>
        </div>
        <Slider
          min={min}
          max={max}
          marks={this.marks}
          value={value}
          step={step}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

interface Props {
  name: string;
  value: number;
  formattedValue?: number;
  editableValue?: boolean;
  valueAdornment?: string;
  min: number;
  minLabel?: React.ReactElement;
  max: number;
  maxLabel?: React.ReactElement;
  step?: number;
  title?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  tooltipContent?: string;
  onChange(name: string, value: number): void;
  onChangeValue?(name: string, value: number): void;
}

const CalculatorSlider = React.memo(_CalculatorSlider);
export default CalculatorSlider;
