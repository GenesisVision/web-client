import { GVButton } from "gv-react-components";
import { Range } from "rc-slider";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

interface ILevelFilterPopoverProps {
  value: number[];
  cancel?(): void;
  changeFilter?(value: number[]): void;
}

interface ILevelFilterPopoverState {
  value: number[];
}

class LevelFilterPopover extends React.Component<
  ILevelFilterPopoverProps & InjectedTranslateProps,
  ILevelFilterPopoverState
> {
  state = {
    value: this.props.value
  };

  marks = new Array(7).fill(0).reduce((prev, curr, idx) => {
    prev[idx + 1] = idx + 1;
    return prev;
  }, {});

  handleChange = (e: number[]) => {
    this.setState({ value: e });
  };
  handleSubmit = () => {
    if (this.props.changeFilter) {
      this.props.changeFilter(this.state.value);
    }
  };

  mapValueToNumber = (values: Array<number | string>): Array<number> =>
    values.map(x => (typeof x === "number" ? x : parseInt(x)));

  render() {
    const { t, cancel } = this.props;
    return (
      <div className="level-filter">
        <Range
          dots
          min={1}
          max={7}
          marks={this.marks}
          value={this.mapValueToNumber(this.state.value)}
          onChange={this.handleChange}
          pushable
        />
        <div className="level-filter__btns">
          <GVButton
            className="level-filter__btn"
            variant="text"
            onClick={this.handleSubmit}
          >
            {t("buttons.apply")}
          </GVButton>
          <GVButton
            className="level-filter__btn"
            variant="text"
            color="secondary"
            onClick={cancel}
          >
            {t("buttons.cancel")}
          </GVButton>
        </div>
      </div>
    );
  }
}

export default translate()(LevelFilterPopover);
