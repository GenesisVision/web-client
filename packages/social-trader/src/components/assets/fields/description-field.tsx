import "./fields.scss";

import AssetFormField from "components/assets/asset-fields/asset-form-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import GVTextField from "shared/components/gv-text-field";

import AssetField from "../asset-fields/asset-field";

const _DescriptionField: React.FC<Props> = ({ name, description }) => {
  const { t } = useTranslation();
  return (
    <AssetField wide>
      <AssetFormField
        value={description}
        type="textarea"
        name={name}
        label={t("create-program-page.settings.fields.description")}
        component={GVTextField}
        caption={t(
          "create-program-page.settings.fields.description-requirements"
        )}
      />
    </AssetField>
  );
};

interface Props {
  name: string;
  description: string;
}

const DescriptionField = React.memo(_DescriptionField);
export default DescriptionField;
