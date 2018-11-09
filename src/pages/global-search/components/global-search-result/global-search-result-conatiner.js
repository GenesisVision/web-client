import classnames from "classnames";
import debounce from "debounce";
import React, { Component, Fragment } from "react";

import { search } from "../../services/global-search-result.service";
import GlobalSearchInput from "./global-search-input";
import GlobalSearchResult from "./global-search-result/global-search-result";

class GlobalSearchResultConatiner extends Component {
  state = {
    query: "",
    data: {}
  };

  handleOnChange = value => {
    this.setState({ query: value, isPending: true });
    this.searchDebounced(value);
  };

  searchDebounced = debounce(value => {
    search(value).then(data => {
      this.setState({ ...data });
    });
  }, 300);

  render() {
    const { query } = this.state;
    const { title } = this.props;
    return (
      <Fragment>
        <GlobalSearchInput
          query={this.state.query}
          onChange={this.handleOnChange}
        />
        <div className={classnames({ "global-search-hidden": !query })}>
          <GlobalSearchResult data={this.state.data} title={title} />
        </div>
      </Fragment>
    );
  }
}

export default GlobalSearchResultConatiner;
