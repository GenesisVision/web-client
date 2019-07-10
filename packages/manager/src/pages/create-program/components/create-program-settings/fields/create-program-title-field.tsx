import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";

const _CreateProgramTitleField: React.FC<Props> = ({ name, t }) => (
  <div className="create-program-settings__item">
    <GVFormikField
      type="text"
      name={name}
      label={t("manager.create-program-page.settings.fields.name")}
      autoComplete="off"
      component={GVTextField}
    />
    <div className="create-program-settings__item-caption">
      {t("manager.create-program-page.settings.fields.name-requirements")}
    </div>
  </div>
);

interface Props extends InjectedTranslateProps {
  name: string;
}

const CreateProgramTitleField = translate()(
  React.memo(_CreateProgramTitleField)
);
export default CreateProgramTitleField;
