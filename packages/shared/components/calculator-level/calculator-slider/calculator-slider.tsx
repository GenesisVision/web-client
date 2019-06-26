import "./calculator-slider.scss";

import Slider from "rc-slider";
import * as React from "react";
import NumberFormat from "react-number-format";

class _CalculatorSlider extends React.PureComponent<Props, State> {
  state = {
    value: this.props.defaultValue
  };

  marks = {
    [this.props.min]: {
      style: {
        transform: "none"
      },
      label: (
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
      label: (
        <NumberFormat
          value={this.props.max}
          displayType="text"
          suffix={this.props.maxSuffix}
        />
      )
    }
  };

  handleChange = (value: number) => {
    this.setState({ value });
  };

  render() {
    const { min, max, title, step = 1, valueSuffix } = this.props;
    const { value } = this.state;
    return (
      <div className="calculator-slider">
        <div className="calculator-slider__heading">
          <div className="calculator-slider__title">{title}</div>
          <div className="calculator-slider__value">
            <NumberFormat
              value={value}
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

interface Props {
  defaultValue: number;
  min: number;
  minSuffix?: string;
  max: number;
  maxSuffix?: string;
  step?: number;
  title?: string | React.ReactNode;
  valueSuffix?: string;
}

interface State {
  value: number;
}

const CalculatorSlider = React.memo(_CalculatorSlider);
export default CalculatorSlider;
