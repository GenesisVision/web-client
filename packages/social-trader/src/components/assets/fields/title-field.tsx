import AssetFormField from "components/assets/asset-fields/asset-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import * as React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

interface Props {
  name: string;
}

const _TitleField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <AssetField>
      <AssetFormField
        wide
        type="text"
        name={name}
        label={t("asset-settings:fields.name")}
        component={SimpleTextField}
        caption={t("asset-settings:fields.name-requirements")}
      />
    </AssetField>
  );
};

const TitleField = React.memo(_TitleField);
export default TitleField;
