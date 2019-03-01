import { Action, Dispatch } from "redux";

import ErrorMessage from "../components/error-message/error-message";

export interface IDispatchable<T> {
  (dispatch: Dispatch<ActionType>): T;
}

export interface ActionType extends Action {
  type: string;
  payload?: any;
}

export interface DispatchType<R> {
  (asyncAction: ActionType): R;
}

export type Nullable<T> = T | null;

export type ResponseError = {
  errorMessage: string;
  code: string;
};
