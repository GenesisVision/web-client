import { composeClearDataActionType } from "actions/clear-data.factory";
import { NotificationViewModel } from "gv-api-web";
import { Action } from "redux";
import { ActionType } from "utils/types";

export const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
export const TAKE_COUNT = 10;

export interface AddNotificationsAction
  extends ActionType<Array<NotificationViewModel>> {
  type: typeof ADD_NOTIFICATIONS;
}

export interface ClearNotificationsAction extends Action {
  type: ReturnType<typeof composeClearDataActionType>;
}

export type SkipTake = Readonly<{
  skip: number;
  take: number;
}>;

export const addNotificationsAction = (
  payload: Array<NotificationViewModel>
): AddNotificationsAction => ({
  type: ADD_NOTIFICATIONS,
  payload
});

export const clearNotificationsAction = (): ClearNotificationsAction => ({
  type: composeClearDataActionType(ADD_NOTIFICATIONS)
});

export const calculateOptions = (
  options?: SkipTake,
  total: number = 0
): SkipTake => {
  if (!options) return { take: TAKE_COUNT, skip: 0 };
  const { take = 0, skip = 0 } = options;
  const newSkip = skip + take;
  const newTake = Math.max(Math.min(TAKE_COUNT, total - newSkip), 0);
  return { take: newTake, skip: newSkip };
};
