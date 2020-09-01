import GVTextField from "components/gv-text-field";
import { SliderStyleWrapper } from "components/range/range";
import { RowItem } from "components/row-item/row-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import {
  CalculatorSliderContainer,
  CalculatorSliderHeading,
  CalculatorSliderTitle,
  CalculatorSliderValue
} from "modules/level-calculator/components/calculator-slider/calculator-slider.styles";
import Slider from "rc-slider";
import * as React from "react";
import NumberFormat from "react-number-format";

interface Props {
  wideValue?: boolean;
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
  tooltipContent?: string;
  onChange: (name: string, value: number) => void;
  onChangeValue?: (name: string, value: number) => void;
}

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
      wideValue,
      name,
      value,
      min,
      max,
      title,
      formattedValue,
      valueAdornment,
      step = 1,
      tooltipContent,
      editableValue = false
    } = this.props;
    return (
      <CalculatorSliderContainer>
        <CalculatorSliderHeading editableValue={editableValue}>
          <CalculatorSliderTitle>
            <RowItem size={"small"}>{title}</RowItem>
            {tooltipContent && (
              <RowItem>
                <TooltipLabel tooltipContent={tooltipContent} />
              </RowItem>
            )}
          </CalculatorSliderTitle>
          <CalculatorSliderValue wideValue={wideValue}>
            {editableValue ? (
              <GVTextField
                name={name}
                autoComplete="off"
                value={formattedValue || value}
                onChange={this.handleValueChange}
                adornment={valueAdornment}
                adornmentPosition="end"
                size={"small"}
                align={"right"}
                InputComponent={NumberFormat}
              />
            ) : (
              <NumberFormat
                value={formattedValue || value}
                displayType="text"
                suffix={valueAdornment}
              />
            )}
          </CalculatorSliderValue>
        </CalculatorSliderHeading>
        <SliderStyleWrapper>
          <Slider
            className={"calculator-slider__slider-element"}
            min={min}
            max={max}
            marks={this.marks}
            value={value}
            step={step}
            onChange={this.handleChange}
          />
        </SliderStyleWrapper>
      </CalculatorSliderContainer>
    );
  }
}

const CalculatorSlider = React.memo(_CalculatorSlider);
export default CalculatorSlider;
