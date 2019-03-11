import { Action, Dispatch } from "redux";

import ErrorMessage from "../components/error-message/error-message";
import RootState from "../reducers/root-reducer";
import { ThunkAction } from "redux-thunk";

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

export type Nullable<T> = T | null;

export type ResponseError = {
  errorMessage: string;
  code: string;
};
