import { IConversationImage } from "components/conversation/conversation.types";
import { SIZES } from "constants/constants";
import { ImageQuality, PostImageResize } from "gv-api-web";
import { safeGetElemFromArray } from "utils/helpers";

export const getImageUrlByQuality = (
  resizes: Array<PostImageResize>,
  qualityArg: ImageQuality
): string =>
  safeGetElemFromArray(resizes, ({ quality }) => quality === qualityArg)
    .logoUrl;

export const getImageUrlBySize = (
  image: IConversationImage,
  size: SIZES
): string => {
  switch (size) {
    case SIZES.XLARGE:
    case SIZES.LARGE:
      return getImageUrlByQuality(image.resizes, "Original");
    case SIZES.MIDDLE:
    case SIZES.SMALL:
      return getImageUrlByQuality(image.resizes, "Low");
  }
};

export const getImageSize = (count: number): SIZES => {
  switch (count) {
    case 1:
      return SIZES.LARGE;
    case 2:
    default:
      return SIZES.SMALL;
  }
};

export const getImageQuality = (size: SIZES): ImageQuality => {
  switch (size) {
    case SIZES.XLARGE:
    case SIZES.LARGE:
      return "Original";
    case SIZES.MIDDLE:
      return "Medium";
    case SIZES.SMALL:
      return "Low";
  }
};
