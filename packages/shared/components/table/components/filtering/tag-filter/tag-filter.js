import "./tag-filter.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

import Filter from "../filter";
import TagFilterPopover from "./tag-filter-popover";

class TagFilter extends Component {
  renderValueText = value => value;

  render() {
    const { t, values, value } = this.props;
    return (
      <Filter
        label={t("filters.level.label")}
        name={this.props.name}
        renderValueText={this.renderValueText}
        value={Array.isArray(value) ? value : [value]}
        updateFilter={this.props.onChange}
      >
        <TagFilterPopover
          // value={Array.isArray(value) ? value : [value]}
          values={values}
        />
      </Filter>
    );
  }
}

TagFilter.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default translate()(TagFilter);
