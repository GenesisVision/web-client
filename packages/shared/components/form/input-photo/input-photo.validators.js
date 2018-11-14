import * as Yup from "yup";
import { convertMbToBytes } from "shared/utils/helpers";

const inputPhotoValidation = ({ t }) => {
  return Yup.object().shape({
    width: Yup.number().min(
      300,
      t("fields.input-photo.validations.image-resolution-incorrect")
    ),
    height: Yup.number().min(
      300,
      t("fields.input-photo.validations.image-resolution-incorrect")
    ),
    size: Yup.number().max(
      convertMbToBytes(2),
      t("fields.input-photo.validations.image-file-is-large")
    )
  });
};

export default inputPhotoValidation;
