import "./calculator-slider.scss";

import classnames from "classnames";
import Slider from "rc-slider";
import * as React from "react";
import NumberFormat from "react-number-format";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";

class _CalculatorSlider extends React.PureComponent<ICalculatorSliderProps> {
  marks = {
    [this.props.min]: {
      style: {
        transform: "none"
      },
      label: this.props.minLabel ? (
        this.props.minLabel
      ) : (
        <NumberFormat
          value={this.props.min}
          displayType="text"
          suffix={this.props.minSuffix}
        />
      )
    },
    [this.props.max]: {
      style: {
        transform: "translateX(-100%)"
      },
      label: this.props.maxLabel ? (
        this.props.maxLabel
      ) : (
        <NumberFormat
          value={this.props.max}
          displayType="text"
          suffix={this.props.maxSuffix}
        />
      )
    }
  };

  handleChange = (value: number) => {
    this.props.onChange(this.props.name, value);
  };

  render() {
    const {
      value,
      min,
      max,
      label,
      formattedValue,
      step = 1,
      valueSuffix,
      className,
      tooltipContent
    } = this.props;
    return (
      <div className={classnames("calculator-slider", className)}>
        <div className="calculator-slider__heading">
          <div className="calculator-slider__title">
            <span>{label}</span>
            {tooltipContent && <TooltipLabel tooltipContent={tooltipContent} />}
          </div>
          <div className="calculator-slider__value">
            <NumberFormat
              value={formattedValue || value}
              displayType="text"
              suffix={valueSuffix}
            />
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

export interface ICalculatorSliderProps {
  name: string;
  value: number;
  formattedValue?: number;
  min: number;
  minSuffix?: string;
  minLabel?: React.ReactElement<any>;
  max: number;
  maxSuffix?: string;
  maxLabel?: React.ReactElement<any>;
  step?: number;
  label?: string | React.ReactNode;
  valueSuffix?: string;
  className?: string;
  tooltipContent?: string;
  onChange(name: string, value: number): void;
}

const CalculatorSlider = React.memo(_CalculatorSlider);
export default CalculatorSlider;
