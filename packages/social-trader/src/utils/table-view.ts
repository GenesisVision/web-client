import { LIST_VIEW } from "components/table/table.constants";
import { cookieServiceCreator } from "utils/cookie-service.creator";

export const DEFAULT_GLOBAL_TABLE_VIEW: LIST_VIEW = LIST_VIEW.CARDS;

export const GLOBAL_TABLE_VIEW_KEY = "GLOBAL_TABLE_VIEW_KEY";

export const { get: getTableView, set: setTableView } = cookieServiceCreator<
  LIST_VIEW
>({
  key: GLOBAL_TABLE_VIEW_KEY,
  initialState: DEFAULT_GLOBAL_TABLE_VIEW
});
