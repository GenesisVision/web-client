import { TextWeight } from "components/text/text.types";
import React from "react";
import { Sizeable } from "utils/types";

export type LabeledValueDirection =
  | "column"
  | "row"
  | "column-reverse"
  | "row-reverse";

export interface ILabeledValueProps extends Sizeable {
  className?: string;
  weight?: TextWeight;
  direction?: LabeledValueDirection;
  label: string | React.ReactNode | JSX.Element;
}
