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
      return getImageUrlByQuality(image.resizes, "High");
    case SIZES.MIDDLE:
      return getImageUrlByQuality(image.resizes, "Medium");
    case SIZES.SMALL:
      return getImageUrlByQuality(image.resizes, "Low");
  }
};

export const getImageSize = (count: number): SIZES => {
  switch (count) {
    case 1:
      return SIZES.LARGE;
    case 2:
      return SIZES.MIDDLE;
    default:
      return SIZES.SMALL;
  }
};

export const getImageQuality = (size: SIZES): ImageQuality => {
  switch (size) {
    case SIZES.XLARGE:
    case SIZES.LARGE:
      return "High";
    case SIZES.MIDDLE:
      return "Medium";
    case SIZES.SMALL:
      return "Low";
  }
};
