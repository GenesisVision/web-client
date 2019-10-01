import * as React from "react";
import { useTranslation } from "react-i18next";
import LogoField from "shared/components/fields/logo-field";
import { ASSET } from "shared/constants/constants";

import DescriptionField from "./description-field";
import TitleField from "./title-field";

const _DescriptionBlock: React.FC<Props> = ({
  asset,
  titleName,
  descriptionName,
  logoName,
  description
}) => {
  const { t } = useTranslation();
  return (
    <>
      <TitleField name={titleName} />
      <DescriptionField name={descriptionName} description={description} />
      <LogoField
        name={logoName}
        title={t(
          `manager.create-${asset.toLowerCase()}-page.settings.fields.upload-logo`
        )}
      />
    </>
  );
};

interface Props {
  asset: ASSET;
  titleName: string;
  descriptionName: string;
  logoName: string;
  description: string;
}

const DescriptionBlock = React.memo(_DescriptionBlock);
export default DescriptionBlock;
