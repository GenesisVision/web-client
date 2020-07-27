import { GuidesCategoryItemsViewModel } from "gv-api-web";
import { GUIDES } from "pages/guides/actions/guides.actions";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { apiSelector } from "utils/selectors";

export const guidesSelector = apiSelector<GuidesCategoryItemsViewModel>(
  state => state.guides
);

export type GuidesState = IApiState<GuidesCategoryItemsViewModel>;

const guidesReducer = apiReducerFactory<GuidesCategoryItemsViewModel>({
  apiType: GUIDES
});

export default guidesReducer;
