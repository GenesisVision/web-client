import classNames from "classnames";
import { SearchViewModel } from "gv-api-web";
import { debounce } from "lodash";
import * as React from "react";
import { useCallback, useState } from "react";
import { Nullable } from "utils/types";

import { search } from "../../services/global-search-result.service";
import GlobalSearchInput from "./global-search-input";
import GlobalSearchResult from "./global-search-result/global-search-result";

const _GlobalSearchResultContainer: React.FC<Props> = ({ title }) => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<Nullable<SearchViewModel>>(null);

  const searchDebounced = debounce((value: string) => {
    search(value).then(setData);
  }, 300);

  const handleOnChange = useCallback((query: string) => {
    setQuery(query);
    searchDebounced(query);
  }, []);

  return (
    <>
      <GlobalSearchInput query={query} onChange={handleOnChange} />
      {data && (
        <div className={classNames({ "global-search-hidden": !query })}>
          <GlobalSearchResult data={data} title={title} />
        </div>
      )}
    </>
  );
};

interface Props {
  title: string;
}

const GlobalSearchResultContainer = React.memo(_GlobalSearchResultContainer);
export default GlobalSearchResultContainer;
