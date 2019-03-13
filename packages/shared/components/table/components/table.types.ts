import { FILTER_TYPE } from "../helpers/filtering.helpers";

export type Column = {
  name: string;
};

export interface IUpdateFilterFunc {
  (filer: any): void;
}

export interface IComposeDefaultFilter {
  name?: string;
  composeRequestValue?(value: any): Object;
  composeApiRequestValue?(value: any): Object; // temp
  defaultValue?: any;
  type?: FILTER_TYPE;
  validate?(value: any): boolean;
}
