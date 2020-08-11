import { OptionalClickable, Sizeable } from "utils/types";

export interface IRowItemProps extends Sizeable, OptionalClickable {
  hide?: boolean;
  wide?: boolean;
  bottomOffset?: boolean;
  className?: string;
}
