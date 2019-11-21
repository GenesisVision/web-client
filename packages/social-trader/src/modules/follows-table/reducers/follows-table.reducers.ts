import { ItemsViewModelFollowDetailsList } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { combineReducers } from "redux";
import { apiSelector } from "utils/selectors";

import { FOLLOWS } from "../actions/follows-table.actions";
import followsFavoritesReducer from "./follows-favorites.reducer";

export type FollowsListState = Readonly<{
  items: IApiState<ItemsViewModelFollowDetailsList>;
}>;

export const followsDataSelector = apiSelector<ItemsViewModelFollowDetailsList>(
  state => state.followsData.items
);

const followsReducer = combineReducers<FollowsListState>({
  items: apiReducerFactory({ apiType: FOLLOWS }, followsFavoritesReducer)
});

export default followsReducer;
