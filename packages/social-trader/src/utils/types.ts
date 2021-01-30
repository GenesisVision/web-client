import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { Currency, FundAssetPart, PlatformAsset, ProgramNotificationSettingList } from "gv-api-web";
import { NextPageContext } from "next";
import { AppContextType, NextComponentType } from "next/dist/next-server/lib/utils";
import React, { ReactNode } from "react";
import { AuthRootState as SocialTraderAuthRootState } from "reducers";
import { RootState } from "reducers/root-reducer";
import { Action, AnyAction, Dispatch, Store } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import Token from "services/api-client/token";

export type SizesType =
  | "zero"
  | "xsmall"
  | "small"
  | "middle"
  | "large"
  | "xlarge"
  | "xxlarge";

export interface Childrenable {
  children?: ReactNode | ReactNode[];
}

export interface Clickable {
  onClick: (values?: any) => void;
}

export type OptionalClickable = Partial<Clickable>;

export interface Sizeable {
  size?: SizesType;
}

export type AnyObjectType = { [keys: string]: any };

export type ReduxDispatch = ThunkDispatch<RootState, any, Action>;

export interface IDispatchable<T> {
  (dispatch: Dispatch<ActionType>): T;
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

export type ApiAction<T = any, U = any> = ActionType<Promise<T>, U>;

export type RootThunkAction<R = any> = ThunkAction<R, AuthRootState, any, any>;

export interface DispatchType<R> {
  (asyncAction: ActionType): R;
}

type UnpackApiAction<T> = T extends ApiAction<infer U> ? U : T;

export type ApiActionResponse<T> = Promise<{
  action: ApiAction<T>;
  value: T;
}>;

export interface MiddlewareDispatch {
  <A extends ApiAction = ApiAction>(apiAction: A): ApiActionResponse<
    UnpackApiAction<A>
  >;

  <A extends ActionType = ActionType>(action: A): A;

  <R, S>(asyncAction: RootThunk<R, S>): R;
}

export type RootThunk<R, S = AuthRootState> = (
  dispatch: MiddlewareDispatch,
  getState: () => S
) => R;

export type Nullable<T> = T | null;

export type ResponseError = {
  errorMessage: string;
  code: string;
};

export type HandlePeriodChangeType = (period: ChartDefaultPeriod) => void;

export type CurrencyEnum = Currency;

export type AuthRootState = SocialTraderAuthRootState;

export type TGetState = () => RootState;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type InitializeStoreType = (initialState?: {}) => Store<
  any,
  ActionType
> & {
  dispatch: any;
};

export interface RootStore<S = any, A extends Action = AnyAction>
  extends Store<S, A> {
  dispatch: MiddlewareDispatch;
}

export interface NextPageWithTokenContext extends NextPageContext {
  token: Token;
}

export interface NextPageWithReduxContext extends NextPageWithTokenContext {
  // @ts-ignore
  reduxStore: RootStore<AuthRootState, RootThunkAction>; //TODO error
}

export interface AppWithReduxContext extends AppContextType {
  ctx: NextPageWithReduxContext;
  reduxStore?: any;
  token?: any;
}

export type NextPageWithToken<P = void, IP = P> = NextComponentType<
  NextPageWithTokenContext,
  IP,
  P
>;

export type NextPageWithRedux<P = void, IP = P> = NextComponentType<
  NextPageWithReduxContext,
  IP,
  P
>;

export type PlatformAssetFull = PlatformAsset & FundAssetPart;

export type FeesType = {
  managementFeePersonal?: number;
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

export type TagType =
  | React.ComponentType<{ className?: string; style?: any }>
  | string;

export type VoidFuncType = () => void;
