import * as Yup from "yup";

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
        2097152,
        t("profile.settings.validation.image-file-is-large")
      )
    })
  });
};

export default profileImageValidationSchema;
