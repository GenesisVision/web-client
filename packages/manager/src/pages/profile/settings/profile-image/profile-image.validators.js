import * as Yup from "yup";
import { convertMbToBytes } from "shared/utils/helpers";

const profileImageValidationSchema = ({ t }) => {
  return Yup.object().shape({
    logo: Yup.object().shape({
      width: Yup.number().min(
        300,
        t("profile.settings.validation.image-resolution-incorrect")
      ),
      height: Yup.number().min(
        300,
        t("profile.settings.validation.image-resolution-incorrect")
      ),
      size: Yup.number().max(
        convertMbToBytes(2),
        t("profile.settings.validation.image-file-is-large")
      )
    })
  });
};

export default profileImageValidationSchema;
