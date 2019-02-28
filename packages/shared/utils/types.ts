import { Action, Dispatch } from "redux";

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
