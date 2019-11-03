import defaultReducer from "shared/reducers/reducer-creators/default-reducer";
import { RootState } from "shared/reducers/root-reducer";

import { SetFollowIdAction } from "../actions/follow-details.actions";
import { SET_FOLLOW_ID } from "../follow-details.constants";

export type FollowIdState = string;

const initialState = "";

const followIdSelector = (state: RootState) => state.followDetails.id;

const followIdReducer = (
  state: FollowIdState = initialState,
  action: SetFollowIdAction
): string =>
  defaultReducer<SetFollowIdAction, string>(
    action,
    state,
    initialState,
    SET_FOLLOW_ID
  );

export default followIdReducer;
