import {
  AmountWithCurrencyCurrencyEnum,
  CancelablePromise,
  FundAssetPart,
  PlatformAsset,
  ProgramNotificationSettingList
} from "gv-api-web";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import { NextPage, NextPageContext } from "next";
import { AppContextType } from "next/dist/next-server/lib/utils";
import { Action, Dispatch, Store } from "redux";
import { ThunkAction } from "redux-thunk";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { RootState } from "shared/reducers/root-reducer";

export interface IDispatchable<T> {
  (dispatch: Dispatch<ActionType>): T;
}

export type FavoriteActionProps = { id: string; authorization: string };

type FavoriteActionMeta = {
  id: string;
  isFavorite: boolean;
};
export interface FavoriteActionType<T = any> extends ApiAction<T> {
  meta: FavoriteActionMeta;
}

export interface NotificationsActionType<T = ProgramNotificationSettingList>
  extends ActionType {
  errorMessage?: string;
}

export interface ActionType<T = any, U = any> extends Action {
  type: string;
  payload?: T;
  meta?: U;
}

export type ApiAction<T = any, U = any> = ActionType<CancelablePromise<T>, U>;

export type RootThunkAction<R = any> = ThunkAction<R, AuthRootState, any, any>;

export interface DispatchType<R> {
  (asyncAction: ActionType): R;
}

type UnpackApiAction<T> = T extends ApiAction<infer U> ? U : T;

interface ApiActionResponse<T> {
  action: T;
  value: UnpackApiAction<T>;
}

export interface MiddlewareDispatch {
  <A extends ApiAction = ApiAction>(apiAction: A): Promise<
    ApiActionResponse<A>
  >;
  <A extends ActionType = ActionType>(action: A): A;
  <R, S>(asyncAction: RootThunk<R, S>): R;
}

export type RootThunk<R, S = AuthRootState> = (
  dispatch: MiddlewareDispatch,
  getState: () => S
) => R;

export type InvestorThunk<R> = RootThunk<R, InvestorRootState>;
export type ManagerThunk<R> = RootThunk<R, ManagerRootState>;

export type Nullable<T> = T | null;

export type ResponseError = {
  errorMessage: string;
  code: string;
};

export type SetSubmittingType = (isSubmitting: boolean) => void;
export type HandlePeriodChangeType = (period: ChartDefaultPeriod) => void;

export type CurrencyEnum = AmountWithCurrencyCurrencyEnum;

export type AuthRootState = ManagerRootState | InvestorRootState;

export type TGetState = () => RootState;
export type TGetAuthState = () => AuthRootState;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type InitializeStoreType = (initialState?: {}) => Store<
  any,
  ActionType<any, any>
> & {
  dispatch: any;
};

export interface NextPageWithReduxContext extends NextPageContext {
  reduxStore: Store<AuthRootState, RootThunkAction>; //TODO error
}

export interface AppWithReduxContext extends AppContextType {
  ctx: NextPageWithReduxContext;
}

export interface NextPageWithRedux<P = void, IP = P> extends NextPage<P, IP> {
  getInitialProps?(ctx: NextPageWithReduxContext): Promise<IP>;
}
export type DispatchDescriptionType = () => (
  dispatch: MiddlewareDispatch,
  getState: () => RootState
) => ReturnType<MiddlewareDispatch>;

export type PlatformAssetFull = PlatformAsset & FundAssetPart;

export type FeesType = {
  entryFee?: number;
  entryFeeSelected?: number;
  entryFeeCurrent?: number;
  successFee?: number;
  successFeeSelected?: number;
  successFeeCurrent?: number;
  successFeePersonal?: number;
  exitFee?: number;
  exitFeePersonal?: number;
};
