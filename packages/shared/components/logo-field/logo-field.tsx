import "./logo-field.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import InputImage from "shared/components/form/input-image/input-image";
import GVFormikField from "shared/components/gv-formik-field";
import ProgramDefaultImage from "shared/media/program-default-image.svg";

const _LogoField: React.FC<Props> = ({
  name,
  title,
  defaultImage = ProgramDefaultImage
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="logo-field">
        <div className="logo-field__logo-title">{title}</div>
        <div className="logo-field__logo-notice">
          {t("manager.create-program-page.settings.fields.upload-logo-rules")}
        </div>
      </div>
      <div className="logo-field">
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
