import { CommonPublicAssetsViewModel } from "gv-api-web";
import { debounce } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { Nullable } from "utils/types";

import { search } from "../../services/global-search-result.service";
import GlobalSearchResult from "./global-search-result/global-search-result";

const emptyTable = { items: [], total: 0 };
const globalSearchLoaderData: CommonPublicAssetsViewModel = {
  follows: emptyTable,
  funds: emptyTable,
  managers: emptyTable,
  programs: emptyTable
};

const _GlobalSearchResultContainer: React.FC<Props> = ({ query = "" }) => {
  const [data, setData] = useState<Nullable<CommonPublicAssetsViewModel>>(null);

  const searchDebounced = debounce((value: string) => {
    search(value).then(setData);
  }, 300);

  useEffect(() => {
    searchDebounced(query);
  }, [query]);

  return (
    <GlobalSearchResult loaderData={globalSearchLoaderData} data={data!} />
  );
};

interface Props {
  query?: string;
}

const GlobalSearchResultContainer = React.memo(_GlobalSearchResultContainer);
export default GlobalSearchResultContainer;
