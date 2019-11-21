import { IFundsFacetTableProps } from "components/funds/funds-facet/components/funds-facet-table";
import NotFoundPage from "components/not-found/not-found";
import { IProgramsFacetTableProps } from "components/programs/programs-facet/components/programs-facet-table";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { withAuthenticated } from "decorators/is-authenticated";
import { Currency, PlatformCurrencyInfo, PlatformInfo } from "gv-api-web";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import {
  platformCurrenciesSelector,
  platformDataSelector
} from "reducers/platform-reducer";
import { RootState } from "reducers/root-reducer";
import { compose } from "redux";
import { createSelector } from "reselect";
import { IDataModel } from "shared/constants/constants";

const _FacetContainer: React.FC<Props> = ({
  id,
  TableContainer,
  isAuthenticated,
  facet,
  facets,
  getItems,
  currency,
  currencies
}) => {
  const getFacetItems = useCallback(
    filtering => getItems({ ...filtering, facetId: facet!.id }),
    [facet, getItems]
  );
  if (!facets) return null;
  if (!facet) return <NotFoundPage />;
  const { title, sorting, timeframe } = facet!;
  return (
    <TableContainer
      title={title}
      sorting={sorting}
      timeframe={timeframe}
      getItems={getFacetItems}
      isAuthenticated={isAuthenticated}
      currency={currency}
      currencies={currencies}
    />
  );
};

const facetsSelector = createSelector<
  RootState,
  OwnProps,
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
  OwnProps,
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

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => ({
  facets: facetsSelector(state, props),
  facet: facetSelector(state, props),
  currencies: platformCurrenciesSelector(state),
  currency: currencySelector(state)
});

interface OwnProps {
  id: string;
  asset: FACET_ASSET;
  TableContainer: React.ComponentType<
    IProgramsFacetTableProps | IFundsFacetTableProps
  >;
  getItems: (args: FilteringType) => Promise<IDataModel>;
  isAuthenticated?: boolean;
}
interface StateProps {
  facets?: FacetType[];
  facet?: FacetType;
  currencies: PlatformCurrencyInfo[];
  currency: Currency;
}

interface Props extends OwnProps, StateProps {}

export type FacetType = any; // TODO declare type
export type FacetDataType = {
  isPending?: boolean;
  notFound?: boolean;
  facet?: FacetType;
};
export enum FACET_ASSET {
  PROGRAMS = "programInfo",
  FUNDS = "fundInfo",
  FOLLOWS = "followInfo"
}

const FacetContainer = compose<React.ComponentType<OwnProps>>(
  withAuthenticated,
  connect(mapStateToProps),
  React.memo
)(_FacetContainer);
export default FacetContainer;
