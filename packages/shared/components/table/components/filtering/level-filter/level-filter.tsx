import "./level-filter.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import Filter from "../filter";
import { TFilter } from "../filter.type";
import LevelFilterPopover from "./level-filter-popover";

interface ILevelFilterProps {
  name: string;
  value: number[];
  onChange(value: TFilter<any>): void;
}

class LevelFilter extends React.Component<
  ILevelFilterProps & InjectedTranslateProps
> {
  renderValueText = (value: number[]): string => `${value[0]}-${value[1]}`;

  render() {
    const { t, name, value, onChange } = this.props;
    return (
      <Filter
        label={t("filters.level.label")}
        name={name}
        renderValueText={this.renderValueText}
        value={value}
        updateFilter={onChange}
      >
        <LevelFilterPopover {...this.props} />
      </Filter>
    );
  }
}

export default translate()(LevelFilter);
