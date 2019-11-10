import "./fields.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVProgramPeriod from "shared/components/gv-program-period";
import GVTextField from "shared/components/gv-text-field";

import AssetField from "../asset-fields/asset-field";

const _DescriptionField: React.FC<Props> = ({ name, description }) => {
  const { t } = useTranslation();
  const descriptionTrimmedLength = description.trim().length;
  return (
    <AssetField wide>
      <GVFormikField
        type="textarea"
        name={name}
        label={t("create-program-page.settings.fields.description")}
        component={GVTextField}
      />
      <div className="create-asset-settings__field-caption create-asset-settings__description">
        <span className="create-asset-settings__description-requirements">
          {t("create-program-page.settings.fields.description-requirements")}
        </span>
        {descriptionTrimmedLength > 0 && (
          <span className="create-asset-settings__description-chars">
            {descriptionTrimmedLength}
            <GVProgramPeriod
              start={0}
              end={500}
              value={descriptionTrimmedLength}
              variant="pie"
            />
          </span>
        )}
      </div>
    </AssetField>
  );
};

interface Props {
  name: string;
  description: string;
}

const DescriptionField = React.memo(_DescriptionField);
export default DescriptionField;
