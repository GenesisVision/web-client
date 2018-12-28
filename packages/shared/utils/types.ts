import { Dispatch } from "react-redux";
import { ActionCreatorsMapObject } from "redux";

export interface IDispatchable<T> {
  (dispatch: Dispatch<ActionCreatorsMapObject>): T;
}
