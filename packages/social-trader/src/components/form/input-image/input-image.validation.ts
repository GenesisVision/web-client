import i18next from "i18next";
import { number, object } from "yup";

const inputImageShape = (t: i18next.TFunction) =>
  object().shape({
    image: object().shape({
      width: number().min(300, t("input-image.validation.resolution")),
      height: number().min(300, t("input-image.validation.resolution")),
      size: number().max(2097152, t("input-image.validation.file-is-large"))
    })
  });

export default inputImageShape;
