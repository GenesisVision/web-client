import {
  assetDescriptionShape,
  assetTitleShape
} from "pages/create-program/components/create-program-settings/create-program-settings.validators";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import { number, object } from "yup";

const editAssetSettingsValidationSchema = ({ t, ...props }) =>
  object().shape({
    stopOutLevel: number()
      .min(
        10,
        t("manager.create-program-page.settings.validation.stop-out-less-ten")
      )
      .max(
        props.info.stopOutLevel || 100,
        t(
          "manager.create-program-page.settings.validation.stop-out-more-current"
        )
      ),
    logo: inputImageShape(t),
    title: assetTitleShape(t),
    description: assetDescriptionShape(t)
  });

export default editAssetSettingsValidationSchema;
