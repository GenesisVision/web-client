import "./fields.scss";

import AssetFormField from "components/assets/asset-fields/asset-form-field";
import GVTextField from "components/gv-text-field";
import * as React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

const _UserNameField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <AssetField>
      <AssetFormField
        wide
        type="text"
        name={name}
        label={t("profile-page.login")}
        component={GVTextField}
        caption={t("create-program-page.settings.fields.name-requirements")}
      />
    </AssetField>
  );
};

interface Props {
  name: string;
}

const UserNameField = React.memo(_UserNameField);
export default UserNameField;
