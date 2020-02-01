import classNames from "classnames";
import GlobalSearchResultContainer from "components/global-search/components/global-search-result/global-search-result-container";
import * as React from "react";
import { useCallback, useState } from "react";

import GlobalSearchInput from "./global-search-input";

const _GlobalSearchContainer: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleOnChange = useCallback((query: string) => {
    setQuery(query);
  }, []);

  return (
    <>
      <GlobalSearchInput query={query} onChange={handleOnChange} />
      <div className={classNames({ "global-search-hidden": !query })}>
        <GlobalSearchResultContainer query={query} />
      </div>
    </>
  );
};

const GlobalSearchContainer = React.memo(_GlobalSearchContainer);
export default GlobalSearchContainer;
