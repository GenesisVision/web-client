import { WithTranslation } from "react-i18next";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import {
  assetDescriptionShape,
  assetTitleShape
} from "shared/utils/validators/validators";
import { object, string } from "yup";

import {
  ATTACH_ACCOUNT_FIELDS,
  IAttachAccountSettingsFormValues,
  ICreateFundSettingsProps
} from "./attach-account-settings";

const attachAccountSettingsValidationSchema = ({
  t
}: ICreateFundSettingsProps & WithTranslation) =>
  object<IAttachAccountSettingsFormValues>().shape({
    [ATTACH_ACCOUNT_FIELDS.apiSecret]: string().required(
      t("attach-account-page.settings.validation.api-secret")
    ),
    [ATTACH_ACCOUNT_FIELDS.exchange]: string().required(
      t("attach-account-page.settings.validation.api-secret")
    ),
    [ATTACH_ACCOUNT_FIELDS.apiKey]: string().required(
      t("attach-account-page.settings.validation.api-secret")
    ),
    [ATTACH_ACCOUNT_FIELDS.logo]: inputImageShape(t),
    [ATTACH_ACCOUNT_FIELDS.title]: assetTitleShape(t),
    [ATTACH_ACCOUNT_FIELDS.description]: assetDescriptionShape(t)
  });

export default attachAccountSettingsValidationSchema;
