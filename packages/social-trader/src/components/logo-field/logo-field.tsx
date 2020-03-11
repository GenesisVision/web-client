import "./logo-field.scss";

import { InputImageWrapper } from "components/form/input-image/input-image-wrapper";
import { GVHookFormField } from "components/gv-hook-form-field";
import { MutedText } from "components/muted-text/muted-text";
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
          <MutedText small>
            {t("create-program-page.settings.fields.upload-logo-rules")}
          </MutedText>
        </div>
      </div>
      <div className="logo-field logo-field--wider">
        <GVHookFormField
          name={name}
          component={InputImageWrapper}
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
