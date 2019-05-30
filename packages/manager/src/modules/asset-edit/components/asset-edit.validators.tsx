import {
  assetDescriptionShape,
  assetTitleShape
} from "pages/create-program/components/create-program-settings/create-program-settings.validators";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import { number, object } from "yup";

import { ASSET_EDIT_FIELDS, IAssetEditProps } from "./asset-edit-form";

const editAssetSettingsValidationSchema = (props: IAssetEditProps) =>
  object().shape({
    [ASSET_EDIT_FIELDS.stopOutLevel]: number()
      .min(
        10,
        props.t(
          "manager.create-program-page.settings.validation.stop-out-less-ten"
        )
      )
      .max(
        props.info.stopOutLevel || 100,
        props.t(
          "manager.create-program-page.settings.validation.stop-out-more-current"
        )
      ),
    [ASSET_EDIT_FIELDS.logo]: inputImageShape(props.t),
    [ASSET_EDIT_FIELDS.title]: assetTitleShape(props.t),
    [ASSET_EDIT_FIELDS.description]: assetDescriptionShape(props.t)
  });

export default editAssetSettingsValidationSchema;
