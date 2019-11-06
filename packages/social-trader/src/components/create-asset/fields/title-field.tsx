import "./fields.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";

import CreateAssetField from "../create-asset-field/create-asset-field";

const _TitleField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <CreateAssetField>
      <GVFormikField
        type="text"
        name={name}
        label={t("create-program-page.settings.fields.name")}
        autoComplete="off"
        component={GVTextField}
      />
      <div className="create-asset-settings__field-caption">
        {t("create-program-page.settings.fields.name-requirements")}
      </div>
    </CreateAssetField>
  );
};

interface Props {
  name: string;
}

const TitleField = React.memo(_TitleField);
export default TitleField;
