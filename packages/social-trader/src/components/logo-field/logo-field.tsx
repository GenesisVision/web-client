import { InputImageWrapper } from "components/form/input-image/input-image-wrapper";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import ProgramDefaultImage from "media/program-default-image.svg";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { inputImageRules } from "components/form/input-image/input-image.validation";

interface Props {
  name: string;
  title?: string;
  defaultImage?: string;
}

const _LogoField: React.FC<Props> = ({
  name,
  title,
  defaultImage = ProgramDefaultImage
}) => {
  const { t } = useTranslation();
  return (
    <div>
      {title && <h5>{title}</h5>}
      <Row wide>
        <Text muted size={"small"}>
          {t("asset-settings:fields.upload-logo-rules")}
        </Text>
      </Row>
      <Row wide size={"large"}>
        <GVHookFormField
          name={name}
          component={InputImageWrapper}
          defaultImage={defaultImage}
          rules={inputImageRules(t)}
        />
      </Row>
    </div>
  );
};

const LogoField = React.memo(_LogoField);
export default LogoField;
