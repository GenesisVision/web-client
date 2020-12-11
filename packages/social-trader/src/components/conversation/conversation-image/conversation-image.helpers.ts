import { IConversationImage } from "components/conversation/conversation.types";
import { ImageQuality, PostImageResize } from "gv-api-web";
import { safeGetElemFromArray } from "utils/helpers";
import { SizesType } from "utils/types";

export const getImageByQuality = (
  resizes: Array<PostImageResize>,
  qualityArg: ImageQuality
): PostImageResize =>
  safeGetElemFromArray(resizes, ({ quality }) => quality === qualityArg);

export const getImageBySize = (
  image: IConversationImage,
  size: SizesType
): PostImageResize => {
  switch (size) {
    case "xlarge":
    case "large":
      return getImageByQuality(image.resizes, "Original");
    case "middle":
    case "small":
    default:
      return getImageByQuality(image.resizes, "Low");
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
