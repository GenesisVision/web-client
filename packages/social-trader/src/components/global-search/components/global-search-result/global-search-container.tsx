import GlobalSearchResultContainer from "components/global-search/components/global-search-result/global-search-result-container";
import { Row } from "components/row/row";
import * as React from "react";
import { useCallback, useState } from "react";

import GlobalSearchInput from "./global-search-input/global-search-input";

const _GlobalSearchContainer: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleOnChange = useCallback((query: string) => {
    setQuery(query);
  }, []);

  return (
    <>
      <GlobalSearchInput query={query} onChange={handleOnChange} />
      {query && (
        <Row onlyOffset>
          <GlobalSearchResultContainer query={query} />
        </Row>
      )}
    </>
  );
};

const GlobalSearchContainer = React.memo(_GlobalSearchContainer);
export default GlobalSearchContainer;
