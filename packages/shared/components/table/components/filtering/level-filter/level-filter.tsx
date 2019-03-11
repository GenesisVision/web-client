import "./level-filter.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import Filter from "../filter";
import LevelFilterPopover from "./level-filter-popover";

interface ILevelFilterProps {
  name: string;
  value: number;
  onChange(value: number): void;
}

class LevelFilter extends React.Component<
  ILevelFilterProps & InjectedTranslateProps
> {
  renderValueText = value => `${value[0]}-${value[1]}`;

  render() {
    const { t } = this.props;
    return (
      <Filter
        label={t("filters.level.label")}
        name={this.props.name}
        renderValueText={this.renderValueText}
        value={this.props.value}
        updateFilter={this.props.onChange}
      >
        <LevelFilterPopover {...this.props} />
      </Filter>
    );
  }
}

export default translate()(LevelFilter);
