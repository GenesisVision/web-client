import { adaptiveMargin, adaptivePadding } from "utils/style/mixins";
import { $paddingSmall } from "utils/style/sizes";

export const detailsBlockLeftPadding = adaptivePadding("left", $paddingSmall);

export const detailsBlockLeftMargin = adaptiveMargin("left", $paddingSmall);

export const detailsBlockRightPadding = adaptivePadding("right", $paddingSmall);

export const detailsBlockHorizontalPaddings =
  detailsBlockLeftPadding + detailsBlockRightPadding;
