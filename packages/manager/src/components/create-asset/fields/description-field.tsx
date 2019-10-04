import * as React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVProgramPeriod from "shared/components/gv-program-period";
import GVTextField from "shared/components/gv-text-field";

import CreateAssetField from "../create-asset-field/create-asset-field";

const _DescriptionField: React.FC<Props> = ({ name, description }) => {
  const { t } = useTranslation();
  const descriptionTrimmedLength = description.trim().length;
  return (
    <CreateAssetField wide>
      <GVFormikField
        type="textarea"
        name={name}
        label={t("manager.create-program-page.settings.fields.description")}
        component={GVTextField}
      />
      <div className="create-program-settings__field-caption create-program-settings__description">
        <span className="create-program-settings__description-requirements">
          {t(
            "manager.create-program-page.settings.fields.description-requirements"
          )}
        </span>
        {descriptionTrimmedLength > 0 && (
          <span className="create-program-settings__description-chars">
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
    </CreateAssetField>
  );
};

interface Props {
  name: string;
  description: string;
}

const DescriptionField = React.memo(_DescriptionField);
export default DescriptionField;
