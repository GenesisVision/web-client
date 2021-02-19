import AssetFormField from "components/assets/asset-fields/asset-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { assetTitleRules } from "utils/validators/validators";

import AssetField from "../asset-fields/asset-field";

interface Props {
  name: string;
}

const _UserNameField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <AssetField>
      <AssetFormField
        type="text"
        name={name}
        label={t("profile-page:login")}
        component={SimpleTextField}
        caption={t("asset-settings:fields.name-requirements")}
        rules={assetTitleRules(t)}
      />
    </AssetField>
  );
};

const UserNameField = React.memo(_UserNameField);
export default UserNameField;
