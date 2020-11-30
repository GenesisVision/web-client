import TextAreaField from "components/assets/fields/text-area-field";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  description: string;
}

const _DescriptionField: React.FC<Props> = ({ name, description }) => {
  const { t } = useTranslation();
  return (
    <TextAreaField
      value={description}
      name={name}
      label={t("asset-settings:fields.description")}
      caption={t("asset-settings:fields.description-requirements")}
    />
  );
};

const DescriptionField = React.memo(_DescriptionField);
export default DescriptionField;
