import inputImageShape from "shared/components/form/input-image/input-image.validation";
import {
  assetDescriptionShape,
  assetTitleShape
} from "shared/utils/validators/validators";
import { boolean, mixed, number, object } from "yup";

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
    [ASSET_EDIT_FIELDS.hasInvestmentLimit]: boolean(),
    [ASSET_EDIT_FIELDS.investmentLimit]: mixed().when(
      ASSET_EDIT_FIELDS.hasInvestmentLimit,
      {
        is: true,
        then: number()
          .min(
            0,
            props.t(
              "manager.create-program-page.settings.validation.investment-limit-min"
            )
          )
          .lessThan(
            10000000000,
            "Investment Limit must be less than 10000000000"
          )
          .required(
            props.t(
              "manager.create-program-page.settings.validation.investment-limit-required"
            )
          )
      }
    ),
    [ASSET_EDIT_FIELDS.logo]: inputImageShape(props.t),
    [ASSET_EDIT_FIELDS.title]: assetTitleShape(props.t),
    [ASSET_EDIT_FIELDS.description]: assetDescriptionShape(props.t)
  });

export default editAssetSettingsValidationSchema;
