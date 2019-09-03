import * as React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";

const _TitleField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <div className="create-program-settings__field">
      <GVFormikField
        type="text"
        name={name}
        label={t("manager.create-program-page.settings.fields.name")}
        autoComplete="off"
        component={GVTextField}
      />
      <div className="create-program-settings__field-caption">
        {t("manager.create-program-page.settings.fields.name-requirements")}
      </div>
    </div>
  );
};

interface Props {
  name: string;
}

const TitleField = React.memo(_TitleField);
export default TitleField;
