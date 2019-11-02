import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";

import { FETCH_FOLLOW_DESCRIPTION } from "../follow-details.constants";
import { FollowDetailsDataType } from "../follow-details.types";

export type FollowDescriptionDataType = FollowDetailsDataType;

export type FollowDescriptionState = IApiState<FollowDescriptionDataType>;

export const followDescriptionSelector = apiSelector<FollowDescriptionDataType>(
  state => state.followDetails.description
);

export const followIdSelector = apiFieldSelector(
  followDescriptionSelector,
  fieldSelector(state => state.id),
  undefined
);

export const followStatusSelector = apiFieldSelector(
  followDescriptionSelector,
  fieldSelector(state => state.status),
  undefined
);

const followDescriptionReducer = apiReducerFactory<FollowDescriptionDataType>({
  apiType: FETCH_FOLLOW_DESCRIPTION
});

export default followDescriptionReducer;
