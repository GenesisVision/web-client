import { TFunction } from "i18next";
import { bytesToMegaBytes } from "utils/helpers";
import { AnyObjectType } from "utils/types";

export const inputImageRules = (t: TFunction) => ({
  validate: (data: AnyObjectType) => {
    if (
      !data?.image ||
      isNaN(data.image.height) ||
      isNaN(data.image.width) ||
      isNaN(data.image.size)
    )
      return;
    if (bytesToMegaBytes(data.image.size) > 3.5)
      return t("validations.file-is-large");
    if (data.image.height < 300 || data.image.width < 300)
      return t("validations.resolution");
    return true;
  }
});
