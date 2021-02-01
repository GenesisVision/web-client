import { TFunction } from "i18next";
import { AnyObjectType } from "utils/types";

export const inputImageRules = (t: TFunction) => ({
  validate: (data: AnyObjectType) => {
    if (!data?.image || isNaN(data.image.height) || isNaN(data.image.width))
      return "Invalid image";
    if (data.image.height < 300 || data.image.width < 300)
      return t("validations.resolution");
    return true;
  }
});
