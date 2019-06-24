import "./calculator-slider.scss";

import Slider from "rc-slider";
import * as React from "react";
import NumberFormat from "react-number-format";

class _CalculatorSlider extends React.PureComponent<Props, State> {
  state = {
    value: this.props.defaultValue
  };

  static defaultProps = {
    step: 1
  };

  marks = {
    [this.props.min]: `${this.props.min}`,
    [this.props.max]: `${this.props.max}`
  };

  handleChange = (value: number) => {
    this.setState({ value });
  };

  render() {
    const { min, max, title, step, valueSuffix } = this.props;
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
  max: number;
  step?: number;
  title?: string;
  valueSuffix?: string;
}

interface State {
  value: number;
}

const CalculatorSlider = React.memo(_CalculatorSlider);
export default CalculatorSlider;
