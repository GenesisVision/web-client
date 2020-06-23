import TextAreaField from "components/assets/fields/text-area-field";
import * as React from "react";
import { useTranslation } from "react-i18next";

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

interface Props {
  name: string;
  description: string;
}

const DescriptionField = React.memo(_DescriptionField);
export default DescriptionField;
