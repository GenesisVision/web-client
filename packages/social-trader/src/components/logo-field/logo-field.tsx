import { InputImageWrapper } from "components/form/input-image/input-image-wrapper";
import { GVHookFormField } from "components/gv-hook-form-field";
import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
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
      {title && <h5>{title}</h5>}
      <Row wide>
        <MutedText small>
          {t("create-program-page.settings.fields.upload-logo-rules")}
        </MutedText>
      </Row>
      <Row wide large>
        <GVHookFormField
          name={name}
          component={InputImageWrapper}
          defaultImage={defaultImage}
        />
      </Row>
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
