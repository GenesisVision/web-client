import {
  assetDescriptionShape,
  assetTitleShape
} from "pages/create-program/components/create-program-settings/create-program-settings.validators";
import { number, object } from "yup";

const editAssetSettingsValidationSchema = ({ t, ...props }) =>
  object().shape({
    stopOutLevel: number()
      .moreThan(0)
      .max(props.info.stopOutLevel || 100),
    logo: object().shape({
      width: number().min(
        300,
        t(
          "manager.create-program-page.settings.validation.image-resolution-incorrect"
        )
      ),
      height: number().min(
        300,
        t(
          "manager.create-program-page.settings.validation.image-resolution-incorrect"
        )
      ),
      size: number().max(
        2097152,
        t("manager.create-program-page.settings.validation.image-file-is-large")
      )
    }),
    title: assetTitleShape(t),
    description: assetDescriptionShape(t)
  });

export default editAssetSettingsValidationSchema;
