import { ItemsViewModelCopyTradingDetailsList } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";

import { FOLLOWS } from "../actions/follows-table.actions";
import followsFavoritesReducer from "./follows-favorites.reducer";

export type FollowsListState = Readonly<{
  items: IApiState<ItemsViewModelCopyTradingDetailsList>;
}>;

export const followsDataSelector = apiSelector<
  ItemsViewModelCopyTradingDetailsList
>(state => state.followsData.items);

const followsReducer = combineReducers<FollowsListState>({
  items: apiReducerFactory({ apiType: FOLLOWS }, followsFavoritesReducer)
});

export default followsReducer;
