import { ProfileHeaderViewModel } from "gv-api-web";
import { PROFILE_HEADER } from "shared/components/header/header.constants";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";

export type HeaderState = IApiState<ProfileHeaderViewModel>;

export const headerSelector = apiSelector<ProfileHeaderViewModel>(
  state => state.profileHeader
);

export const isNewUserSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.isNewUser)
);

export const forexAllowedSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.allowForex)
);

export const kycConfirmedSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.kycConfirmed)
);

export const notificationsCountSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.notificationsCount),
  0
);

export const availableSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.available),
  0
);

export const nameSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.name),
  ""
);

export const roleSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.userType),
  undefined
);

export const idSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.id)
);

const headerReducer = apiReducerFactory<ProfileHeaderViewModel>({
  apiType: PROFILE_HEADER
});

export default headerReducer;
