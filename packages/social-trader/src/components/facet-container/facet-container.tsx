import NotFoundPage from "components/not-found/not-found";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import { PlatformInfo } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { IFundsFacetTableProps } from "pages/invest/funds/funds-facet/components/funds-facet-table";
import { IProgramsFacetTableProps } from "pages/invest/programs/programs-facet/components/programs-facet-table";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  platformCurrenciesSelector,
  platformDataSelector
} from "reducers/platform-reducer";
import { RootState } from "reducers/root-reducer";
import { createSelector } from "reselect";
import { CurrencyEnum } from "utils/types";

const facetsSelector = createSelector<
  RootState,
  Props,
  PlatformInfo | undefined,
  FACET_ASSET,
  FacetType[] | undefined
>(
  state => platformDataSelector(state),
  (state, props) => props.asset,
  (data, asset) => {
    if (!data) return undefined;
    return data.assetInfo[asset].facets;
  }
);
const facetSelector = createSelector<
  RootState,
  Props,
  FacetType[] | undefined,
  string,
  FacetType | undefined
>(
  (state, props) => facetsSelector(state, props),
  (state, props) => props.id,
  (data, id) => {
    if (!data) return undefined;
    return data.find((x: FacetType) => x.url === id);
  }
);

interface Props {
  initCurrency?: CurrencyEnum;
  title?: string;
  id: string;
  asset: FACET_ASSET;
  TableContainer: React.ComponentType<
    IProgramsFacetTableProps | IFundsFacetTableProps
  >;
  getItems: (args: FilteringType) => Promise<IDataModel>;
  isAuthenticated?: boolean;
}

export type FacetType = any; // TODO declare type
export enum FACET_ASSET {
  PROGRAMS = "programInfo",
  FUNDS = "fundInfo",
  FOLLOWS = "followInfo"
}

const _FacetContainer: React.FC<Props> = props => {
  const { id, initCurrency, TableContainer, getItems, title } = props;
  const facets = useSelector((state: RootState) =>
    facetsSelector(state, props)
  );
  const facet = useSelector((state: RootState) => facetSelector(state, props));
  const currencies = useSelector(platformCurrenciesSelector);
  const currency = useAccountCurrency();
  const getFacetItems = useCallback(
    filtering => getItems({ ...filtering, facetId: facet!.id }),
    [facet, getItems]
  );
  if (!facets) return null;
  if (!facet) return <NotFoundPage />;
  const { sorting, timeframe } = facet!;
  return (
    <TableContainer
      name={id}
      initCurrency={initCurrency}
      title={title}
      sorting={sorting}
      timeframe={timeframe}
      getItems={getFacetItems}
      currency={currency}
      currencies={currencies}
    />
  );
};

const FacetContainer = React.memo(_FacetContainer);
export default FacetContainer;
