import { $paddingSmall } from "utils/style/sizes";
import { adaptiveMargin, adaptivePadding } from "utils/style/style-mixins";

export const detailsBlockLeftPadding = adaptivePadding("left", $paddingSmall);

export const detailsBlockLeftMargin = adaptiveMargin("left", $paddingSmall);

export const detailsBlockRightPadding = adaptivePadding("right", $paddingSmall);

export const detailsBlockHorizontalPaddings =
  detailsBlockLeftPadding + detailsBlockRightPadding;
