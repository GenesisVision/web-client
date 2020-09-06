import { Sizeable } from "utils/types";

export type TextColor =
  | "#00ff00"
  | "#ff0000"
  | "white"
  | "red"
  | "green"
  | "yellow"
  | string;
export type TextWeight = "thin" | "normal" | "bold" | "bolder";

export interface ITextProps extends Sizeable {
  className?: string;
  preWrap?: boolean;
  sizeValue?: string;
  weight?: TextWeight;
  color?: TextColor;
  muted?: boolean;
  wrap?: boolean;
}
