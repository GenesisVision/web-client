import TextAreaField from "components/assets/fields/text-area-field";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  description: string;
}

const _AboutField: React.FC<Props> = ({ name, description }) => {
  const { t } = useTranslation();
  return (
    <TextAreaField
      value={description}
      name={name}
      label={t("profile-page:about")}
      caption={" "}
    />
  );
};

const AboutField = React.memo(_AboutField);
export default AboutField;
