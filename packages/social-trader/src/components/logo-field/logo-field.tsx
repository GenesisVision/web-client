import "./logo-field.scss";

import InputImage from "components/form/input-image/input-image";
import GVFormikField from "components/gv-formik-field";
import ProgramDefaultImage from "media/program-default-image.svg";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _LogoField: React.FC<Props> = ({
  name,
  title,
  defaultImage = ProgramDefaultImage
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="logo-field logo-field--wider">
        <div className="logo-field__title">{title}</div>
        <div className="logo-field__notice">
          {t("create-program-page.settings.fields.upload-logo-rules")}
        </div>
      </div>
      <div className="logo-field logo-field--wider">
        <GVFormikField
          name={name}
          component={InputImage}
          defaultImage={defaultImage}
        />
      </div>
    </>
  );
};

interface Props {
  name: string;
  title?: string;
  defaultImage?: string;
}

const LogoField = React.memo(_LogoField);
export default LogoField;
