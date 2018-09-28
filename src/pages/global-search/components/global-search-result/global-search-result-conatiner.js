import React, { Component, Fragment } from "react";

import { globalSearchGetPrograms } from "../../services/global-search-result.service";
import GlobalSearchInput from "./global-search-input";
import GlobalSearchResultTable from "./global-search-result-table";

class GlobalSearchResultConatiner extends Component {
  state = {
    query: "",
    data: undefined,
    isPending: true
  };

  handleOnChange = value => {
    this.setState({ query: value, isPending: true });
    globalSearchGetPrograms(value).then(data => {
      this.setState({ ...data });
    });
  };

  render() {
    const { query } = this.state;
    return (
      <Fragment>
        <GlobalSearchInput
          query={this.state.query}
          onChange={this.handleOnChange}
        />
        {query && <GlobalSearchResultTable items={this.state.data} />}
      </Fragment>
    );
  }
}

export default GlobalSearchResultConatiner;
