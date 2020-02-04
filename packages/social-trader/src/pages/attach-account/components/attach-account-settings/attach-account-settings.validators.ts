import { WithTranslation } from "react-i18next";
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
    [ATTACH_ACCOUNT_FIELDS.secret]: string().required(
      t("attach-account-page.settings.validation.api-secret")
    ),
    [ATTACH_ACCOUNT_FIELDS.brokerAccountTypeId]: string().required(
      t("attach-account-page.settings.validation.api-secret")
    ),
    [ATTACH_ACCOUNT_FIELDS.key]: string().required(
      t("attach-account-page.settings.validation.api-key")
    )
  });

export default attachAccountSettingsValidationSchema;
