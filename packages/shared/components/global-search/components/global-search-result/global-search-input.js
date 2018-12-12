import "./global-search-input.scss";

import { GVTextField } from "gv-react-components";
import React, { PureComponent } from "react";
import SearchIcon from "shared/components/search-icon/search-icon";

class GlobalSearchInput extends PureComponent {
  handleOnChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const { query } = this.props;
    return (
      <div className="global-search-input">
        <GVTextField
          name="queryValue"
          wrapperClassName="global-search-input__wrapper"
          placeholder="Search for programs or managers"
          autoComplete="off"
          adornment={<SearchIcon primary />}
          adornmentPosition="start"
          value={query}
          onChange={this.handleOnChange}
          autoFocus
        />
      </div>
    );
  }
}

export default GlobalSearchInput;
