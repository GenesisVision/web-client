import { TFunction } from "i18next";
import { number, object } from "yup";

const inputImageShape = (t: TFunction) =>
  object().shape({
    image: object().shape({
      width: number().min(300, t("validations.resolution")),
      height: number().min(300, t("validations.resolution"))
    })
  });

export default inputImageShape;
