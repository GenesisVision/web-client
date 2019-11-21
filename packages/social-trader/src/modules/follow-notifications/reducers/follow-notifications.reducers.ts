import { ProgramNotificationSettingList } from "gv-api-web";
import defaultReducer from "reducers/reducer-creators/default-reducer";

import {
  ADD_FOLLOW_NOTIFICATIONS,
  TAddFollowNotificationsAction
} from "../actions/follow-notifications.actions";

export type FollowNotificationsState = Readonly<{
  [name: string]: ProgramNotificationSettingList | undefined;
}>;

const initialState: FollowNotificationsState = {};

const followNotificationsReducer = (
  state: FollowNotificationsState = initialState,
  action: TAddFollowNotificationsAction
): FollowNotificationsState =>
  defaultReducer<TAddFollowNotificationsAction, FollowNotificationsState>(
    action,
    state,
    initialState,
    ADD_FOLLOW_NOTIFICATIONS,
    true
  );

export default followNotificationsReducer;
