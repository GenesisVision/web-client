import "./calculator-slider.scss";

import classnames from "classnames";
import Slider from "rc-slider";
import * as React from "react";
import NumberFormat from "react-number-format";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";

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

  render() {
    const {
      value,
      min,
      max,
      title,
      valueComponent: ValueComponent,
      step = 1,
      className,
      tooltipContent
    } = this.props;
    return (
      <div className={classnames("calculator-slider", className)}>
        <div className="calculator-slider__heading">
          <div className="calculator-slider__title">
            <span>{title}</span>
            {tooltipContent && <TooltipLabel tooltipContent={tooltipContent} />}
          </div>
          <div className="calculator-slider__value">
            {ValueComponent ? (
              ValueComponent
            ) : (
              <NumberFormat value={value} displayType="text" />
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
  valueComponent?: React.ReactElement<any>;
  min: number;
  minLabel?: React.ReactElement<any>;
  max: number;
  maxLabel?: React.ReactElement<any>;
  step?: number;
  title?: React.ReactNode;
  className?: string;
  tooltipContent?: string;
  onChange(name: string, value: number): void;
}

const CalculatorSlider = React.memo(_CalculatorSlider);
export default CalculatorSlider;
