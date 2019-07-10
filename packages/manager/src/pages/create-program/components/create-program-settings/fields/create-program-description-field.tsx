import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVProgramPeriod from "shared/components/gv-program-period";
import GVTextField from "shared/components/gv-text-field";

const _CreateProgramDescriptionField: React.FC<Props> = ({
  name,
  t,
  description
}) => {
  const descriptionTrimmedLength = description.trim().length;
  return (
    <div className="create-program-settings__item create-program-settings__item--wider">
      <GVFormikField
        type="textarea"
        name={name}
        label={t("manager.create-program-page.settings.fields.description")}
        component={GVTextField}
      />
      <div className="create-program-settings__item-caption create-program-settings__description">
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
    </div>
  );
};

interface Props extends InjectedTranslateProps {
  name: string;
  description: string;
}

const CreateProgramDescriptionField = translate()(
  React.memo(_CreateProgramDescriptionField)
);
export default CreateProgramDescriptionField;
