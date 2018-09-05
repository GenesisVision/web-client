import "./level-filter.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

import Filter from "../filter";
import LevelFilterPopover from "./level-filter-popover";

class LevelFilter extends Component {
  renderValueText = value => `${value[0]}-${value[1]}`;

  render() {
    const { t } = this.props;
    return (
      <Filter
        label={t("filters.level.label")}
        name={this.props.name}
        renderValueText={this.renderValueText}
        value={this.props.value}
        changeFilter={this.props.onChange}
      >
        <LevelFilterPopover values={this.props.values} />
      </Filter>
    );
  }
}

LevelFilter.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default translate()(LevelFilter);
