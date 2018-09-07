import "./global-search-input.scss";

import SearchIcon from "components/search-icon/search-icon";
import { GVTextField } from "gv-react-components";
import React, { Component } from "react";

class GlobalSearchInput extends Component {
  handleOnChange = e => {
    const { service } = this.props;
    service.updateQueryValue(e.target.value);
  };

  render() {
    const { query } = this.props;
    return (
      <GVTextField
        name="queryValue"
        wrapperClassName="global-search-input__wrapper"
        placeholder="Search for programs or managers"
        autoComplete="off"
        adornment={<SearchIcon primary />}
        adornmentPosition="end"
        value={query}
        onChange={this.handleOnChange}
      />
    );
  }
}

export default GlobalSearchInput;
