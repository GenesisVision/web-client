import { Action, AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import RootState from "../reducers/root-reducer";

export interface IDispatchable<T> {
  (dispatch: Dispatch<ActionType>): T;
}

export interface ActionType<T = any> extends Action {
  type: string;
  payload?: T;
}

export type ApiAction<T> = ActionType<Promise<T>>;

export type RootThunkAction<R = any> = ThunkAction<R, RootState, any, any>;

export interface DispatchType<R> {
  (asyncAction: ActionType): R;
}

export interface MiddlewareDispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): Promise<T>;
}

export type Nullable<T> = T | null;

export type ResponseError = {
  errorMessage: string;
  code: string;
};
