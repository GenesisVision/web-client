import classNames from "classnames";
import debounce from "debounce";
import { SearchViewModel } from "gv-api-web";
import * as React from "react";
import { Nullable } from "shared/utils/types";

import { search } from "../../services/global-search-result.service";
import GlobalSearchInput from "./global-search-input";
import GlobalSearchResult from "./global-search-result/global-search-result";

interface Props {
  title: string;
}

interface State {
  query: string;
  data: Nullable<SearchViewModel>;
}

class GlobalSearchResultContainer extends React.PureComponent<Props, State> {
  state = {
    query: "",
    data: null
  };

  handleOnChange = (query: string) => {
    this.setState({ query });
    this.searchDebounced(query);
  };

  searchDebounced = debounce((value: string) => {
    search(value).then(data => {
      this.setState({ data });
    });
  }, 300);

  render() {
    const { query, data } = this.state;
    const { title } = this.props;
    return (
      <>
        <GlobalSearchInput
          query={this.state.query}
          onChange={this.handleOnChange}
        />
        {data && (
          <div className={classNames({ "global-search-hidden": !query })}>
            <GlobalSearchResult data={data} title={title} />
          </div>
        )}
      </>
    );
  }
}

export default GlobalSearchResultContainer;
