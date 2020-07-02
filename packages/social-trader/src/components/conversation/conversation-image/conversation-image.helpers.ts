import { IConversationImage } from "components/conversation/conversation.types";
import { ImageQuality, PostImageResize } from "gv-api-web";
import { safeGetElemFromArray } from "utils/helpers";
import { SizesType } from "utils/types";

export const getImageUrlByQuality = (
  resizes: Array<PostImageResize>,
  qualityArg: ImageQuality
): string =>
  safeGetElemFromArray(resizes, ({ quality }) => quality === qualityArg)
    .logoUrl;

export const getImageUrlBySize = (
  image: IConversationImage,
  size: SizesType
): string => {
  switch (size) {
    case "xlarge":
    case "large":
      return getImageUrlByQuality(image.resizes, "Original");
    case "middle":
    case "small":
    default:
      return getImageUrlByQuality(image.resizes, "Low");
  }
};

export const getImageSize = (count: number): SizesType => {
  switch (count) {
    case 1:
      return "large";
    case 2:
    default:
      return "small";
  }
};
