import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import InputImage from "shared/components/form/input-image/input-image";
import GVFormikField from "shared/components/gv-formik-field";
import ProgramDefaultImage from "shared/media/program-default-image.svg";

const _CreateProgramLogoField: React.FC<Props> = ({ name, t, title }) => (
  <>
    <div className="create-program-settings__field create-program-settings__field--wider">
      <div className="create-program-settings__logo-title">{title}</div>
      <div className="create-program-settings__logo-notice">
        {t("manager.create-program-page.settings.fields.upload-logo-rules")}
      </div>
    </div>
    <div className="create-program-settings__field create-program-settings__field--wider">
      <div className="create-program-settings__file-field-container">
        <GVFormikField
          name={name}
          component={InputImage}
          defaultImage={ProgramDefaultImage}
        />
      </div>
    </div>
  </>
);

interface Props extends InjectedTranslateProps {
  name: string;
  title?: string;
}

const CreateProgramLogoField = translate()(React.memo(_CreateProgramLogoField));
export default CreateProgramLogoField;
